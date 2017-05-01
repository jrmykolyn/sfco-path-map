/* global
	console
	describe
	it
	expect
*/

const PathMap = require( '../lib/path-map' );

describe( 'Test `PathMap`:', () => {
	it( 'Should accept a configuration object with a single, "fully defined" path.', () => {
		const PATHS = new PathMap( {
			path1: './path-1'
		} );

		expect( PATHS.path1 ).toBe( './path-1' );
	} );

	it( 'Should accept a configuration object with multiple "fully defined" paths.', () => {
		const PATHS = new PathMap( {
			path1: './path-1',
			path2: './path-2'
		} );

		expect( PATHS.path2 ).toBe( './path-2' );
	} );

	it( 'Should allow `PathMap` instance properties to be accessed using `[]` notation.', () => {
		const PATHS = new PathMap( {
			path1: './path-1'
		} );

		expect( PATHS[ 'path1' ] ).toBe( './path-1' );
	} );

	it( 'Should accept a configuration object which contains a mix of "fully defined" and "partially defined" paths.', () => {
		const PATHS = new PathMap( {
			path1: './path-1',
			path2: './path-2',
			path3: '__path1__/path-3'
		} );

		expect( PATHS.path3 ).toBe( './path-1/path-3' );
	} );

	it( 'Should support the use of `{{...}}` characters to indicate "placeholder" portions of a given path.', () => {
		const PATHS = new PathMap( {
			path1: './path-1',
			path2: './path-2',
			path3: '{{path1}}/path-3'
		} );

		expect( PATHS.path3 ).toBe( './path-1/path-3' );
	} );

	it( 'Should throw an error if the value for a given path is not of type "string"', () => {
		try {
			const PATHS = new PathMap( {
				path1: './path-1',
				path2: './path-2',
				path3: '__path1__/path-3',
				path4: true
			} );

			PATHS.path5 = 'Hello, world!'; /// NOTE - Additional assignment included to prevent ESLint "assigned but not used" flag.
		} catch ( err ) {
			expect( err instanceof Error ).toBe( true );
		}
	} );

	it( 'It should *not* throw an error if the value for a given path is of type Array<string>.', () => {
		const PATHS = new PathMap( {
			path1: './path-1',
			path2: [
				'array-path-1',
				'array-path-2'
			]
		} );

		expect( Array.isArray( PATHS.path2 ) ).toBe( true );
	} );

	it( 'It should correctly replace placeholder values within an array of strings.', () => {
		const PATHS = new PathMap( {
			projectRoot: 'path/to/project',
			scriptsSrc: [
				'{{projectRoot}}/js/src/*.js',
				'!{{projectRoot}}/js/src/ignore-me.js'
			],
			scriptsDest: '{{projectRoot}}/js/src/',
		} );

		expect( PATHS.scriptsSrc[ 0 ] ).toBe( 'path/to/project/js/src/*.js' );
	} );
} );
