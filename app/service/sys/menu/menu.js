/*
* @ author Administrator
* @ time   2018/11/15/015 14:37
* @ description
* @ param
*/
'use strict'

const Service = require('egg').Service;
let uuid = require('uuid/v1');
const dayjs = require('dayjs');

class MenuService extends Service {
    async getChildren(params) {
        const {ctx} = this;
        try {
            ctx.model.SysRole.belongsToMany(ctx.model.SysMenu, {
                through: ctx.model.SysRoleMenu,
                foreignKey: 'role_id',
                scope: {
                    parent_id: params.parentId == -1 || params.parentId == '-1' ? '0' : params.parentId
                },
            });
            ctx.model.SysMenu.belongsToMany(ctx.model.SysRole, {
                through: ctx.model.SysRoleMenu,
                foreignKey: 'menu_id',
            });

            const menu = await ctx.model.SysRole.findAll({
                include: {
                    model: ctx.model.SysMenu
                },
                where: {id: ctx.session.userRole.id},
            });
            return menu
        } catch (e) {
            throw new Error(e)
        }
    };

    async findMenu() {
        const {ctx} = this;
        try {
            const menu = await ctx.model.SysMenu.findAll();
            return menu
        } catch (e) {
            throw new Error(e)
        }
    }

    async save(params) {
        const {ctx} = this;
        try {
            const uuids = uuid().replace(/-/g, '')
            if (params.id) {
                const ret = await ctx.model.SysMenu.update({
                    parent_id: params.parent.id,
                    href: params.href,
                    icon: params.icon,
                    name: params.name,
                    is_show: params.isShow,
                    updated_at:dayjs().format('YYYY-MM-DD HH:mm:ss'),
                }, {
                    where: { id: params.id },
                });
                if (ret) {
                    return {
                        success: true,
                        msg: '操作成功',
                        body: {
                            menu: {
                                id: params.id,
                                parent_id: params.parent.id,
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
              const res = await ctx.model.SysMenu.findOrCreate({
                    where: {
                        id: params.id
                    },
                    defaults: {
                        id: uuids,
                        parent_id: params.parent.id,
                        href: params.href,
                        icon: params.icon,
                        name: params.name,
                        is_show: params.isShow
                    }
                });
                const role = await ctx.model.SysRoleMenu.findOrCreate({
                    where: {
                        menu_id: params.id
                    },
                    defaults: {
                        role_id: ctx.session.userRole.id,
                        menu_id: uuids,
                    }
                });
                if (res && role) {
                    return {
                        success: true,
                        msg: '操作成功',
                        body: {
                            menu: {
                                id: uuids,
                                parent_id: params.parent.id,
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

    async getById(params) {
        const {ctx} = this;
        try {
            if (!params.id) {
                return false
            }
            const menu = await ctx.model.SysMenu.findOne({
                where: {
                    id: params.id
                },
            });
            const item = await ctx.model.SysMenu.findOne({
                where: {
                    id: menu.parent_id
                },
            });
            return Promise.all([menu,item])
        } catch (e) {
            throw new Error(e)
        }
    }

    async delete(params) {
       const {ctx} = this;
       try {
           const menuAll = await ctx.model.SysMenu.findAll({
               where: {
                   parent_id: params.id
               },
           });
           const ret = menuAll.map(async item => {
               const response = await ctx.model.SysMenu.update({
                   parent_id: params.pid,
               }, {
                   where: { id: item.id },
               });
               return response;
           });

           const res = await ctx.model.SysMenu.destroy({
               where: { id: params.id },
           })

           return Promise.all([menuAll,ret,res])
       } catch (e) {
          throw new Error(e)
       }
    }
}

module.exports = MenuService;
