'use strict';

/*
* @ author 苏辰
* @ time   2018/11/19 23:10
* @ description
* @ param
*/
module.exports = app => {
    const { DATE, STRING, UUID } = app.Sequelize;
    const SysDict = app.model.define('sys_dict', {
        id: {
            type: UUID,
            primaryKey: true,
            allowNull: false
        },
        name: STRING(100),
        des: STRING(8),
        created_at: DATE,
        updated_at: DATE,
    }, {
        freezeTableName: true,
        tableName: 'sys_dict',
        underscored: true,
    });

    return SysDict;
};
