/*
* @ author Administrator
* @ time   2018/11/14/014 12:58
* @ description
* @ param
*/
'use strict'
module.exports = app => {
    const { DATE, STRING, UUID } = app.Sequelize;
    const SysUser = app.model.define('sys_user', {
        id: {
            type: UUID,
            primaryKey: true,
            allowNull: false
        },
        role_id: UUID,
        username: STRING(100),
        nickname: STRING(100),
        password: STRING(100),
        photo: STRING(1000),
        email: STRING(1000),
        phone: STRING(1000),
        ip: STRING(1000),
        is_login: STRING(64),
        created_at: DATE,
        updated_at: DATE,
    }, {
        freezeTableName: true,
        tableName: 'sys_user',
        underscored: true,
    });

    return SysUser;
};
