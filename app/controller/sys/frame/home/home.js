/*
* @ author Administrator
* @ time   2018/11/15/015 11:38
* @ description
* @ param
*/
'use strict'
const Controller = require('egg').Controller;
class HomeController extends Controller {
    async home(){
        const { ctx } = this;
        await ctx.render('layouts/sys/home/sysHome.nsp');
    }
}

module.exports = HomeController;
