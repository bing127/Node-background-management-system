'use strict'
const Controller = require('egg').Controller;
class RoleController extends Controller {
    async role() {
        const {ctx} = this;
        await ctx.render('layouts/sys/role/sysRole.nsp', {
            theme: ctx.cookies.get('theme'),
            userRole: ctx.session.userRole
        });
    };
    async data() {
        const {ctx,service} = this;
        const params = ctx.query;
        const result = await service.sys.role.role.data(params);
        ctx.body = result
    };
    async form() {
        const {ctx, service} = this;
        try {
            const params = ctx.query;
            const roleItem = await service.sys.role.role.getById(params);
            let role ={
                names:'',
                ids:'',
                role_id:'',
                role_name:'',
                permission:''
            };
            if (roleItem.length>0){
                let roleJson = JSON.parse(JSON.stringify(roleItem));
                let roleName = []
                let roleIds = []
                roleJson[0].sys_menus.forEach((item,index) => {
                    roleName.push(item.name);
                    roleIds.push(item.id);
                })
                role.names=roleName.join(',')
                role.ids=roleIds.join(',')
                role.role_id = roleJson[0].id
                role.role_name = roleJson[0].name
                role.permission = roleJson[0].permission
            }
            await ctx.render('layouts/sys/role/roleForm.nsp', {
                theme: ctx.cookies.get('theme'),
                userRole: ctx.session.userRole,
                role:role
            });
        } catch (e) {
            throw new Error(e);
        }
    };
    async treeView() {
        const {ctx} = this;
        try {
            await ctx.render('layouts/sys/role/roleSelect.nsp', {
                theme: ctx.cookies.get('theme'),
                userRole: ctx.session.userRole
            });
        } catch (e) {
            throw new Error(e);
        }
    };
    async treeselect() {
        const {ctx, service} = this;
        try {
            const params = ctx.query;
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
    async save(){
        try {
            const { ctx,service } = this;
            const params = ctx.request.body;
            const result = await service.sys.role.role.save(params);
            ctx.body = result
        } catch (e) {
            throw new Error(e)
        }
    }

    async delete(){
        try {
            const { ctx,service } = this;
            const params = ctx.query;
            const result = await service.sys.role.role.delete(params);
            if (result){
                ctx.body = {
                    success: true,
                    msg: '操作成功',
                }
            } else{
                ctx.body =  {
                    success: false,
                    msg: '操作失败',
                }
            }
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = RoleController;
