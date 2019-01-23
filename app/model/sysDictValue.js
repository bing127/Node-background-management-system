'use strict';

/*
* @ author 苏辰
* @ time   2018/11/19 23:10
* @ description
* @ param
*/
module.exports = app => {
    const { UUID } = app.Sequelize;
    const SysDictValue = app.model.define('sys_dict_value', {
        dict_id: {
            type: UUID,
            primaryKey: true,
            allowNull: false
        },
        value_id:{
            type: UUID,
            primaryKey: true,
            allowNull: false
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'sys_dict_value',
        underscored: true,
    });

    return SysDictValue;
};
