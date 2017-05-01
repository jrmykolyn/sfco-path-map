"use strict";
// DECLARE CLASSES
var PathMap = (function () {
    // Instance methods.
    function PathMap(paths) {
        paths = (typeof paths === 'object') ? paths : {};
        for (var path in paths) {
            var val = paths[path];
            if (typeof val === 'string') {
                this[path] = this.parsePath(val);
            }
            else {
                throw new Error("RECEIVED A VALUE OF TYPE " + typeof val + " FOR " + path + ".");
            }
        }
    }
    Object.defineProperty(PathMap, "pattern", {
        // Class methods.
        get: function () {
            return /__(.*?)__/gmi;
        },
        enumerable: true,
        configurable: true
    });
    PathMap.prototype.parsePath = function (path) {
        if (!path.match(PathMap.pattern)) {
            return path;
        }
        else {
            var placeholder = PathMap.pattern.exec(path)[0];
            var key = this.sanitizePlaceholder(placeholder);
            return path.replace(PathMap.pattern, this[key]);
        }
    };
    PathMap.prototype.sanitizePlaceholder = function (placeholder) {
        return PathMap.pattern.exec(placeholder)[1] || '';
    };
    return PathMap;
}());
module.exports = PathMap;
//# sourceMappingURL=path-map.js.map