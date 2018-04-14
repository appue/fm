'use strict';

const fs   = require('fs');
const argv = require('yargs').argv;
const os   = require('os');

module.exports = {
	// 代码路径
	source: './source/',
	// 编译代码目录
	dist: '../dist/',
	// 运行环境
	run: argv.run || '',
	// 是否开启debug
	isDebug: argv.debug || false,
	// 操作系统类型
	veros: os.platform()
};
