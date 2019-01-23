/*
* @ author Administrator
* @ time   2018/11/14/014 12:58
* @ description
* @ param
*/
'use strict'
module.exports = app => {
    const {DATE, STRING, UUID, INTEGER} = app.Sequelize;
    const SysMenu = app.model.define('sys_menu', {
        id: {
            type: STRING(64),

            primaryKey: true,
        },
        parent_id: STRING(64),
        name: STRING(100),
        icon: STRING(1000),
        href: STRING(100),
        is_show: STRING(64),
        created_at: DATE,
        updated_at: DATE,
    }, {
        freezeTableName: true,
        tableName: 'sys_menu',
        underscored: true,
    });

    return SysMenu;
};
