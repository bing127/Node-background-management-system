/*
* @ author Administrator
* @ time   2018/11/14/014 12:58
* @ description
* @ param
*/
'use strict'
module.exports = app => {
    const { DATE, STRING, UUID } = app.Sequelize;
    const SysRole = app.model.define('sys_role', {
        id: {
            type: UUID,
            primaryKey: true,
            allowNull: false
        },
        name: STRING(100),
        permission: STRING(8),
        created_at: DATE,
        updated_at: DATE,
    }, {
        freezeTableName: true,
        tableName: 'sys_role',
        underscored: true,
    });

    return SysRole;
};
