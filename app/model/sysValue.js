'use strict';

/*
* @ author 苏辰
* @ time   2018/11/19 23:10
* @ description
* @ param
*/
module.exports = app => {
    const { DATE, STRING, UUID } = app.Sequelize;
    const SysValue = app.model.define('sys_value', {
        id: {
            type: UUID,
            primaryKey: true,
            allowNull: false
        },
        name: STRING(100),
        key: STRING(100),
        created_at: DATE,
        updated_at: DATE,
    }, {
        freezeTableName: true,
        tableName: 'sys_value',
        underscored: true,
    });

    return SysValue;
};
