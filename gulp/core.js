'use strict';

const fs      = require('fs');
const $util   = require('./tools/util.js');
const $$      = require('./config.js');
const argv    = require('yargs').argv;
const version = new Date().getTime();

let netPort,netPath;

switch ($$.run) {
	case 'build':
		netPath = $$.dist;
	break;

	default:
		netPath = $$.source;
}

module.exports = function (gulp, $) {
	// 编译sass
	gulp.task('sass', () => {
		gulp.src($$.source +'themes/*.scss')
			.pipe($.plumber())
			.pipe($.sass())
			.pipe($.size({title: 'css'}))
			.pipe(gulp.dest($$.source +'themes/'));
	});

	// 清理文件夹
	gulp.task('clean', () => {
		if ($$.run !== 'build') return;

		return gulp.src([
				$$.dist,
				'./.tmp'
			],{read: false})
			.pipe($.rimraf({force: true}));
	});

	// 启动本地服务
	gulp.task('service', () => {
		if ($$.run == 'build') return;

		$.connect.server({
			root: netPath,
			port: 9090,
			livereload: true
		});

		let url = 'http://127.0.0.1:9090';

		switch ($$.veros) {
			case 'win32':
				url = 'start '+ url;
			break;

			case 'darwin':
				url = 'open '+ url;
			break;
		}

		gulp.src('')
			.pipe($.shell(url));
	});

	// 监听文件变化
	gulp.task('watch', () => {
		$.livereload.listen();

		$.watch($$.source +'themes/**/*.scss', () => {
			return gulp.src($$.source +'themes/*.scss')
				.pipe($.plumber())
				.pipe($.sass())
				.pipe($.size({title: 'css'}))
				.pipe(gulp.dest($$.source +'themes'))
				.pipe($.livereload());
		});

		$.watch([
				$$.source +'**/*.js',
				$$.source +'**/*.html',
				$$.source +'**/*.css'
			])
			.pipe($.livereload());
	});

	// 移动文件(图片和字体文件)
	gulp.task('movefiles', () => {
		gulp.src([
				$$.source +'themes/**/*.eot',
				$$.source +'themes/**/*.svg',
				$$.source +'themes/**/*.ttf',
				$$.source +'themes/**/*.woff',
				$$.source +'themes/**/*.jpg',
				$$.source +'themes/**/*.png',
				$$.source +'themes/**/*.gif'
			])
			.pipe(gulp.dest($$.dist +'themes'));
	});

	// 移动css文件
	gulp.task('movecss', ['sass'], () => {
		return gulp.src([
				$$.source +'**/*.css'
			])
			.pipe($.minifyCss())
			.pipe(gulp.dest($$.dist));
	});

	// 移动json文件
	gulp.task('json', () => {
        return gulp.src([
                $$.source +'config/**/*'
            ])
            .pipe(gulp.dest($$.dist +'config/'));
	});

	// JS文件压缩
	gulp.task('minjs', () => {
        gulp.src([
        		$$.source +'common/**/*.js',
        		'./.tmp/common/**/*.js',
        		$$.source +'main/**/*.js',
        		'./.tmp/main/**/*.js'
        	])
            .pipe($.concat('common.js'))
            .pipe($.ngAnnotate())
            .pipe($.uglify())
            .pipe(gulp.dest($$.dist));

        gulp.src([
        		$$.source +'library/frame/*.js',
        		$$.source +'library/extend/*.js'
        	])
            .pipe($.concat('library.js'))
    	    .pipe($.replace(/isDebugCreate=true/g, 'isDebugCreate=false'))
            .pipe($.uglify())
            .pipe(gulp.dest($$.dist));
	});

	gulp.task('common_templates', function () {
		gulp.src($$.source +'common/**/*.html')
			.pipe($.ngHtml2js({
				moduleName: 'ajmd',
				prefix: '../../common/'
			}))
			.pipe(gulp.dest('./.tmp/common'));

		gulp.src($$.codePath +'main/**/*.html')
			.pipe($.ngHtml2js({
				moduleName: 'ajmd',
				prefix: '../../main/'
			}))
			.pipe(gulp.dest('./.tmp/main'));
	});

	// js错误检查
	gulp.task('jshint', function () {
		var files = [
				$$.source +'**/*.js',
				'!'+ $$.source +'library/**/*',
				'!'+ $$.source +'common/directives/delegate_event.js'
			];

		if (argv.files) files = argv.files.split(',');

		return gulp.src(files)
			.pipe($.jshint())
			.pipe($.jshint.reporter('default'));
	});
};
