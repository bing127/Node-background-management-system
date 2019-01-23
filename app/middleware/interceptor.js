/*
* @ author Administrator
* @ time   2018/11/13/013 18:41
* @ description
* @ param
*/
'use strict'
module.exports = options => {
    return async function interceptor(ctx, next) {
        let userInfo = ctx.session.userInfo;
        if(!userInfo) {
            return ctx.redirect('/sys/login');
        }
        await next();
    };
}
