var gulp = require('gulp');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var babelify = require('babelify');
var vueify = require('vueify');
// var es2015 = require('babel-preset-es2015');
// var rimraf = require('rimraf');
// var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
// var Vue = require('vue');
var envify = require('envify/custom');
var webserver = require('gulp-webserver');
var less = require('gulp-less');
var autoprefix = require('gulp-autoprefixer');
// var path = require('path');
var exec = require('child_process').exec;
gulp.task('generateNuxt', [], function(callback) {
  exec('npm run generate', function(err, stdout, stderr){
    if(stdout) console.log(stdout);
    if(stderr) console.log(stderr);
    callback(0);
  });
});
gulp.task('watch', ['generateNuxt'], function() {
  gulp.watch('./src/nuxt/**/*.vue', ['generateNuxt']);
});
gulp.task('lessWatch', ['less'], function() {
  gulp.watch('./src/less/*', ['less']);
});
gulp.task('webserver', function() {
  gulp.src('./dist')
    .pipe(webserver({
      port: 8000,
      fallback: 'index.html'
    }));
});
gulp.task('develop', ['watch', 'webserver']);
