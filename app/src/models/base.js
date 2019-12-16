"use strict";
exports.__esModule = true;
var Base = /** @class */ (function () {
    function Base(url) {
        this._url = url;
    }
    Object.defineProperty(Base.prototype, "baseUrl", {
        get: function () {
            return this._url;
        },
        set: function (value) {
            this._url = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "getUrl", {
        get: function () {
            return this._url + "/" + this.getUrl;
        },
        set: function (value) {
            this._getUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "getOneUrl", {
        get: function () {
            return this._url + "/" + this._getOneUrl;
        },
        set: function (value) {
            this._getOneUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "createUrl", {
        get: function () {
            return this._createUrl;
        },
        set: function (value) {
            this._createUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "updateUrl", {
        get: function () {
            return this._updateUrl;
        },
        set: function (value) {
            this._updateUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "deleteUrl", {
        get: function () {
            return this._deleteUrl;
        },
        set: function (value) {
            this._deleteUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    return Base;
}());
exports.Base = Base;
