# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.2.1] - 2017-05-01
### Changed
- Fixed bug (introduced in `0.2.0`) where `PathMap` had to be accessed as a property of the `module.exports` object (eg. `require( 'sfco-path-map' ).PathMap`).

## [0.2.0] - 2017-04-30
### Added
- Added Typescript compiler and configuration file to project.
- Added `lib/` dir. in project root (contains compiled module, declaration file, and source map.)
- Added `build` script to `package.json`. Script runs Typescript `tsc` command with no additional arguments/options.

### Changed
- Updated `README` file with installation and usage instructions.
- Converted existing `PathMap` class definition to Typescript, moved to `src/` dir.

## [0.1.1] - 2017-04-28
### Changed
- Added Short Future Co. namespace (`sfco-`) to package name and URLs.

## [0.1.0] - 2017-04-28
### Added
- Completed first pass of `PathMap` class.
- Added `Jasmine` test framework and built out initial tests.
- Added project configuration files (`.gitignore`, `.editorconfig`, `.eslintrc.js`).
- Added `README` and `CHANGELOG` files.
