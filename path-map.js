// DECLARE CLASSES
class PathMap {
	// Class methods.
	static get pattern() {
		return /__(.*?)__/gmi;
	}

	// Instance methods.
	constructor( paths ) {
		paths = ( typeof paths === 'object' ) ? paths : {};

		for ( let path in paths ) {
			this[ path ] = this.parsePath( paths[ path ] );
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
module.exports = PathMap;