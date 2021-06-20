"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an event which a BLoC instance can receive and react upon.
 */
var BlocEvent = /** @class */ (function () {
    function BlocEvent(name, data) {
        this._name = name;
        this._data = data;
    }
    Object.defineProperty(BlocEvent.prototype, "name", {
        get: function () { return this._name; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BlocEvent.prototype, "data", {
        get: function () { return this._data; },
        enumerable: false,
        configurable: true
    });
    return BlocEvent;
}());
exports.default = BlocEvent;
