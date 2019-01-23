/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost:3306
 Source Schema         : neeplus

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : 65001

 Date: 23/01/2019 17:55:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict`  (
  `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `des` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
INSERT INTO `sys_dict` VALUES ('2531c740ec9d11e8bf5c0f437da3ed25', 'sex', '性别', '2018-11-20 08:20:31', '2018-11-20 08:20:31');

-- ----------------------------
-- Table structure for sys_dict_value
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_value`;
CREATE TABLE `sys_dict_value`  (
  `dict_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `value_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`dict_id`, `value_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of sys_dict_value
-- ----------------------------
INSERT INTO `sys_dict_value` VALUES ('2531c740ec9d11e8bf5c0f437da3ed25', '09cd4380ed6f11e8876cddba11912883');
INSERT INTO `sys_dict_value` VALUES ('2531c740ec9d11e8bf5c0f437da3ed25', '5fdb0550ec9d11e8bf5c0f437da3ed25');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `parent_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `href` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_show` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('32345c607b1a11e89c9c2d42b21b1a3a', '0', '常用工具', 'fa fa-wrench', NULL, '1', '2018-11-15 23:51:57', '2018-11-15 23:52:01');
INSERT INTO `sys_menu` VALUES ('35735c607b1a11e89c9c2d42b21b1a3m', '45745c607b1a11e89c9c2d42b21b1a3m', '菜单管理', NULL, '/sys/menu', '1', '2018-11-15 10:45:30', '2018-11-15 10:45:33');
INSERT INTO `sys_menu` VALUES ('3e8e3ea0ebce11e88f4b0dc472ff4858', '45745c607b1a11e89c9c2d42b21b1a3m', '角色管理', '', '/sys/role', '1', '2018-11-19 07:39:28', '2018-11-19 07:39:28');
INSERT INTO `sys_menu` VALUES ('434e4d60e9ce11e89315295fcedc6afd', '45745c607b1a11e89c9c2d42b21b1a3m', '用户管理', '', '/sys/user', '1', '2018-11-16 18:34:33', '2018-11-16 18:34:33');
INSERT INTO `sys_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3m', '0', '系统设置', 'fa fa-gear', '', '1', '2018-11-14 13:07:29', '2018-11-16 18:33:32');
INSERT INTO `sys_menu` VALUES ('52745c607b1a11e89c9c2d42b21b56qw', '45745c607b1a11e89c9c2d42b21b1a3m', '字典管理', '', '/sys/dict', '1', '2018-11-15 11:17:54', '2018-11-16 17:16:01');
INSERT INTO `sys_menu` VALUES ('e521df90e9cd11e89315295fcedc6afd', '32345c607b1a11e89c9c2d42b21b1a3a', '系统监控', '', '/sys/watch', '1', '2018-11-16 18:31:55', '2018-11-16 18:33:20');
INSERT INTO `sys_menu` VALUES ('e96e60e0e9ce11e89315295fcedc6afd', '0', '消息管理', 'fa fa-comments-o', '/sys/msg', '1', '2018-11-16 18:39:12', '2018-12-02 12:17:43');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `permission` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '权限(1、所有权限；2、查看权限)',
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('44ac0980f78011e884a4ebf35718087e', '普通管理员', '2', '2018-12-04 04:51:31', '2018-12-04 04:51:31');
INSERT INTO `sys_role` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '超级管理员', '1', '2018-11-14 20:33:18', '2018-11-14 20:33:20');

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `role_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `menu_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES ('0f4e3b20ec8911e89fc54fad177f500e', '2eb228d0e9cf11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('0f4e3b20ec8911e89fc54fad177f500e', '32345c607b1a11e89c9c2d42b21b1a3a');
INSERT INTO `sys_role_menu` VALUES ('0f4e3b20ec8911e89fc54fad177f500e', '35735c607b1a11e89c9c2d42b21b1a3m');
INSERT INTO `sys_role_menu` VALUES ('0f4e3b20ec8911e89fc54fad177f500e', '3e8e3ea0ebce11e88f4b0dc472ff4858');
INSERT INTO `sys_role_menu` VALUES ('0f4e3b20ec8911e89fc54fad177f500e', '434e4d60e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('0f4e3b20ec8911e89fc54fad177f500e', '45745c607b1a11e89c9c2d42b21b1a3m');
INSERT INTO `sys_role_menu` VALUES ('0f4e3b20ec8911e89fc54fad177f500e', '52745c607b1a11e89c9c2d42b21b56qw');
INSERT INTO `sys_role_menu` VALUES ('0f4e3b20ec8911e89fc54fad177f500e', 'e521df90e9cd11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('0f4e3b20ec8911e89fc54fad177f500e', 'e96e60e0e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('1131b450ebdd11e8a8b9390ca15056e1', '32345c607b1a11e89c9c2d42b21b1a3a');
INSERT INTO `sys_role_menu` VALUES ('1131b450ebdd11e8a8b9390ca15056e1', '35735c607b1a11e89c9c2d42b21b1a3m');
INSERT INTO `sys_role_menu` VALUES ('1131b450ebdd11e8a8b9390ca15056e1', '3e8e3ea0ebce11e88f4b0dc472ff4858');
INSERT INTO `sys_role_menu` VALUES ('1131b450ebdd11e8a8b9390ca15056e1', '434e4d60e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('1131b450ebdd11e8a8b9390ca15056e1', '45745c607b1a11e89c9c2d42b21b1a3m');
INSERT INTO `sys_role_menu` VALUES ('1131b450ebdd11e8a8b9390ca15056e1', '52745c607b1a11e89c9c2d42b21b56qw');
INSERT INTO `sys_role_menu` VALUES ('1131b450ebdd11e8a8b9390ca15056e1', 'e521df90e9cd11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('23aefd00ec8b11e8b02defef03e34863', '2eb228d0e9cf11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('23aefd00ec8b11e8b02defef03e34863', '32345c607b1a11e89c9c2d42b21b1a3a');
INSERT INTO `sys_role_menu` VALUES ('23aefd00ec8b11e8b02defef03e34863', 'e521df90e9cd11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('23aefd00ec8b11e8b02defef03e34863', 'e96e60e0e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '08cd7920ebe211e897a3370f256dcf0e');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '105e5f20e9b611e8ace69f5b15d7099a');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '1b1fc660e9c011e8908e85c641df00a6');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '1bd21850ebe211e897a3370f256dcf0e');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '272fe700e9c511e8b403457ee948facc');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '2eb228d0e9cf11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '32345c607b1a11e89c9c2d42b21b1a3a');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '325c7f20e8fe11e895be975feb296404');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '33956ce0e9c511e8b403457ee948facc');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '35735c607b1a11e89c9c2d42b21b1a3m');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '38116a10e8ff11e88735eb0dbf5ac379');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '3e8e3ea0ebce11e88f4b0dc472ff4858');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '434e4d60e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '4559d6d0e9b811e8b79e37105566629d');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '45745c607b1a11e89c9c2d42b21b1a3m');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '4febd330e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '52745c607b1a11e89c9c2d42b21b56qw');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '5ac31900e8ff11e88735eb0dbf5ac379');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '621604d0e9b611e8ace69f5b15d7099a');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '63330ca0e8fd11e8b86be38c24370c8f');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '665d7b10e9cd11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '66b84650e8fe11e895be975feb296404');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '6731c790e9b811e8b79e37105566629d');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '7b37a820e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', '98218060e9cd11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', 'b93c83a0eb9711e8b096e515b914fd1b');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', 'c3533310e9cc11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', 'e521df90e9cd11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('45745c607b1a11e89c9c2d42b21b1a3a', 'e96e60e0e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('56e63f70ebdd11e8a7db1d546fdfdf83', '2eb228d0e9cf11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('56e63f70ebdd11e8a7db1d546fdfdf83', 'e96e60e0e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('571d08d0ec8b11e8af288d05a41740df', '2eb228d0e9cf11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('571d08d0ec8b11e8af288d05a41740df', '32345c607b1a11e89c9c2d42b21b1a3a');
INSERT INTO `sys_role_menu` VALUES ('571d08d0ec8b11e8af288d05a41740df', 'e521df90e9cd11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('571d08d0ec8b11e8af288d05a41740df', 'e96e60e0e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('581f3f30ebde11e88eee13adcd5d4e6d', '2eb228d0e9cf11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('581f3f30ebde11e88eee13adcd5d4e6d', '32345c607b1a11e89c9c2d42b21b1a3a');
INSERT INTO `sys_role_menu` VALUES ('581f3f30ebde11e88eee13adcd5d4e6d', 'e521df90e9cd11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('581f3f30ebde11e88eee13adcd5d4e6d', 'e96e60e0e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('b036f960ebde11e88eee13adcd5d4e6d', '2eb228d0e9cf11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('b036f960ebde11e88eee13adcd5d4e6d', '32345c607b1a11e89c9c2d42b21b1a3a');
INSERT INTO `sys_role_menu` VALUES ('b036f960ebde11e88eee13adcd5d4e6d', 'e521df90e9cd11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('b036f960ebde11e88eee13adcd5d4e6d', 'e96e60e0e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('d0e9c080ebdd11e88eee13adcd5d4e6d', '35735c607b1a11e89c9c2d42b21b1a3m');
INSERT INTO `sys_role_menu` VALUES ('d0e9c080ebdd11e88eee13adcd5d4e6d', '3e8e3ea0ebce11e88f4b0dc472ff4858');
INSERT INTO `sys_role_menu` VALUES ('d0e9c080ebdd11e88eee13adcd5d4e6d', '434e4d60e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('d0e9c080ebdd11e88eee13adcd5d4e6d', '45745c607b1a11e89c9c2d42b21b1a3m');
INSERT INTO `sys_role_menu` VALUES ('d0e9c080ebdd11e88eee13adcd5d4e6d', '52745c607b1a11e89c9c2d42b21b56qw');
INSERT INTO `sys_role_menu` VALUES ('d0e9c080ebdd11e88eee13adcd5d4e6d', 'e96e60e0e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('e0311a80ebe611e8a9f571e02776742f', '35735c607b1a11e89c9c2d42b21b1a3m');
INSERT INTO `sys_role_menu` VALUES ('e0311a80ebe611e8a9f571e02776742f', '3e8e3ea0ebce11e88f4b0dc472ff4858');
INSERT INTO `sys_role_menu` VALUES ('e0311a80ebe611e8a9f571e02776742f', '52745c607b1a11e89c9c2d42b21b56qw');
INSERT INTO `sys_role_menu` VALUES ('e0311a80ebe611e8a9f571e02776742f', 'e96e60e0e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('ed238d30ebdd11e88eee13adcd5d4e6d', '32345c607b1a11e89c9c2d42b21b1a3a');
INSERT INTO `sys_role_menu` VALUES ('ed238d30ebdd11e88eee13adcd5d4e6d', 'e521df90e9cd11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('ed238d30ebdd11e88eee13adcd5d4e6d', 'e96e60e0e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('f6111730ec8911e8b02defef03e34863', '2eb228d0e9cf11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('82bd9c60ecaa11e8a1c07f941d6d36a7', '2eb228d0e9cf11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('95e7c4f0ecaa11e8a1c07f941d6d36a7', '2eb228d0e9cf11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('95e7c4f0ecaa11e8a1c07f941d6d36a7', 'e96e60e0e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('6d6a1ea0ecbf11e8832289bc2f3c0f48', '2eb228d0e9cf11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('6d6a1ea0ecbf11e8832289bc2f3c0f48', 'e96e60e0e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('44ac0980f78011e884a4ebf35718087e', '0');
INSERT INTO `sys_role_menu` VALUES ('44ac0980f78011e884a4ebf35718087e', '2eb228d0e9cf11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('44ac0980f78011e884a4ebf35718087e', '32345c607b1a11e89c9c2d42b21b1a3a');
INSERT INTO `sys_role_menu` VALUES ('44ac0980f78011e884a4ebf35718087e', 'e521df90e9cd11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('44ac0980f78011e884a4ebf35718087e', '45745c607b1a11e89c9c2d42b21b1a3m');
INSERT INTO `sys_role_menu` VALUES ('44ac0980f78011e884a4ebf35718087e', '35735c607b1a11e89c9c2d42b21b1a3m');
INSERT INTO `sys_role_menu` VALUES ('44ac0980f78011e884a4ebf35718087e', '3e8e3ea0ebce11e88f4b0dc472ff4858');
INSERT INTO `sys_role_menu` VALUES ('44ac0980f78011e884a4ebf35718087e', '434e4d60e9ce11e89315295fcedc6afd');
INSERT INTO `sys_role_menu` VALUES ('44ac0980f78011e884a4ebf35718087e', '52745c607b1a11e89c9c2d42b21b56qw');
INSERT INTO `sys_role_menu` VALUES ('44ac0980f78011e884a4ebf35718087e', 'e96e60e0e9ce11e89315295fcedc6afd');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sex` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_login` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `photo` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('02c75a3008db11e98ec4a5e12473dc05', '123', '123', '0', '202cb962ac59075b964b07152d234b70', '0', NULL, 'test@163.com', NULL, NULL, NULL, '2018-12-26 06:53:54', '2018-12-26 06:53:54');
INSERT INTO `sys_user` VALUES ('1', 'admin', 'admin', '1', 'e10adc3949ba59abbe56e057f20f883e', '1', '', 'test@163.com', '45745c607b1a11e89c9c2d42b21b1a3a', '/public/upload/sys/3611b8f047b4e6ecc834c60223900f66.gif', '10.163.45.57', '2018-11-14 13:05:25', '2019-01-07 14:54:28');
INSERT INTO `sys_user` VALUES ('3f76535008db11e98ec4a5e12473dc05', 'noob', 'noob', '1', 'e10adc3949ba59abbe56e057f20f883e', '0', NULL, 'test@163.com', NULL, NULL, NULL, '2018-12-26 06:55:36', '2018-12-26 06:55:36');
INSERT INTO `sys_user` VALUES ('fbff1210fe2611e88fb4ab5ff63ba2b2', 'scc', 'scc', '0', '5912d07d9cf65baa9580274700beaae8', '1', '', 'test@163.com', '44ac0980f78011e884a4ebf35718087e', '/public/upload/sys/162dce4377668d35747ee7e337892667.png', '', '2018-12-12 16:00:02', '2018-12-17 09:02:24');

-- ----------------------------
-- Table structure for sys_value
-- ----------------------------
DROP TABLE IF EXISTS `sys_value`;
CREATE TABLE `sys_value`  (
  `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of sys_value
-- ----------------------------
INSERT INTO `sys_value` VALUES ('09cd4380ed6f11e8876cddba11912883', '女', '2', '2018-11-21 09:22:59', '2018-11-21 09:22:59');
INSERT INTO `sys_value` VALUES ('5fdb0550ec9d11e8bf5c0f437da3ed25', '男', '1', '2018-11-20 08:22:09', '2018-11-20 08:22:09');

SET FOREIGN_KEY_CHECKS = 1;
