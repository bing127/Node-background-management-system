/*
* @ author Administrator
* @ time   2018/11/14/014 11:46
* @ description
* @ param
*/
'use strict'

const Controller = require('egg').Controller;
const captchapng = require('captchapng2');
const dayjs = require('dayjs');
const md5 = require('md5');
const svgCaptcha = require("svg-captcha");
const encryptor = require("simple-encryptor")("neeplus rapid development platform");
const internalIp = require('internal-ip');
const nodemailer = require('nodemailer');

class UserController extends Controller {
    async login() {
        const {ctx} = this;
        await ctx.render('layouts/user/login.nsp', {
            product: ctx.app.config.product
        });
    }

    async loginAction() {
        const {ctx, service} = this;
        const params = ctx.request.body;
        const cap = ctx.cookies.get('captcha');
        if (encryptor.decrypt(cap) !== params.validateCode) {
            return ctx.render('layouts/user/login.nsp', {
                success: false,
                msg: '验证码错误',
                product: ctx.app.config.product
            })
        } else {
            const res = await service.sys.user.user.login(params);
            if (!res) {
                return ctx.render('layouts/user/login.nsp', {
                    success: false,
                    msg: '账号或密码错误',
                    product: ctx.app.config.product
                })
            } else {
                if (res.is_login == '1') {
                    await internalIp.v4().then(async ip => {
                        await service.sys.user.user.update({id: res.id, ip: ip});
                    });
                    ctx.session.userInfo = {
                        id: res.id,
                        photo: res.photo,
                        username: res.username,
                        nickname: res.nickname,
                        role_id: res.role_id
                    }
                    await ctx.redirect('/')
                } else {
                    return ctx.render('layouts/user/login.nsp', {
                        success: false,
                        msg: '不允许登录，请联系管理员',
                        product: ctx.app.config.product
                    })
                }
            }
        }
        ;
    }

    async logout() {
        const {ctx, service} = this;
        await service.sys.user.user.logout({id: ctx.session.userInfo.id});
        ctx.session = null;
        await ctx.redirect('/sys/login');
    }

    async register() {
        const {ctx} = this;
        await ctx.render('layouts/user/register.nsp');
    }

    async captcha() {
        const {ctx} = this;
        const captcha = svgCaptcha.createMathExpr({
            width: 96,
            height: 44,
            noise: 3,
            background: '#f0f1f5',
            color: true
        })
        let encrypted = encryptor.encrypt(captcha.text);
        ctx.cookies.set('captcha', encrypted, {maxAge: 1800 * 1000, httpOnly: true});
        ctx.body = captcha.data
        // const cap = parseInt(Math.random() * 9000 + 1000);
        // const p = new captchapng(80, 30, cap);
        // const base64 = p.getBase64();
        // ctx.cookies.set('captcha', cap, { maxAge: 360000, httpOnly: true });
        // ctx.status = 200;
        // ctx.body = 'data:image/png;base64,' + base64;
    }

    async userView() {
        const {ctx} = this;
        try {
            await ctx.render('/layouts/user/user.nsp', {
                theme: ctx.cookies.get('theme'),
                userRole: ctx.session.userRole
            })
        } catch (e) {
            throw new Error(e)
        }
    }

    async dataList() {
        const {ctx, service} = this;
        try {
            const params = ctx.query;
            const res = await service.sys.user.user.dataList(params);
            ctx.body = res;
        } catch (e) {
            throw new Error(e)
        }
    }

    async form() {
        const {ctx, service} = this;
        try {
            const params = ctx.query;
            let userItem = await service.sys.user.user.getById(params);
            let userJson;
            if (userItem) {
                userJson = JSON.parse(JSON.stringify(userItem))
                userJson.created_at = dayjs(userItem.created_at).format('YYYY年MM月DD日 HH:mm:ss');
                userJson.updated_at = dayjs(userItem.updated_at).format('YYYY年MM月DD日 HH:mm:ss');
                userJson.password = md5(userItem.password);
            }
            const roleData = await service.sys.user.user.getRole();
            await ctx.render('layouts/user/userForm.nsp', {
                theme: ctx.cookies.get('theme'),
                userRole: ctx.session.userRole,
                user: userJson,
                role: roleData.data
            });
        } catch (e) {
            throw new Error(e)
        }
    }

    async save() {
        const {ctx, service} = this;
        try {
            const params = ctx.request.body;
            const result = await service.sys.user.user.save(params);
            ctx.body = result
        } catch (e) {
            throw new Error(e)
        }
    }

    async delete() {
        const {ctx, service} = this;
        try {
            const params = ctx.query;
            let userIds = params.ids.split(',')
            let filterJson = userIds.some((item, index) => {
                return item == '1'
            })
            if (filterJson) {
                ctx.body = {
                    success: false,
                    msg: '删除失败，admin用户不允许删除',
                }
            } else {
                await service.sys.user.user.delete(params);
                ctx.body = {success: true, msg: '删除成功'}
            }
        } catch (e) {
            throw new Error(e)
        }
    };

    async sendmail() {
        const { ctx } = this;
        const params = ctx.request.body;
        try {
            const reg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/;
            if (!reg.test(params.mail)) {
                ctx.body = { msg:'邮箱地址不符合规范，请重新输入！' }
                return false;
            }
            const code = ctx.helper._itools.randomWords(6);
            ctx.cookies.set('email', ctx.helper._encrypt.encrypt(code), {maxAge: 1800 * 1000, httpOnly: true});
            const transporter = nodemailer.createTransport({
                host: ctx.app.config.mail.host,
                secureConnection: true,
                port: ctx.app.config.mail.port,
                auth: ctx.app.config.mail.auth
            });
           await transporter.sendMail({
                from: `${ctx.app.config.product.productName} <${ctx.app.config.mail.from}>`,
                to: params.mail,
                subject: `注册${ctx.app.config.product.productName}验证码`,
                text: params.data,
                html: `感谢您使用<b>${ctx.app.config.product.productDescription}</b><br/><br/>您的验证码为：<br/><div style="font-size: 30px;width: 100%;text-align: center;margin-top: 50px;background: #f0f1f5;font-weight: bolder;height: 100px;line-height: 100px">${code}</div><br/><br/><p>有效期为十分钟！</p>`
            },function (error, info) {
               if (error) {
                   return process.exit(1);
               }
                transporter.close();
           });
           ctx.body = { msg:'邮件发送成功，请注意查收！' }
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = UserController;
