// DECLARE CLASSES
class PathMap {
	// Class methods.
	static get pattern() {
		return /[_{]{2}(.*?)[}_]{2}/gmi;
	}

	// Instance methods.
	constructor( paths ) {
		paths = ( typeof paths === 'object' ) ? paths : {};

		for ( let path in paths ) {
			let val = paths[ path ];

			if ( typeof val === 'string' || Array.isArray( val ) ) {
				let isArr = Array.isArray( val );

				// Re-assign `val` to ensure that it's an array.
				val = ( isArr ) ? val : [ val ];

				// Parse each string within the `val` array.
				val = val.map( ( v ) => { return this.parsePath( v ) } );

				// Update `PathMap` instance with either array or string (depending on type of original input).
				this[ path ] = ( isArr ) ? val : val[ 0 ];
			} else {
				throw new Error( `RECEIVED A VALUE OF TYPE ${ typeof val } FOR ${ path }.` );
			}
		}
	}

	parsePath( path ) {
		if ( !path.match( PathMap.pattern ) ) {
			return path;
		} else {
			let placeholder = PathMap.pattern.exec( path )[ 0 ];
			let key = this.sanitizePlaceholder( placeholder );

			return path.replace( PathMap.pattern, this[ key ] );
		}
	}

	sanitizePlaceholder( placeholder ) {
		return PathMap.pattern.exec( placeholder )[ 1 ] || '';
	}
}

// PUBLIC API
export = PathMap;
