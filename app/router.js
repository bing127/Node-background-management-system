'use strict';

module.exports = app => {
    const {router, controller} = app;
    router.redirect('/', '/sys/index')
    //框架
    router.get('/sys/index', controller.sys.frame.sys.index)
    //home
    router.get('/sys/home', controller.sys.frame.home.home.home)
    //menu
    router.get('/sys/menu', controller.sys.frame.menu.menu.menu)
    router.get('/sys/menu/getChildren', controller.sys.frame.menu.menu.getChildren)
    router.get('/sys/menu/form', controller.sys.frame.menu.menu.form)
    router.get('/tag/treeselect', controller.sys.frame.menu.menu.treeselect)
    router.get('/tag/iconselect', controller.sys.frame.menu.menu.iconselect)
    router.get('/sys/menu/treeData', controller.sys.frame.menu.menu.treeData)
    router.post('/sys/menu/save', controller.sys.frame.menu.menu.save)
    router.get('/sys/menu/delete', controller.sys.frame.menu.menu.delete)
    //dict
    router.get('/sys/dict', controller.sys.frame.dict.dict.dict)
    router.get('/sys/dict/data', controller.sys.frame.dict.dict.dataList)
    router.get('/sys/dict/form', controller.sys.frame.dict.dict.form)
    router.get('/sys/dict/dictValueForm', controller.sys.frame.dict.dict.dictValueForm)
    router.get('/sys/dict/getDictValue', controller.sys.frame.dict.dict.getDictValue)
    router.post('/sys/dict/save', controller.sys.frame.dict.dict.dictSave)
    router.post('/sys/dict/saveDictValue', controller.sys.frame.dict.dict.saveDictValue)
    router.get('/sys/dict/deleteAll', controller.sys.frame.dict.dict.deleteAll)
    router.get('/sys/dict/deleteDictValue', controller.sys.frame.dict.dict.deleteDictValue)
    //user
    router.get('/sys/login', controller.sys.frame.user.user.login)
    router.get('/sys/captcha', controller.sys.frame.user.user.captcha)
    router.post('/sys/loginAction', controller.sys.frame.user.user.loginAction)
    router.get('/sys/logout', controller.sys.frame.user.user.logout)
    router.get('/sys/register', controller.sys.frame.user.user.register)
    router.get('/sys/user', controller.sys.frame.user.user.userView)
    router.get('/sys/user/data', controller.sys.frame.user.user.dataList)
    router.get('/sys/user/form', controller.sys.frame.user.user.form)
    router.post('/sys/user/save', controller.sys.frame.user.user.save)
    router.get('/sys/user/delete', controller.sys.frame.user.user.delete)
    router.post('/sys/sendmail', controller.sys.frame.user.user.sendmail)
    //role
    router.get('/sys/role', controller.sys.frame.role.role.role)
    router.get('/sys/role/data', controller.sys.frame.role.role.data)
    router.get('/sys/role/form', controller.sys.frame.role.role.form)
    router.get('/sys/role/treeView', controller.sys.frame.role.role.treeView)
    router.get('/sys/role/treeselect', controller.sys.frame.role.role.treeselect)
    router.post('/sys/role/save', controller.sys.frame.role.role.save)
    router.get('/sys/role/delete', controller.sys.frame.role.role.delete)
    //theme
    router.get(/^\/theme\/([\w-.]+)$/, controller.sys.frame.configs.configs.theme);
    //itools
    router.get('/sys/upload', controller.sys.frame.itool.itool.upload);
    router.post('/sys/file/upload', controller.sys.frame.itool.itool.fileUpload);
    router.get('/sys/file/delete', controller.sys.frame.itool.itool.fileDelete);
    //other
    router.get('/sys/watch', controller.sys.frame.other.other.other);
};
