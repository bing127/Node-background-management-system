/*
* @ author Administrator
* @ time   2018/11/14/014 12:58
* @ description
* @ param
*/
'use strict'
module.exports = app => {
    const { UUID } = app.Sequelize;
    const SysRoleMenu = app.model.define('sys_role_menu', {
        role_id: {
            type: UUID,
            primaryKey: true,
            allowNull: false
        },
        menu_id:{
            type: UUID,
            primaryKey: true,
            allowNull: false
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'sys_role_menu',
        underscored: true,
    });

    return SysRoleMenu;
};
