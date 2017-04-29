# PathMap
PathMap reduces redundancy when declaring path and configuration objects.

## Installation
Navigate to your project and run the following command:

`npm install --save-dev sfco-path-map`

## Usage
`sfco-path-map` exposes the `PathMap` constructor, which can be imported into your project as follows:

`const PathMap = require( 'sfco-path-map' );`

The `PathMap` constructor accepts a single object argument: `paths`. The `paths` object may have any number of keys, so long as the value of each key is of type `String`.

`const PATHS = new PathMap( {
	src: './src',
	dist: './dist'
} );`

Each key on the `paths` object is transferred to the new `PathMap` instance, and can be accessed using either `.` or `[]` notation. Each valid value within the `paths` object which *DOES NOT* include a placeholder will be transferred to the `PathMap` instance verbatim/without transformation.

`console.log( PATHS.src ); // './src'`
`console.log( PATHS[ 'dist' ] ); // './dist'`

Any substrings within the `places` object that are surrounded by `__` characters are considered to be "placeholders". During instantiation, `PathMap` checks the placeholder value(s) against its own keys, and replaces them with the corresponding values if possible.

`const PATHS = new PathMap( {
	src: './src',
	dist: './dist',
	styles: '__src__/styles'
} );`

`console.log( PATHS.styles ); // './src/styles'`
