/*
* @ author Administrator
* @ time   2018/11/14/014 11:40
* @ description
* @ param
*/
'use strict'
const _l = require('lodash')
const _date = require('dayjs')
const _md5 = require('md5')
const _uuid = require('uuid/v1')
const _itools = require('ljtools')
const _encrypt = require("simple-encryptor")("neeplus rapid development platform")
module.exports = {
    _l,
    _date,
    _md5,
    _uuid,
    _itools,
    _encrypt
}