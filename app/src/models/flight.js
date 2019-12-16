"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var base_1 = require("./base");
var FlightModel = /** @class */ (function (_super) {
    __extends(FlightModel, _super);
    function FlightModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FlightModel.prototype, "DepartureTime", {
        get: function () {
            return this._departureTime;
        },
        set: function (value) {
            this._departureTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlightModel.prototype, "ArriveTime", {
        get: function () {
            return this._arriveTime;
        },
        set: function (value) {
            this._arriveTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlightModel.prototype, "From", {
        get: function () {
            return this._from;
        },
        set: function (value) {
            this._from = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlightModel.prototype, "To", {
        get: function () {
            return this._to;
        },
        set: function (value) {
            this._to = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlightModel.prototype, "TotalPrice", {
        get: function () {
            return this._totalPrice;
        },
        set: function (value) {
            this._totalPrice = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlightModel.prototype, "NumberOfBags", {
        get: function () {
            return this._numberOfBags;
        },
        set: function (value) {
            this._numberOfBags = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlightModel.prototype, "BaggagePrice", {
        get: function () {
            return this._baggagePrice;
        },
        set: function (value) {
            this._baggagePrice = value;
        },
        enumerable: true,
        configurable: true
    });
    return FlightModel;
}(base_1.Base));
exports.FlightModel = FlightModel;
