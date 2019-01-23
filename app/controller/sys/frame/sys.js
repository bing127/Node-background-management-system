/*
* @ author Administrator
* @ time   2018/11/14/014 11:51
* @ description
* @ param
*/
'use strict'
const Controller = require('egg').Controller;
const arrayToTree = require('array-to-tree')
class SysController extends Controller {
    async index() {
        const {ctx, service} = this;
        try {
            let result = await service.sys.user.user.getUserById(ctx.session.userInfo);
            let ret = JSON.parse(JSON.stringify(result[0].sys_menus))
            let menu = await arrayToTree(ret, {
                parentProperty: 'parent_id',
                customID: 'id'
            });
            ctx.app.config.product.productUrl = ctx.origin;
            ctx.session.userRole = {
                id: result[0].id,
                name: result[0].name,
                permission: result[0].permission,
            };
            await ctx.render('layouts/sys.nsp', {
                product: ctx.app.config.product,
                theme: ctx.cookies.get('theme'),
                userInfo: ctx.session.userInfo,
                menu: menu,
                role: {
                    id: result[0].id,
                    name: result[0].name,
                    permission: result[0].permission,
                }
            });
        } catch (e) {
            throw new Error(e)
        }
    };
}

module.exports = SysController;
