const gulp 		= require('gulp')
const eslint 	= require('gulp-eslint')
const nodemon 	= require('gulp-nodemon')

gulp.task('set-dev-env', () => process.env.NODE_ENV = 'development')
gulp.task('set-log-env', () => process.env.ENABLE_LOGGING = true )

gulp.task('lint', () => {
	gulp.src(['**/*.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
})

gulp.task('server-test', ['lint', 'set-dev-env', 'set-log-env'], () => {
	nodemon({
		script: 'server.js',
		nodeArgs: ['--trace-sync-io', '--inspect'],
		ignore: 'frontend/*'
	})
})

gulp.task('server', () => {
	nodemon({
		script: 'server.js',
		ignore: 'frontend/*'
	})
})

gulp.task('default', ['server'])
gulp.task('test', ['server-test'])