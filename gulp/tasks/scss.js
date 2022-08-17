import dartSass from "sass";
import gulpSass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css";
import webpCss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import groupCss from "gulp-group-css-media-queries";

const SCSS = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(app.plugins.if(app.isDev, sourcemaps.init()))
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: " SCSS ",
          message: "Error: <%= error.message %>",
        })
      )
    )

    .pipe(app.plugins.replace(/@img\//g, "../img/"))

    .pipe(
      SCSS({
        outputStyle: "expanded",
      })
    )

    .pipe(app.plugins.if(app.isDev, sourcemaps.write(".")))

    .pipe(app.plugins.if(app.isBuild, groupCss()))

    .pipe(
      app.plugins.if(
        app.isBuild,
        webpCss({
          webpClass: ".webp",
          noWebpClass: ".no-webp",
        })
      )
    )

    .pipe(
      app.plugins.if(
        app.isBuild,
        autoprefixer({
          grid: true,
          overrideBrowserlist: ["last 3 versions"],
          cascade: true,
        })
      )
    )

    .pipe(app.gulp.dest(app.path.build.css))

    .pipe(app.plugins.if(app.isBuild, cleanCss()))
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
};
