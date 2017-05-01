declare class PathMap {
    static readonly pattern: RegExp;
    constructor(paths: any);
    parsePath(path: any): any;
    sanitizePlaceholder(placeholder: any): string;
}
export = PathMap;
