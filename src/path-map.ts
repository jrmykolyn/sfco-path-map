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

			if ( typeof val === 'string' ) {
				this[ path ] = this.parsePath( val );
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
