"use strict";
// DECLARE CLASSES
var PathMap = (function () {
    // Instance methods.
    function PathMap(paths) {
        var _this = this;
        paths = (typeof paths === 'object') ? paths : {};
        for (var path in paths) {
            var val = paths[path];
            if (typeof val === 'string' || Array.isArray(val)) {
                var isArr = Array.isArray(val);
                // Re-assign `val` to ensure that it's an array.
                val = (val && typeof val === 'string') ? [val] : val;
                // Parse each string within the `val` array.
                val = val.map(function (v) { return _this.parsePath(v); });
                // Update `PathMap` instance with either array or string (depending on type of original input).
                this[path] = (isArr) ? val : val[0];
            }
            else {
                throw new Error("RECEIVED A VALUE OF TYPE " + typeof val + " FOR " + path + ".");
            }
        }
    }
    Object.defineProperty(PathMap, "pattern", {
        // Class methods.
        get: function () {
            return /[_{]{2}(.*?)[}_]{2}/gmi;
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