const gulp 		= require('gulp')
const less 		= require('gulp-less')
const concat 	= require('gulp-concat')
const minify 	= require('gulp-clean-css')
const uglify 	= require('gulp-uglify')
const gutil 	= require('gulp-util')
const inject 	= require('gulp-inject')
const sort 		= require('sort-stream')
const babel 	= require('gulp-babel')
const gulpif 	= require('gulp-if')
const eslint 	= require('gulp-eslint')
const nodemon 	= require('gulp-nodemon')
const LessPluginAutoPrefix = require('less-plugin-autoprefix')
const autoprefix = new LessPluginAutoPrefix({browsers: ['> 1%']})

const target = gulp.src('./frontend/index.html')
const min = process.env.NODE_ENV == 'production'

const sortFunction = (a, b) => {
	a = a.path.toLowerCase()
	b = b.path.toLowerCase()
	if (a == b) return 0
	if (a > b) return 1
	return -1
}

const cssPath = [ './frontend/styles/**/*.less' ]
const jsPath = [
	'./frontend/*.js',
	'./frontend/components/**/*.js',
	'./frontend/views/**/*.js'
]

gulp.task('css', () =>  {
	const cssSrc = gulp.src(cssPath)
		.pipe(sort(sortFunction))
		.pipe(less({plugins: [autoprefix]}))
		.pipe(gulpif(min, concat('styles.min.css')))
		.pipe(gulpif(min, minify()))
		.pipe(gulp.dest('./frontend/build/css'))

	return target
		.pipe(inject(cssSrc, {ignorePath: 'frontend', addRootSlash: false }))
		.pipe(gulp.dest('./frontend'))  
		
})

gulp.task('js', () =>  {
	const jsSrc = gulp.src(jsPath)
		.pipe(sort(sortFunction))
		.pipe(babel({presets: ['env']}))
		.pipe(gulpif(min, concat('app.min.js')))
		.pipe(gulpif(min, uglify()))
		.on('error', (err) => {
			gutil.log(gutil.colors.red('[Error]'), err.toString())
		})
		.pipe(gulp.dest('./frontend/build/js'))

	return target
		.pipe(inject(jsSrc, {ignorePath: 'frontend', addRootSlash: false }))
		.pipe(gulp.dest('./frontend'))

})

gulp.task('watch', () => {
	gulp.watch(jsPath, ['js'])
	gulp.watch(cssPath, ['css'])
})

gulp.task('set-dev-env', () => process.env.NODE_ENV = 'development')
gulp.task('set-log-env', () => process.env.ENABLE_LOGGING = true )

gulp.task('lint', () => {
	gulp.src(['**/*.js', '!node_modules/**', '!frontend/build/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
})

gulp.task('server-test', ['lint', 'js', 'css', 'set-dev-env', 'set-log-env'], () => {
	nodemon({
		script: 'server.js',
		nodeArgs: ['--trace-sync-io', '--inspect'],
		ignore: 'frontend/*'
	})
})

gulp.task('server', ['js', 'css'], () => {
	nodemon({
		script: 'server.js',
		ignore: 'frontend/*'
	})
})

gulp.task('default', ['server','watch'])
gulp.task('test', ['server-test','watch'])