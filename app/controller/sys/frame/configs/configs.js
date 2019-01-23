'use strict';

/*
* @ author 苏辰
* @ time   2018/11/15 0:56
* @ description
* @ param
*/
const Controller = require('egg').Controller;
class ConfigsController extends Controller {
    async theme() {
        const { ctx } = this;
        ctx.cookies.set('theme',ctx.query.name);
        try {
            let num = ctx.query.url.indexOf(ctx.host)+ctx.host.length;
            let result = ctx.query.url.substr(num,ctx.query.url.length-1)
            await ctx.redirect(result)
        } catch (e) {
            await ctx.redirect('/')
            throw new Error(e)
        }
    }
}

module.exports = ConfigsController;
