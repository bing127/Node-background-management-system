/*
* @ author Administrator
* @ time   2018/11/19/019 14:04
* @ description
* @ param
*/
'use strict'
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const md5 = require('md5');
const fs = require('fs');
const path = require('path');

class ItoolController extends Controller {
    async upload() {
        const {ctx} = this;
        await ctx.render('includes/fileUpload.nsp');
    }

    async fileUpload() {
        const {ctx} = this;
        const stream = await ctx.getFileStream();
        const filename = md5(stream.filename) + path.extname(stream.filename).toLocaleLowerCase();
        const target = path.join(this.config.baseDir, 'app/public/upload/sys', filename);
        const writeStream = fs.createWriteStream(target);
        await awaitWriteStream(stream.pipe(writeStream));
        ctx.body = {
            "success": true,
            "msg": "操作成功",
            "errorCode": "-1",
            "body": {
                key: stream.fields.id,
                id: '/app/public/upload/sys/' + filename,
                url: '/public/upload/sys/' + filename
            }
        }
    }

    async fileDelete() {
        const {ctx} = this;
        const params = ctx.query;
        await fs.unlink(`${this.config.baseDir}` + params.id, (ret) => {
        });
        ctx.body = {"success": true, "errorCode": "-1", "msg": "删除文件成功"}
    }
}

module.exports = ItoolController;

