'use strict';

const fs      = require('fs');
const $util   = require('./tools/util.js');
const $$      = require('./config.js');
const argv    = require('yargs').argv;
const version = new Date().getTime();
const $dist   = $$.dist +'pages/';
const $code   = $$.source +'pages/';

module.exports = function (gulp, $) {
	gulp.task('pages_replacehtml', () => {
		$util.getType(res => {
			const $prj = res.path;
			let files = [
					'../../library.js',
					'seed.js?v='+ version,
					'../../common.js?v='+ version
				];

			fs.exists($code + $prj +'/components', exists => {
				let itemFiles = files;
				let ifile = ['index.js?v='+ version];

				if (exists) ifile = ['common.js?v='+ version].concat(ifile);

				itemFiles = itemFiles.concat(ifile);

				gulp.src($code + $prj +'/index.html')
					.pipe($.htmlReplace({
						'css': [
							'../../themes/seed.css?v='+ version,
							'../../themes/'+ $prj +'.css?v='+ version
						],
						'js': itemFiles
					}))
					.pipe($.htmlmin({collapseWhitespace: true}))
					.pipe(gulp.dest($dist + $prj));
			});
		});
	});

	gulp.task('pages_templates', () => {
		$util.getType(res => {
			const $prj = res.path;

			gulp.src([
					$code + $prj +'/**/*.html',
					'!'+ $code + $prj +'/components/**/*.html',
					'!'+ $code + $prj +'/index.html'
				])
				.pipe($.ngHtml2js({
					moduleName: 'fm',
					prefix: ''
				}))
				.pipe(gulp.dest('./.tmp/pages/'+ $prj));

			gulp.src([
					$code + $prj +'/components/**/*.html'
				])
				.pipe($.ngHtml2js({
					moduleName: 'fm',
					prefix: './components/'
				}))
				.pipe(gulp.dest('./.tmp/pages/'+ $prj +'/components'));
		});
	});

	gulp.task('pages_minjs', () => {
		$util.getType(res => {
			const $prj = res.path;

	        gulp.src([
	        		$$.source +'library/app.js',
	        		$code + $prj +'/app.js'
	        	])
	            .pipe($.concat('seed.js'))
	            // .pipe($.replace(/..\/main\//g, ''))
	            // .pipe($.ngAnnotate())
	            .pipe($.uglify({mangle:false}))
	            .pipe(gulp.dest($dist + $prj));

	        gulp.src([
	                './.tmp/pages/'+ $prj +'/components/**/*.js',
	                $code + $prj +'/components/**/*.js'
	            ])
	            .pipe($.concat('common.js'))
	            .pipe($.ngAnnotate())
	            .pipe($.uglify())
	            .pipe(gulp.dest($dist + $prj));

	        gulp.src([
	                './.tmp/pages/'+ $prj +'/**/*.js',
	                '!./.tmp/pages/'+ $prj +'/components/**/*.js',
	                $code + $prj +'/**/*.js',
	                '!'+ $code + $prj +'/components/**/*.js',
	                '!'+ $code + $prj +'/app.js'
	            ])
	            .pipe($.concat('index.js'))
	            .pipe($.ngAnnotate())
	            .pipe($.uglify())
	            .pipe(gulp.dest($dist + $prj));
		});
	});

	// js注入
	gulp.task('pages_inject', () => {
		$util.getType(res => {
			const $prj = res.path;

			gulp.src($code + $prj +'/index.html')
				.pipe(
					$.inject(
						gulp.src([
							$$.source +'library/frame/*.js',
							$$.source +'library/extend/*.js'
						], {read: false}), {
							relative: true,
							name: 'injectframe'
						}
					)
				)
				.pipe(
					$.inject(
						gulp.src([
							$$.source +'library/app.js',
							$code + $prj +'/app.js'
						], {read: false}), {
							relative: true,
							name: 'injectapp'
						}
					)
				)
				.pipe(
					$.inject(
						gulp.src([
							$$.source +'main/**/*.js',
							$$.source +'common/**/*.js',
							$code + $prj +'/components/**/*.js'
						], {read: false}), {
							relative: true,
							name: 'injectcommon'
						}
					)
				)
				.pipe(
					$.inject(gulp.src([
							$$.source +'themes/seed.css',
							$$.source +'themes/'+ $prj +'.css',
							$code + $prj +'/**/*.js',
							'!'+ $code + $prj +'/app.js',
							'!'+ $code + $prj +'/components/**/*.js'
						], {read: false}), {relative: true})
				)
				.pipe(gulp.dest($code + $prj));
		});
	});
};
