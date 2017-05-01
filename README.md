# PathMap
PathMap reduces redundancy when declaring path and configuration objects.

## Installation
Navigate to your project and run the following command:

`npm install --save-dev sfco-path-map`

## Usage
`sfco-path-map` exposes the `PathMap` constructor, which can be imported into your project as follows:

`const PathMap = require( 'sfco-path-map' );`

The `PathMap` constructor accepts a single object argument: `paths`. The `paths` object may have any number of keys, so long as the value of each key is either a string or an array of strings.

```
const PATHS = new PathMap( {
	src: './src',
	dist: './dist',
	exclude: [ './spec', './demo' ]
} );
```

Each key on the `paths` object is transferred to the new `PathMap` instance, and can be accessed using either `.` or `[]` notation. Each valid value within the `paths` object which *does not* include a placeholder will be transferred to the `PathMap` instance verbatim/without transformation.

```
console.log( PATHS.src ); // './src'
console.log( PATHS[ 'dist' ] ); // './dist'
console.log( PATHS.exclude ); // [ './spec', './demo' ]
```

Any substrings within the `paths` object that are surrounded by either `__...__` or `{{...}}` characters are considered to be "placeholders". During instantiation, `PathMap` checks the placeholder value(s) against its own keys, and replaces them with the corresponding values if possible.

```
const PATHS = new PathMap( {
	src: './src',
	dist: './dist',
	styles: '__src__/styles',
	scripts: '{{src}}/scripts',
	vendor: [ '__styles__/vendor', '{{scripts}}/vendor' ]
} );

console.log( PATHS.styles ); // './src/styles'
console.log( PATHS.scripts ); // './src/scripts'
console.log( PATHS.vendor ); // [ './src/styles/vendor', './src/scripts/vendor' ]
```
