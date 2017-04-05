# Alarm Clock | (c) Pirate

## Usage
### 1. Setup
```bash
npm install
```
- This will install all npm and bower dependencies (Only one time process)
- Node Packages will be downloaded in `node_modules` folder in root directory.
- Bower components will be downloaded in `src/bower_component` folder.


### 2. Watch files/ run application from development folder i.e. /src
```
gulp
```

### 3. Build production version
```
gulp build
```

### 4. Start webserver from build folder
```
gulp serve-build
```

## Features available with Gulp task
* SASS support including sourceMaps
* Minimal CSS styling of the view
* Gulp watch, build and local server tasks
* Minified HTML, CSS and JS build files
* Automatic file Reversioning 
* Browser-sync support
* File concatinatition for PROD
* Service worker generation support


## Project structure 

```
 _build
 node_modules*
 src
 -- app
 ------ components
 ------ app.js
 ------ config.js
 ------ route.js
 ------ run.js
 -- assets
 ------ css
 ------ fonts
 ------ images
 -- bower_components
 -- index.html
 bower.json
 gulpfile.js
 package.json
 README.md
```
