"use strict";
exports.__esModule = true;
// @ts-ignore
var YAML = require("yaml");
var fs = require("fs");
var _1 = require("./");
exports.ACTUAL_NAME = 'ACTUAL_NAME', exports.VALUE = 'VALUE';
exports.getSetters = function (obj) {
    var clazz = Object.getPrototypeOf(new obj());
    return Object.keys(clazz).filter(function (name) {
        // @ts-ignore
        return typeof Object.getOwnPropertyDescriptor(clazz, name)["set"] === "function";
    });
};
exports.getDataMap = function (obj) {
    var ret = new Map();
    Object.keys(obj).forEach(function (k) {
        // @ts-ignore
        ret.set(k.toLowerCase(), (_a = {}, _a[exports.ACTUAL_NAME] = k, _a[exports.VALUE] = obj[k], _a));
        var _a;
    });
    return ret;
};
exports.constructModelsURLsFromYaml = function (path, targets) {
    var _file = fs.readFileSync(path, { 'encoding': 'utf8' });
    var _modelData = YAML.parse(_file);
    console.log(_modelData);
    var soFar = {};
    Object.keys(_modelData).forEach(function (k) {
        var m = _modelData[k];
        // @ts-ignore
        soFar[k] = exports.getDataMap(m);
    });
    var endpoints = {};
    targets.forEach(function (target) {
        var targetSetters = exports.getSetters(target);
        var targetUrls = {};
        var name = target.name;
        if (name != _1.Base.name) {
            targetSetters = exports.getSetters(_1.Base).concat(targetSetters);
        }
        targetSetters.forEach(function (x) {
            // @ts-ignore
            if (soFar[name].has(x.toLowerCase())) {
                // @ts-ignore
                targetUrls[x] = soFar[name].get(x.toLowerCase())[exports.VALUE];
            }
        });
        // @ts-ignore
        endpoints[name] = targetUrls;
    });
    return endpoints;
};
var getClassName = function (obj) {
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec(obj.constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
};
exports.getModeUrls = function (childClass) {
    // get subclasses
    var classNames = [];
    var obj = Object.getPrototypeOf(new childClass());
    var className;
    while ((className = getClassName(obj)) !== "Object") {
        classNames.push(className);
        obj = Object.getPrototypeOf(obj);
    }
    return classNames;
};
console.log(exports.constructModelsURLsFromYaml('/home/sal/Projects/flight/flight-app/src/api/models.yml', [_1.Base, _1.FlightModel]));
