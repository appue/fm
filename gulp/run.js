const fs   = require('fs');
const argv = require('yargs').argv;
const os   = require('os');
const run  = argv.run || ''; // dev|build

module.exports = function (gulp, $) {
	gulp.task('tmpl', ['minjs', 'pages_minjs'], () => {});

	gulp.task('dev', ['sass', 'connect', 'watch']);

	gulp.task('build', ['movefiles', 'pages_replacehtml', 'movecss'], () => {
		gulp.start('tmpl');
	});

	// gulp.task('run', ['clean'], function () {
	gulp.task('run', () => {
		switch(run) {
			case 'build':
				gulp.start('build');
			break;

			default:
				gulp.start('dev');
		}
	});

	gulp.task('inject', ['pages_inject']);

	gulp.task('tmp', ['common_templates', 'pages_templates']);
};
