/*
* @ author Administrator
* @ time   2018/11/15/015 11:37
* @ description
* @ param
*/
'use strict'
const Controller = require('egg').Controller;
const arrayToTree = require('array-to-tree');

class MenuController extends Controller {
    async menu() {
        const {ctx} = this;
        await ctx.render('layouts/sys/menu/sysMenu.nsp', {
            theme: ctx.cookies.get('theme'),
            userRole: ctx.session.userRole
        });
    };

    async getChildren() {
        const {ctx, service} = this;
        const params = ctx.query;
        const result = await service.sys.menu.menu.getChildren(params);
        let ret = JSON.parse(JSON.stringify(result[0].sys_menus))
        if (ret.length > 0) {
            ret.forEach(function (item, index) {
                item.hasChildren = true
            })
        }
        ctx.body = ret.length > 0 ? ret : []
    }

    async form() {
        const {ctx, service} = this;
        try {
            const params = ctx.query;
            const menuItem = await service.sys.menu.menu.getById(params);
            await ctx.render('layouts/sys/menu/menuForm.nsp', {
                theme: ctx.cookies.get('theme'),
                userRole: ctx.session.userRole,
                menu: menuItem
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async iconselect() {
        const {ctx, service} = this;
        try {
            await ctx.render('/includes/iconselect.nsp', {
                theme: ctx.cookies.get('theme'),
                userRole: ctx.session.userRole
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async treeselect() {
        const {ctx, service} = this;
        try {
            const params = ctx.query;
            await ctx.render('/includes/treeselect.nsp', {
                theme: ctx.cookies.get('theme'),
                userRole: ctx.session.userRole,
                extId: params ? params.extId : ''
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async treeData() {
        const {ctx, service} = this;
        const params = ctx.query;
        try {
            const result = await service.sys.menu.menu.findMenu();
            let pitem = {
                parent:"#",
                icon: 'fa fa-home',
                id: '0',
                text: '功能菜单',
                state: {
                    opened: true,
                }
            };
            let jsonMenu = JSON.parse(JSON.stringify(result));
            if (jsonMenu.length > 0) {
                jsonMenu = jsonMenu.filter((item, index) => {
                    return item.id !== params.extId
                })
                jsonMenu.forEach((item, index) => {
                    item.text = item.name;
                    item.parent = item.parent_id;
                })
            }
            jsonMenu.unshift(pitem)
            ctx.body = jsonMenu
        } catch (e) {
            throw new Error(e);
        }
    };

    async save() {
        const {ctx, service} = this;
        const params = ctx.request.body;
        const result = await service.sys.menu.menu.save(params);
        ctx.body = result
    }

    async delete() {
        const {ctx, service} = this;
        try {
            const params = ctx.query;
            await service.sys.menu.menu.delete(params);
            ctx.body = {
                success: true,
                msg: '删除成功',
            };
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = MenuController;
