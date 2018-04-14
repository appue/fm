const gulp = require('gulp');
const $    = require('gulp-load-plugins')();

require('./gulp/core.js')(gulp, $);
require('./gulp/pages.js')(gulp, $);
require('./gulp/run.js')(gulp, $);

gulp.task('default', () => {
	return gulp.start('run');
});
