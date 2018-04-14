'use strict';

const fs      = require('fs');
const $util   = require('./tools/util.js');
const $config = require('./config.js');
const argv    = require('yargs').argv;
const version = new Date().getTime();
const $dist   = $config.dist +'pages/';
const $code   = $config.source +'pages/';

module.exports = function (gulp, $) {

	gulp.task('replacehtml', () => {
		$util.getType($name, (res) => {
			let dir = res.path;
			let files = [
					'../../library.js',
					'seed.js?v='+ version,
					'../../common.js?v='+ version
					// '../'+ $name +'.js?v='+ version,
					// 'common.js?v='+ version,

					// 'index.js?v='+ version
				];

			fs.exists($config.source +'pages/'+ dir +'/common', exists => {
				let itemFiles = files;
				let ifile;

				if (exists) {
					ifile = ['common.js?v='+ version,'index.js?v='+ version];
				} else {
					ifile = ['index.js?v='+ version];
				}

				itemFiles = itemFiles.concat(ifile);

				gulp.src($code + dir +'/index.html')
					.pipe($.htmlReplace({
						'css': [
							'../../themes/seed.css?v='+ version,
							'../../themes/'+ $name +'.'+ dir +'.css?v='+ version
						],
						'js': itemFiles
					}))
					.pipe($.replace(/\<base href="[^"]*?" \>/g, '<base href="/touch/'+ $name +'/'+ dir +'/" >'))
					.pipe($.htmlmin({collapseWhitespace: true}))
					.pipe(gulp.dest($dist + dir));
			});
		});
	});

	gulp.task('templates', () => {
		$util.getType($name, (res) => {
			let dir = res.path;

			gulp.src([
					$code + dir +'/**/*.html',
					'!'+ $code + dir +'/common/**/*.html',
					'!'+ $code + dir +'/index.html'
				])
				.pipe($.ngHtml2js({
					moduleName: 'ajmd',
					prefix: ''
				}))
				.pipe(gulp.dest('./.tmp/'+ $name +'/'+ dir));

			gulp.src([
					$code + dir +'/common/**/*.html'
				])
				.pipe($.ngHtml2js({
					moduleName: 'ajmd',
					prefix: './common/'
				}))
				.pipe(gulp.dest('./.tmp/'+ $name +'/'+ dir +'/common'));
		});
	});

	gulp.task('minjs', () => {
		gulp.src([
	            './.tmp/'+ $name +'/common/**/*.js',
	            $code +'common/**/*.js'
			])
			.pipe($.concat($name +'.js'))
            .pipe($.ngAnnotate())
            .pipe($.uglify())
            .pipe(gulp.dest($dist));

		$util.getType($name, (res) => {
			let dir = res.path;

	        gulp.src([
	        		$config.source +'library/app.js',
	        		$code + dir +'/app.js'
	        	])
	            .pipe($.concat('seed.js'))
	            // .pipe($.replace(/..\/main\//g, ''))
	            // .pipe($.ngAnnotate())
	            .pipe($.uglify({mangle:false}))
	            .pipe(gulp.dest($dist + dir));

	        gulp.src([
	                './.tmp/'+ $name +'/'+ dir +'/common/**/*.js',
	                $code + dir +'/common/**/*.js'
	            ])
	            .pipe($.concat('common.js'))
	            .pipe($.ngAnnotate())
	            .pipe($.uglify())
	            .pipe(gulp.dest($dist + dir));

	        gulp.src([
	                './.tmp/'+ $name +'/'+ dir +'/**/*.js',
	                '!./.tmp/'+ $name +'/'+ dir +'/common/**/*.js',
	                $code + dir +'/**/*.js',
	                '!'+ $code + dir +'/common/**/*.js',
	                '!'+ $code + dir +'/app.js'
	            ])
	            .pipe($.concat('index.js'))
	            .pipe($.ngAnnotate())
	            .pipe($.uglify())
	            .pipe(gulp.dest($dist + dir));
		});
	});

	// js注入
	gulp.task('inject', () => {
		$util.getType($name, (res) => {
			gulp.src($code + res.path +'/index.html')
				.pipe(
					$.inject(
						gulp.src([
							$config.codePath +'library/frame/*.js',
							$config.codePath +'library/extend/*.js'
						], {read: false}), {
							relative: true,
							name: 'injectframe'
						}
					)
				)
				.pipe(
					$.inject(
						gulp.src([
							$config.codePath +'library/app.js',
							$code + res.path +'/app.js'
						], {read: false}), {
							relative: true,
							name: 'injectapp'
						}
					)
				)
				.pipe(
					$.inject(
						gulp.src([
							$config.codePath +'main/**/*.js',
							$config.codePath +'common/**/*.js',
							$code + res.path +'/common/**/*.js'
						], {read: false}), {
							relative: true,
							name: 'injectcommon'
						}
					)
				)
				.pipe(
					$.inject(gulp.src([
							$config.codePath +'themes/seed.css',
							$config.codePath +'themes/'+ $name +'.'+ res.path +'.css',
							$code + res.path +'/**/*.js',
							'!'+ $code + res.path +'/app.js',
							'!'+ $code + res.path +'/common/**/*.js'
						], {read: false}), {relative: true})
				)
				.pipe(gulp.dest($code + res.path));
		});
	});
};
