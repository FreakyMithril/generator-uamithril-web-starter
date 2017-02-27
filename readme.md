# Gulp Project Starter (Nunjucks template engine) 
[![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
### Must have on your computer:
1. [Git](https://git-scm.com/download) (Guaranteed to work on: 2.10.1 Windows)
2. [Node.js](https://nodejs.org/en/download) LTS (Guaranteed to work on: 6.10.0 Windows)
3. Optional - [Yarn](https://yarnpkg.com/en/docs/install) - Can help you to replace NPM

-----------------------------------------------

### Packages:
For global dependencies needed on computer:
```
npm install browser-sync gulp csscomb -g
```
or for Yarn:
```
yarn global add browser-sync gulp csscomb
```
For install local dependencies:
```
npm install
```
or for Yarn:
```
yarn
```

-----------------------------------------------

### All compiling with Gulp!!!
For build(included clean and default task), just type:
```
gulp
```
For local server, or local development(included clean and dev task), just type:
```
gulp serve
```

P.S.
copy_data task for copy some data, that must to be used(example: json, files, pdf...)

-----------------------------------------------

### Structure:
* "src" folder - project sources
* "dev" folder - local dev folder (local server work from it, not stored in git)
* "dist" folder - deploy version (not stored in git)
* "temp" folder - there could be other files (not stored in git)

```
+-- dist
|   +-- data
|   |   --- anyfile.json
|   |   --- icomoon.zip
|   +-- fonts
|   |   --- anyfile.eot
|   |   --- anyfile.svg
|   |   --- anyfile.ttf
|   |   --- anyfile.woff
|   +-- img
|   |   --- anyfile.jpg
|   |   --- anyfile.png
|   |   --- anyfile.svg
|   +-- js
|   |   +-- vendor
|   |   |   --- jquery.js
|   |   |   --- ***.js
|   |   |   --- ***.js
|   |   --- main.js
|   +-- css
|   |   --- main.css
|   --- index.html
+-- dev
|   +-- data
|   |   --- anyfile.json
|   |   --- icomoon.zip
|   +-- fonts
|   |   --- anyfile.eot
|   |   --- anyfile.svg
|   |   --- anyfile.ttf
|   |   --- anyfile.woff
|   +-- img
|   |   --- anyfile.jpg
|   |   --- anyfile.png
|   |   --- anyfile.svg
|   +-- js
|   |   +-- vendor
|   |   |   --- jquery***.js
|   |   --- main.js
|   +-- css
|   |   --- main.css
|   --- index.html
+-- src
|   +-- data
|   |   --- anyfile.json
|   |   --- icomoon.zip
|   +-- fonts
|   |   --- anyfile.eot
|   |   --- anyfile.svg
|   |   --- anyfile.ttf
|   |   --- anyfile.woff
|   +-- img
|   |   --- anyfile.jpg
|   |   --- anyfile.png
|   |   --- anyfile.svg
|   +-- templates
|   |   +-- parts
|   |   |   --- some-part.html
|   |   --- default.html
|   +-- js
|   |   +-- vendor
|   |   |   --- jquery.js
|   |   |   --- ***.js
|   |   |   --- ***.js
|   |   --- main.js
|   +-- scss
|   |   --- _general.scss
|   |   --- main.scss
|   --- index.html
+-- temp
|   --- anyfile.psd
|   --- anyfile.zip
--- .babelrc
--- .csscomb.json
--- .gitignore
--- gulpfile.babel.js
--- LICENSE
--- package.json
--- readme.md
--- yarn.lock
```

-----------------------------------------------

### Code Style:
1. Styles:
You can use csscomb file for styles(more: http://csscomb.com)
In "scss" folder we have main.scss, all files must be included to it with started name, - _sample.scss.
2. Javascript:
All files in "js" folder except 'vendor' will be concatenated to main.js(src/js/main.js will be in the end of file), all files from 'vendor' will be the same in 'dist/js/vendor', if in 'vendor' folder you have file named - jquery.js, it will include first
3. Images:
Will auto optimized
4. Includes:
In "templates" folder we have html parts and templates that need to be include or use. Template Engine - Nunjucks (https://mozilla.github.io/nunjucks/). If you plan to use variables - use without '-' and one word, example - 'titleLabel'
5. Data folder:
We can use to store some files Data, like Json, and others
6. Dev(serve) Task:
Starts local server, show sourcemaps for scss and js files, not optimizing images.

## License

MIT © uaMithril

[travis-image]: https://travis-ci.org/uamithril/generator-uamithril-web-starter.svg?branch=nunjucks-template-engine
[travis-url]: https://travis-ci.org/uamithril/generator-uamithril-web-starter
[daviddm-image]: https://david-dm.org/uamithril/generator-uamithril-web-starter/nunjucks-template-engine.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/uamithril/generator-uamithril-web-starter/nunjucks-template-engine