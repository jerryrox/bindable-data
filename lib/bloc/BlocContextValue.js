"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Bindable_1 = __importDefault(require("../Bindable"));
/**
 * A value which must be passed to React Context API so the components can access the BLoC instances.
 */
var BlocContextValue = /** @class */ (function () {
    function BlocContextValue(entries) {
        var _this = this;
        this._entries = new Array();
        this.isInitializing = new Bindable_1.default(true);
        // If default entries are provided, use that.
        if (typeof (entries) === "object") {
            Object.keys(entries)
                .forEach(function (k) {
                var bloc = Reflect.get(entries, k);
                if (bloc !== null && bloc !== undefined) {
                    _this.addEntry({ name: k, bloc: bloc });
                }
            });
        }
        Promise.all(this._entries.map(function (e) { return e.bloc.initialize(); }))
            .then(function () { return _this.isInitializing.setValue(false); });
    }
    /**
     * Returns the Bloc instance of specified type.
     * @param {Constructor<T>} constructor The type of the BLoC instance you want to retrieve.
     */
    BlocContextValue.prototype.getBloc = function (constructor) {
        for (var _i = 0, _a = this._entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.bloc instanceof constructor)
                return entry.bloc;
        }
        throw new Error("No BLoC instance found for specified type: " + constructor.name);
    };
    /**
     * Dispatches the specified event to all BLoC instances.
     */
    BlocContextValue.prototype.dispatch = function (event) {
        this._entries.forEach(function (e) { return e.bloc.processEvent(event); });
    };
    /**
     * Adds the specified entry under this context's management.
     */
    BlocContextValue.prototype.addEntry = function (entry) {
        this._entries.push(entry);
    };
    return BlocContextValue;
}());
exports.default = BlocContextValue;
