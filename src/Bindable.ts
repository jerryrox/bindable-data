type Action<T = any> = (t: T) => any;

class ListenerInfo<T> {

    id: number;
    callback: Action;

    constructor() {
        this.id = 0;
        this.callback = () => { };
    }
}

/**
 * A data container which a consumer object can listen to state changes.
 */
export default class Bindable<T> {

    private _idIncrement: number;
    private _value: T;
    private _listeners: (ListenerInfo<T> | null)[];
    private _triggerWhenDifferent: boolean = true;

    private _proxySource: Bindable<T> | null = null;
    private _proxySubscription: number = 0;

    /**
     * Returns the source bindable this instance is continuously listening to.
     */
    get proxySource(): Bindable<T> | null { return this._proxySource; }

    /**
     * Returns whether the bindable will trigger on assigning value only when the equality operator returns false.
     */
    get triggerWhenDifferent(): boolean { return this._triggerWhenDifferent; }

    /**
     * Sets whether bindable will trigger on setting the value only when the equality operator returns false.
     */
    set triggerWhenDifferent(value: boolean) { this._triggerWhenDifferent = value; }

    /**
     * Returns the value in the Bindable.
     * Equivalent to getValue().
     */
    get value(): T { return this._value; }

    /**
     * Sets the value in the Bindable.
     * Equivalent to setValue() with trigger = true.
     */
    set value(val: T) { this.setValue(val); }

    constructor(value: T, triggerWhenDifferent: boolean = true) {
        this._idIncrement = 0;
        this._value = value;
        this._listeners = [];
        this._triggerWhenDifferent = triggerWhenDifferent;
    }

    /**
     * Starts proxying the value from the specified bindable.
     * @param {Bindable<T>} source The source bindable to continuously receive values from.
     */
    startProxy(source: Bindable<T>) {
        this.stopProxy();

        this._proxySource = source;
        this._proxySubscription = source.subscribeAndTrigger((value: T) => this.setValue(value));
    }

    /**
     * Stops proxying the bindable's value from current proxy source.
     */
    stopProxy() {
        if(this._proxySource !== null) {
            this._proxySource.unsubscribe(this._proxySubscription);
            this._proxySource = null;
            this._proxySubscription = 0;
        }
    }

    /**
     * Returns the value of the bindable.
     */
    getValue() { return this._value; }

    /**
     * Sets the value of the bindable and triggers a change event to listeners.
     * @param {T} value The value to set to the Bindable.
     * @param {boolean} trigger Whether this call should trigger change event.
     */
    setValue(value: T, trigger: boolean = true) {
        if(this._triggerWhenDifferent && this._value === value) {
            return;
        }
        this._value = value;

        if (trigger === true) {
            this.trigger();
        }
    }

    /**
     * Registers the specified callback function to listen to value change events.
     * @param {Action<T>} callback The function to be invoked on value change.
     */
    subscribe(callback: Action<T>): number {
        const info = new ListenerInfo<T>();
        info.id = this._idIncrement++;
        info.callback = callback;
        this._listeners.push(info);
        return info.id;
    }

    /**
     * Subscribes the specified callback function and immediately calls it with the Bindable's value.
     * @param {Action<T>} callback The function to be invoked on value change and immediately after this method call.
     */
    subscribeAndTrigger(callback: Action<T>): number {
        const id = this.subscribe(callback);
        callback(this._value);
        return id;
    }

    /**
     * Removes the listener of specified id.
     * @param {number} callbackId The subscriber ID returned from calling subscribe method.
     */
    unsubscribe(callbackId: number) {
        for (let i = 0; i < this._listeners.length; i++) {
            const listener = this._listeners[i];
            if (listener !== null && listener.id === callbackId) {
                this._listeners[i] = null;
                return;
            }
        }
    }

    /**
     * Adds the specified callback to listen to value changes.
     */
    bind(callback: Action<T>, trigger: boolean = true): void {
        this.subscribe(callback);
        if(trigger) {
            callback(this._value);
        }
    }

    /**
     * Unbinds the specified callback reference.
     */
    unbind(callback: Action<T>): void {
        for (let i = 0; i < this._listeners.length; i++) {
            const listener = this._listeners[i];
            if (listener !== null && listener.callback === callback) {
                this._listeners[i] = null;
                return;
            }
        }
    }

    /**
     * Manually triggers all listeners' callback functions.
     */
    trigger() {
        for (let i = this._listeners.length - 1; i >= 0; i--) {
            const listener = this._listeners[i];
            if (listener !== null && listener !== undefined &&
                listener.callback !== null && listener.callback !== undefined) {
                listener.callback(this._value);
            }
            else {
                this._listeners.splice(i, 1);
            }
        }
    }
}