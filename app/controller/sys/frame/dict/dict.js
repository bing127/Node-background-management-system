/*
* @ author Administrator
* @ time   2018/11/15/015 11:37
* @ description
* @ param
*/
'use strict'
const Controller = require('egg').Controller;
class DictController extends Controller {
    async dict(){
        const { ctx } = this;
        await ctx.render('layouts/sys/dict/sysDict.nsp',{
            theme: ctx.cookies.get('theme'),
            userRole:ctx.session.userRole
        });
    }
    async dataList(){
        const {ctx,service} = this;
        try {
            const params = ctx.query;
            const res = await service.sys.dict.dict.dataList(params);
            ctx.body = res;
        } catch (e) {
            throw new Error(e)
        }
    }
    async getDictValue() {
       const {ctx,service} = this;
       try {
           const params = ctx.query;
           const res = await service.sys.dict.dict.getDictValue(params);
           ctx.body = res;
       } catch (e) {
          throw new Error(e)
       }
    }
    async form() {
       const {ctx,service} = this;
       try {
           const params = ctx.query;
           const dictItem = await service.sys.dict.dict.getById(params);
           await ctx.render('layouts/sys/dict/dictForm.nsp', {
               theme: ctx.cookies.get('theme'),
               userRole: ctx.session.userRole,
               dict: dictItem
           });
       } catch (e) {
          throw new Error(e)
       }
    }
    async dictValueForm() {
       const {ctx,service} = this;
       try {
           const params = ctx.query;
           const dictItem = await service.sys.dict.dict.getByValueId(params);
           await ctx.render('layouts/sys/dict/dictValueForm.nsp', {
               theme: ctx.cookies.get('theme'),
               userRole: ctx.session.userRole,
               dictTypeId:params.dictTypeId,
               dict: dictItem
           });
       } catch (e) {
          throw new Error(e)
       }
    }
    async dictSave() {
       const {ctx,service} = this;
       try {
         const params = ctx.request.body;
         const result = await service.sys.dict.dict.dictSave(params);
         ctx.body = result
       } catch (e) {
          throw new Error(e)
       }
    }
    async saveDictValue() {
       const {ctx,service} = this;
       try {
         const params = ctx.request.body;
         await service.sys.dict.dict.saveDictValue(params);
         ctx.body = {
             success: true,
             msg:'操作成功'
         }
       } catch (e) {
          throw new Error(e)
       }
    }
    async deleteAll() {
       const {ctx,service} = this;
       try {
         const params = ctx.query;
           await service.sys.dict.dict.deleteAll(params);
           ctx.body = {
               success:true,
               msg:'操作成功'
           }
       } catch (e) {
          throw new Error(e)
       }
    }

    async deleteDictValue() {
       const {ctx,service} = this;
       try {
         const params = ctx.query;
           await service.sys.dict.dict.deleteDictValue(params);
           ctx.body = {
               success:true,
               msg:'操作成功'
           }
       } catch (e) {
          throw new Error(e)
       }
    }
}

module.exports = DictController;
