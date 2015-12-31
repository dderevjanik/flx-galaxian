const gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConf = require('./webpack.config.js'),
    webpackDevConf = require('./webpack.dev.config.js');

gulp.task('webpack', () => {
    new WebpackDevServer(webpack(webpackDevConf), {
    }).listen(8080, 'localhost', function(err) {
        if(err) {
            throw new gutil.PluginError("webpack-dev-server", err);
        }
        console.log('webpack dev server initialized, listening on server 8080');
    });
});

gulp.task('eslint', () => {
    return gulp.src(['src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('default', () => {
    return gulp.src(['src/**/*.js'])
        .pipe(webpack(webpackConf))
        .pipe(gulp.dist('dist/')) 
});
