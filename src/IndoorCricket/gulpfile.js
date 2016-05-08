/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var paths = {
    webroot: "./wwwroot/",
    bower: "./bower_components",
    lib: "./wwwroot/lib/",
    app: "./wwwroot/app/",
    srcapp: "./app/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";
//paths.app = paths.webroot + "/app/";
//paths.srcapp = "./app/";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("copyapp", function () {
    var app = {
        "collections": "collections/**.js",
        "views": "views/**.js",
        "models": "models/**.js",
        "/": "**.js"
    }

    for (var destinationDir in app) {
        gulp.src(paths.srcapp + app[destinationDir])
          .pipe(gulp.dest(paths.app + destinationDir));
    }

    gulp.src("/Templates/**.html")
        .pipe(gulp.dest(paths.webroot + "/templates/**.html"));


});

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);
