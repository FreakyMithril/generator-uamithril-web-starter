# Gulp Project Starter
### Must have on your computer:
1. [Git](https://git-scm.com/download) (Guaranteed to work on: 2.6.2Win):
2. [Node.js](https://nodejs.org/en/download) (Guaranteed to work on: 4.2.1Win):
3. [Ruby](http://rubyinstaller.org/downloads) (Guaranteed to work on: 2.2.3Win):

-----------------------------------------------

### Packages:
Sass(Guaranteed to work on: 3.4.19):
```
gem update --system
```
```
gem install sass
```
For global dependencies needed on computer:
```
npm install -g browser-sync
```
```
npm install -g gulp
```
```
npm install -g csscomb
```
For install local dependencies:
```
npm install
```

-----------------------------------------------

If you change some dependencies, or update it, - update package.json
If have issues after update, Use:
```
npm cache clean
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
* "src" folder - sources.
* "dev" folder - local dev folder(server from it)
* "dist" folder - deploy version. (not stored in git)
* "temp" folder - there could be other files. (not stored in git)

-----------------------------------------------

### Code Style:
1) Styles:
You can use csscomb file for styles(more: http://csscomb.com)
In "scss" folder we have main.scss, all files must be included to it with started name, - _sample.scss.
2) Javascript:
All files in "js" folder except 'vendor' will be concatenated to scripts.js(main.js will be in the end of file), all files from 'vendor' will be the same in 'dist/js/vendor'
3) Images:
Will auto optimized
4) Includes:
In "inc" folder we have html parts that need to be include
5) Data folder:
We can use to store some files Data
6) Dev(serve) Task:
Starts local server, show sourcemaps for scss and js files, not optimizing images.