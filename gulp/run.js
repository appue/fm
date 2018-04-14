const fs   = require('fs');
const argv = require('yargs').argv;
const os   = require('os');
const run  = argv.run || ''; // dev|build

module.exports = function (gulp, $) {
	// gulp.task('tmpl', ['minjs', 'pages_minjs', 'activity_minjs', 'plugins_minjs'], function () {});

	gulp.task('dev', ['sass', 'connect', 'watch']);

	// gulp.task('build', ['movefiles', 'replacehtml', 'templates', 'movecss', 'json'], function () {
	// 	gulp.start('tmpl');
	// });
	gulp.task('build', ['movefiles', 'replacehtml', 'movecss', 'json'], () => {
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

	gulp.task('inject', ['inject']);

	gulp.task('tmp', ['common_templates', 'pages_templates', 'activity_templates', 'plugins_templates']);
};
