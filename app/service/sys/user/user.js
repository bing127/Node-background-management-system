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

class UserService extends Service {
    async login(params) {
        const {ctx} = this;
        try {
            const res = await ctx.model.SysUser.findOne({
                where: {
                    username: params.username,
                    password: md5(params.password),
                },
            });
            return res;
        } catch (err) {
            throw new Error(err);
        }
    }
    async logout(params) {
        const {ctx} = this;
        try {
            const response = await ctx.model.SysUser.update({
                updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            }, {
                where: { id: params.id },
            });
            return response
        } catch (e) {
            throw new Error(e)
        }
    }
    async getUserById(params) {
        const {ctx, app} = this;
        try {
            ctx.model.SysRole.belongsToMany(ctx.model.SysMenu, {
                through: ctx.model.SysRoleMenu,
                foreignKey: 'role_id',
            });
            ctx.model.SysMenu.belongsToMany(ctx.model.SysRole, {
                through: ctx.model.SysRoleMenu,
                foreignKey: 'menu_id',
            });
            const menu = await ctx.model.SysRole.findAll({
                include: {
                    model: ctx.model.SysMenu,
                },
                where: {id: params.role_id},
            });
            return menu
        } catch (e) {
            throw new Error(e)
        }
    }

    async dataList(params) {
        const {ctx} = this;
        try {
            ctx.model.SysUser.belongsTo(ctx.model.SysRole, {foreignKey: 'role_id'});
            const user = await ctx.model.SysUser.findAndCountAll({
                offset: parseInt((params.pageNo - 1)) * parseInt(params.pageSize),
                limit: parseInt(params.pageSize),
                order: [['created_at', 'desc']],
                include: [{
                    model: ctx.model.SysRole
                }]
            })
            return {
                success: true,
                rows: user.rows,
                total: user.count,
            };
        } catch (e) {
            throw new Error(e)
        }
    }

    async getById(params){
        const {ctx} = this;
        try {
            if (!params.id) {
                return false
            }
            const user = await ctx.model.SysUser.findOne({
                where: {
                    id: params.id
                },
            });
            return user
        } catch (e) {
            throw new Error(e)
        }
    }

    async update(params){
        const {ctx} = this;
        try {
            const response = await ctx.model.SysUser.update({
                ip: params.ip,
            }, {
                where: { id: params.id },
            });
            return response
        } catch (e) {
            throw new Error(e)
        }
    }
    async save(params){
        const {ctx} = this;
        try {
            const uuids = uuid().replace(/-/g, '')
            const isRepeat =  await ctx.model.SysUser.findAll({
                where: {username: params.username}
            })
            if (params.id){
                let options = {};
                if (isRepeat.length>0){
                    options = {
                        nickname: params.nickname,
                        photo:params.photo,
                        phone:params.phone,
                        email:params.email,
                        ip:'',
                        role_id:params.isShow,
                        is_login:params.loginFlag,
                        updated_at:dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    }
                } else {
                    options = {
                        username: params.username,
                        nickname: params.nickname,
                        photo:params.photo,
                        phone:params.phone,
                        email:params.email,
                        ip:'',
                        role_id:params.isShow,
                        is_login:params.loginFlag,
                        updated_at:dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    }
                }
                if (params.password){
                    options = Object.assign(options,{password: md5(params.password)})
                }
                const ret = await ctx.model.SysUser.update(options, {
                    where: { id: params.id },
                });
                if (params.id == ctx.session.userInfo.id){
                    ctx.session.userInfo = {
                        photo:params.photo ? params.photo : ctx.session.userInfo.photo,
                        username:params.username ? params.username : ctx.session.userInfo.username,
                        nickname:params.nickname ? params.nickname : ctx.session.userInfo.nickname,
                        role_id:params.isShow ? params.isShow : ctx.session.userInfo.role_id
                    }
                }
                if (ret){
                    return {
                        success: true,
                        msg: '操作成功',
                        body: {
                            user: {
                                id: params.id
                            }
                        }
                    };
                } else {
                    return {
                        success: false,
                        msg: '操作失败'
                    };
                }
            } else {
                if (isRepeat.length>0){
                    return {
                        success: false,
                        msg: `添加失败，已经存在${params.username}登录账户`
                    };
                } else {
                    const res = await ctx.model.SysUser.findOrCreate({
                        where: { id: params.id },
                        defaults: {
                            id: params.id ? params.id : uuids,
                            username: params.username,
                            nickname: params.nickname,
                            password: md5(params.password),
                            photo:params.photo,
                            phone:params.phone,
                            email:params.email,
                            ip:'',
                            role_id:params.isShow,
                            is_login:params.loginFlag,
                            created_at:dayjs().format('YYYY-MM-DD HH:mm:ss'),
                            updated_at:dayjs().format('YYYY-MM-DD HH:mm:ss'),
                        }
                    });
                    if (res){
                        return {
                            success: true,
                            msg: '操作成功',
                            body: {
                                user: {
                                    id: uuids
                                }
                            }
                        };
                    } else {
                        return {
                            success: false,
                            msg: '操作失败'
                        };
                    }
                }
            }
        } catch (e) {
            throw new Error(e)
        }
    }
    async getRole(){
        const {ctx} = this;
        try {
            const res = await ctx.model.SysRole.findAll();
            return {
                success: true,
                msg: '操作成功',
                data:res
            };
        } catch (e) {
            throw new Error(e)
        }
    }
    async delete(params) {
        const {ctx} = this;
        try {
            let userIds = params.ids.split(',')
            if (userIds.length>0){
                let ret = userIds.map(async item => {
                    const response = await ctx.model.SysUser.destroy({
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
}

module.exports = UserService;

