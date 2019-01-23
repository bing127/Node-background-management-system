/*
* @ author Administrator
* @ time   2018/11/14/014 15:58
* @ description
* @ param
*/
'use strict'

const Service = require('egg').Service;
const md5 = require('md5');
const uuid = require('uuid/v1');
const dayjs = require('dayjs');

class RoleService extends Service {
    async data(params) {
        const {ctx} = this;
        try {
            const role = await ctx.model.SysRole.findAndCountAll({
                offset: parseInt((params.pageNo - 1)) * parseInt(params.pageSize),
                limit: parseInt(params.pageSize),
                order: [['created_at', 'desc']]
            })
            return {
                success: true,
                rows: role.rows,
                total: role.count,
            };
            return res;
        } catch (err) {
            throw new Error(err);
        }
    }
    async save(params){
        try {
            const { ctx } = this;
            const uuids = uuid().replace(/-/g, '')
            let roleArr = params.roleId.split(',');
            const isRepeat =  await ctx.model.SysRole.findAll({
                where: {name: params.name}
            })
            if (params.id) {
                let options = {}
                if (isRepeat.length>0){
                    options = {
                        permission:params.permission,
                    }
                } else {
                    options = {
                        name:params.name,
                        permission:params.permission,
                    }
                }
                const rets = await ctx.model.SysRole.update(options, {
                    where: { id: params.id },
                });
                const destroys =  await ctx.model.SysRoleMenu.destroy({
                    where: { role_id: params.id },
                });
                const ress = roleArr.map(async item => {
                    const response = await ctx.model.SysRoleMenu.create({
                        role_id: params.id,
                        menu_id:item
                    });
                    return response;
                });
                let results = Promise.all([rets,destroys,ress])
                if (results){
                    return {
                        success: true,
                        msg: '操作成功',
                    }
                } else {
                    return {
                        success: false,
                        msg: '操作失败',
                    }
                }
            } else {
                if (isRepeat.length>0){
                    return {
                        success: false,
                        msg: `添加失败，已经${params.name}存在该角色`
                    };
                } else {
                    const res = await ctx.model.SysRole.create({
                        id: uuids,
                        name:params.name,
                        permission:params.permission,
                        created_at:dayjs().format('YYYY-MM-DD HH:mm:ss'),
                        updated_at:dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    });
                    const ret = roleArr.map(async item => {
                        const response = await ctx.model.SysRoleMenu.create({
                            role_id: uuids,
                            menu_id:item
                        });
                        return response;
                    });
                    if (res && ret){
                        return {
                            success: true,
                            msg: '操作成功',
                        }
                    } else {
                        return {
                            success: false,
                            msg: '操作失败',
                        }
                    }
                }
            }
        } catch (e) {
            throw new Error(e)
        }
    }
    async delete(params){
        try {
            const { ctx } = this;
            let roleIds = params.ids.split(',')
            if (roleIds.length>0){
                let ret = roleIds.map(async item => {
                    const response = await ctx.model.SysRole.destroy({
                        where: { id: item },
                    });
                    return response;
                });
                return ret
            } else {
                return []
            }
        } catch (e) {
            throw new Error(e)
        }
    }

    async getById(params){
        try {
            const { ctx } = this;
            ctx.model.SysRole.belongsToMany(ctx.model.SysMenu, {
                through: ctx.model.SysRoleMenu,
                foreignKey: 'role_id',
            });
            ctx.model.SysMenu.belongsToMany(ctx.model.SysRole, {
                through: ctx.model.SysRoleMenu,
                foreignKey: 'menu_id',
            });

            const result = await ctx.model.SysRole.findAll({
                include: {
                    model: ctx.model.SysMenu
                },
                where: {id: params.id},
            });

            return result
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = RoleService;

