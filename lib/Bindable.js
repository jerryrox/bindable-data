"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListenerInfo = /** @class */ (function () {
    function ListenerInfo() {
        this.id = 0;
        this.callback = function () { };
    }
    return ListenerInfo;
}());
/**
 * A data container which a consumer object can listen to state changes.
 */
var Bindable = /** @class */ (function () {
    function Bindable(value, triggerWhenDifferent) {
        if (triggerWhenDifferent === void 0) { triggerWhenDifferent = true; }
        this._triggerWhenDifferent = true;
        this._proxySource = null;
        this._proxySubscription = 0;
        this._idIncrement = 0;
        this._value = value;
        this._listeners = [];
        this._triggerWhenDifferent = triggerWhenDifferent;
    }
    Object.defineProperty(Bindable.prototype, "proxySource", {
        /**
         * Returns the source bindable this instance is continuously listening to.
         */
        get: function () { return this._proxySource; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bindable.prototype, "triggerWhenDifferent", {
        /**
         * Returns whether the bindable will trigger on assigning value only when the equality operator returns false.
         */
        get: function () { return this._triggerWhenDifferent; },
        /**
         * Sets whether bindable will trigger on setting the value only when the equality operator returns false.
         */
        set: function (value) { this._triggerWhenDifferent = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bindable.prototype, "value", {
        /**
         * Returns the value in the Bindable.
         * Equivalent to getValue().
         */
        get: function () { return this._value; },
        /**
         * Sets the value in the Bindable.
         * Equivalent to setValue() with trigger = true.
         */
        set: function (val) { this.setValue(val); },
        enumerable: false,
        configurable: true
    });
    /**
     * Starts proxying the value from the specified bindable.
     * @param {Bindable<T>} source The source bindable to continuously receive values from.
     */
    Bindable.prototype.startProxy = function (source) {
        var _this = this;
        this.stopProxy();
        this._proxySource = source;
        this._proxySubscription = source.subscribeAndTrigger(function (value) { return _this.setValue(value); });
    };
    /**
     * Stops proxying the bindable's value from current proxy source.
     */
    Bindable.prototype.stopProxy = function () {
        if (this._proxySource !== null) {
            this._proxySource.unsubscribe(this._proxySubscription);
            this._proxySource = null;
            this._proxySubscription = 0;
        }
    };
    /**
     * Returns the value of the bindable.
     */
    Bindable.prototype.getValue = function () { return this._value; };
    /**
     * Sets the value of the bindable and triggers a change event to listeners.
     * @param {T} value The value to set to the Bindable.
     * @param {boolean} trigger Whether this call should trigger change event.
     */
    Bindable.prototype.setValue = function (value, trigger) {
        if (trigger === void 0) { trigger = true; }
        if (this._triggerWhenDifferent && this._value === value) {
            return;
        }
        this._value = value;
        if (trigger === true) {
            this.trigger();
        }
    };
    /**
     * Registers the specified callback function to listen to value change events.
     * @param {Action<T>} callback The function to be invoked on value change.
     */
    Bindable.prototype.subscribe = function (callback) {
        var info = new ListenerInfo();
        info.id = this._idIncrement++;
        info.callback = callback;
        this._listeners.push(info);
        return info.id;
    };
    /**
     * Subscribes the specified callback function and immediately calls it with the Bindable's value.
     * @param {Action<T>} callback The function to be invoked on value change and immediately after this method call.
     */
    Bindable.prototype.subscribeAndTrigger = function (callback) {
        var id = this.subscribe(callback);
        callback(this._value);
        return id;
    };
    /**
     * Removes the listener of specified id.
     * @param {number} callbackId The subscriber ID returned from calling subscribe method.
     */
    Bindable.prototype.unsubscribe = function (callbackId) {
        for (var i = 0; i < this._listeners.length; i++) {
            var listener = this._listeners[i];
            if (listener !== null && listener.id === callbackId) {
                this._listeners[i] = null;
                return;
            }
        }
    };
    /**
     * Adds the specified callback to listen to value changes.
     */
    Bindable.prototype.bind = function (callback, trigger) {
        if (trigger === void 0) { trigger = true; }
        this.subscribe(callback);
        if (trigger) {
            callback(this._value);
        }
    };
    /**
     * Unbinds the specified callback reference.
     */
    Bindable.prototype.unbind = function (callback) {
        for (var i = 0; i < this._listeners.length; i++) {
            var listener = this._listeners[i];
            if (listener !== null && listener.callback === callback) {
                this._listeners[i] = null;
                return;
            }
        }
    };
    /**
     * Manually triggers all listeners' callback functions.
     */
    Bindable.prototype.trigger = function () {
        for (var i = this._listeners.length - 1; i >= 0; i--) {
            var listener = this._listeners[i];
            if (listener !== null && listener !== undefined &&
                listener.callback !== null && listener.callback !== undefined) {
                listener.callback(this._value);
            }
            else {
                this._listeners.splice(i, 1);
            }
        }
    };
    return Bindable;
}());
exports.default = Bindable;
