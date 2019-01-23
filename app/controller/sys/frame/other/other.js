/*
* @ author Administrator
* @ time   2018/11/19/019 18:04
* @ description
* @ param
*/
'use strict'
const Controller = require('egg').Controller;
const nodeInfo = require('node-version');
const serverHealth = require("server-health")
const restify = require('restify')
const os = require('os');
class OtherController extends Controller {
    async other(){
        const { ctx } = this;
        const typeStr = {
            'Linux': 'Linux',
            'Darwin': 'MacOS',
            'Windows_NT': 'Windows',
        }[os.type()];
        const networkInterfaces = os.networkInterfaces();
        const networkObj = (() => {
            let localIP = '';
            let networkIP = '';
            for (const key in networkInterfaces) {
                if (networkInterfaces.hasOwnProperty(key)) {
                    const list = networkInterfaces[key];
                    list.forEach((d) => {
                        if (d.family === 'IPv4') {
                            if (d.internal) {
                                localIP = d.address;
                            } else {
                                networkIP = d.address;
                            }
                        }
                    });
                }
            }
            return {
                localIP,
                networkIP,
            };
        })();
        let info = {
            type:typeStr,//系统类型
            tmpdir: os.tmpdir(),  //系统主机名
            hostname:os.hostname(),//系统主机名
            localIP:networkObj.localIP,//本机IP
            release: os.release(),
            networkInterfaces:networkObj.networkIP, //网络IP
            totalmem: Math.floor(os.totalmem() / (1024 * 1024)) + 'M',//系统内存
            freemem:Math.floor(os.freemem() / (1024 * 1024)) + 'M', //系统空闲内存
            homedir: os.homedir(),
            uptimeStr: Math.floor(os.uptime() / (60 * 60)) + '小时'
        }
        info = Object.assign(info,{nodeVersion:nodeInfo.original});
        await ctx.render('layouts/sys/other/other.nsp',{
            theme: ctx.cookies.get('theme'),
            userRole:ctx.session.userRole,
            info:info
        });
    }
}

module.exports = OtherController;
