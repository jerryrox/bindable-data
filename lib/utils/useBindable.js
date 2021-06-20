"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBindableUnsafe = void 0;
var react_1 = require("react");
/**
 * A custom React hook which allows a functional component to refresh when the value of the bindable has changed.
 */
function useBindable(bindable, onChange) {
    var _a = react_1.useState(bindable.getValue()), value = _a[0], setValue = _a[1];
    react_1.useEffect(function () {
        var invokeOnChange = function (v) {
            if (onChange !== undefined) {
                onChange(v);
            }
        };
        var id = bindable.subscribe(function (newVal) {
            setValue(newVal);
            invokeOnChange(newVal);
        });
        // Set value once again in case the bindable itself has changed.
        setValue(bindable.value);
        invokeOnChange(bindable.value);
        return function () {
            bindable.unsubscribe(id);
        };
    }, [bindable, onChange]);
    return value;
}
exports.default = useBindable;
/**
 * Variation of useBindable which allows for a null or undefined Bindable instance as input.
 * If the bindable is null or undefined, the value will be undefined.
 */
function useBindableUnsafe(bindable, onChange) {
    var _a = react_1.useState(bindable === null || bindable === void 0 ? void 0 : bindable.getValue()), value = _a[0], setValue = _a[1];
    react_1.useEffect(function () {
        var invokeOnChange = function (v) {
            if (onChange !== undefined) {
                onChange(v);
            }
        };
        if (bindable === null || bindable === undefined) {
            setValue(undefined);
            invokeOnChange(undefined);
            return function () { };
        }
        var id = bindable.subscribe(function (newVal) {
            setValue(newVal);
            invokeOnChange(newVal);
        });
        setValue(bindable.value);
        invokeOnChange(bindable.value);
        return function () {
            bindable.unsubscribe(id);
        };
    }, [bindable, onChange]);
    return value;
}
exports.useBindableUnsafe = useBindableUnsafe;
