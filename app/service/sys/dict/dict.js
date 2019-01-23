'use strict';
/*
* @ author 苏辰
* @ time   2018/11/19 23:28
* @ description
* @ param
*/
const Service = require('egg').Service;
let uuid = require('uuid/v1');
const dayjs = require('dayjs');

class DictService extends Service {
    async dataList(params) {
        const {ctx} = this;
        try {
            const dict = await ctx.model.SysDict.findAndCountAll({
                offset: parseInt((params.pageNo - 1)) * parseInt(params.pageSize),
                limit: parseInt(params.pageSize),
                order: [['created_at', 'desc']],
            })
            return {
                success: true,
                rows: dict.rows,
                total: dict.count,
            };
        } catch (e) {
            throw new Error(e)
        }
    };

    async getDictValue(params) {
        const {ctx} = this;
        try {
            ctx.model.SysDict.belongsToMany(ctx.model.SysValue, {
                through: ctx.model.SysDictValue,
                foreignKey: 'dict_id',
            });
            ctx.model.SysValue.belongsToMany(ctx.model.SysDict, {
                through: ctx.model.SysDictValue,
                foreignKey: 'value_id',
            });
            const res = await ctx.model.SysDict.findAndCountAll({
                include: {
                    model: ctx.model.SysValue,
                },
                order: [['created_at', 'desc']],
                where: {id: params.dictTypeId},
            });
            return {
                success: true,
                rows: res.rows[0] ? res.rows[0]['sys_values'] : [],
                total: res.count,
                dictTypeId: params.dictTypeId
            };
        } catch (e) {
            throw new Error(e)
        }
    }

    async getById(params) {
        const {ctx} = this;
        try {
            if (!params.id) {
                return false
            }
            const result = await ctx.model.SysDict.findOne({
                where: {
                    id: params.id
                }
            })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

    async dictValueById(params) {
        const {ctx} = this;
        try {
            if (!params.dictTypeId) {
                return false
            }
            const result = await ctx.model.SysValue.findOne({
                where: {
                    id: params.dictTypeId
                }
            })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

    async dictSave(params) {
        const {ctx} = this;
        try {
            const uuids = uuid().replace(/-/g, '')
            if (params.id) {
                const ret = await ctx.model.SysDict.update({
                    des: params.des,
                    name: params.name,
                    updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                }, {
                    where: {id: params.id},
                });
                if (ret) {
                    return {
                        success: true,
                        msg: '操作成功',
                        body: {
                            dict: {
                                id: params.id,
                            }
                        }
                    };
                } else {
                    return {
                        success: false,
                        msg: '操作失败',
                    };
                }
            } else {
                const res = await ctx.model.SysDict.findOrCreate({
                    where: {
                        id: params.id
                    },
                    defaults: {
                        id: uuids,
                        name: params.name,
                        des: params.des,
                    }
                });
                if (res) {
                    return {
                        success: true,
                        msg: '操作成功',
                        body: {
                            dict: {
                                id: uuids,
                            }
                        }
                    };
                } else {
                    return {
                        success: false,
                        msg: '操作失败',
                    };
                }
            }
        } catch (e) {
            throw new Error(e)
        }
    }

    async saveDictValue(params) {
        const {ctx} = this;
        try {
            const uuids = uuid().replace(/-/g, '')
            if (params.dictValue.id) {
                const rets = await ctx.model.SysValue.update({
                    name: params.name,
                    key: params.key,
                    updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                }, {
                    where: {id: params.dictValue.id},
                });
                return Promise.all([rets])
            } else {
                const res = await ctx.model.SysValue.create({
                    id: uuids,
                    name: params.name,
                    key: params.key,
                    created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                });
                const ret = await ctx.model.SysDictValue.create({
                    dict_id: params.dict.id,
                    value_id: uuids,
                });
                return Promise.all([res, ret])
            }
        } catch (e) {
            throw new Error(e)
        }
    }


    async deleteAll(params) {
        const {ctx} = this;
        try {
            ctx.model.SysDict.belongsToMany(ctx.model.SysValue, {
                through: ctx.model.SysDictValue,
                foreignKey: 'dict_id',
            });
            ctx.model.SysValue.belongsToMany(ctx.model.SysDict, {
                through: ctx.model.SysDictValue,
                foreignKey: 'value_id',
            });
            const valueData = await ctx.model.SysDict.findAll({
                include: {
                    model: ctx.model.SysValue,
                },
                where: {
                    id: params.ids
                }
            });
            const dictRes = await ctx.model.SysDict.destroy({
                where: {id: params.ids},
            });
            const dictValue = await ctx.model.SysDictValue.destroy({
                where: {dict_id: params.ids},
            });
            const value = valueData[0].sys_values.map(async item => {
                return await ctx.model.SysValue.destroy({
                    where: {id: item.id},
                });
            });
            return Promise.all([valueData, dictRes, dictValue, value])
        } catch (e) {
            throw new Error(e)
        }
    }

    async deleteDictValue(params) {
        const {ctx} = this;
        try {
            const value = await ctx.model.SysValue.destroy({
                where: {id: params.dictValueId},
            });
            const dictValue = await ctx.model.SysDictValue.destroy({
                where: {
                    dict_id: params.dictTypeId,
                    value_id: params.dictValueId
                },
            });
            return Promise.all([value, dictValue])
        } catch (e) {
            throw new Error(e)
        }
    }

    async getByValueId(params) {
        const {ctx} = this;
        try {
            const value = await ctx.model.SysValue.findOne({
                where: {
                    id: params.dictValueId
                }
            })
            return value
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = DictService;
