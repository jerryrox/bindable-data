declare type Action<T = any> = (t: T) => any;
/**
 * A data container which a consumer object can listen to state changes.
 */
export default class Bindable<T> {
    private _idIncrement;
    private _value;
    private _listeners;
    private _triggerWhenDifferent;
    private _proxySource;
    private _proxySubscription;
    /**
     * Returns the source bindable this instance is continuously listening to.
     */
    get proxySource(): Bindable<T> | null;
    /**
     * Returns whether the bindable will trigger on assigning value only when the equality operator returns false.
     */
    get triggerWhenDifferent(): boolean;
    /**
     * Sets whether bindable will trigger on setting the value only when the equality operator returns false.
     */
    set triggerWhenDifferent(value: boolean);
    /**
     * Returns the value in the Bindable.
     * Equivalent to getValue().
     */
    get value(): T;
    /**
     * Sets the value in the Bindable.
     * Equivalent to setValue() with trigger = true.
     */
    set value(val: T);
    constructor(value: T, triggerWhenDifferent?: boolean);
    /**
     * Starts proxying the value from the specified bindable.
     * @param {Bindable<T>} source The source bindable to continuously receive values from.
     */
    startProxy(source: Bindable<T>): void;
    /**
     * Stops proxying the bindable's value from current proxy source.
     */
    stopProxy(): void;
    /**
     * Returns the value of the bindable.
     */
    getValue(): T;
    /**
     * Sets the value of the bindable and triggers a change event to listeners.
     * @param {T} value The value to set to the Bindable.
     * @param {boolean} trigger Whether this call should trigger change event.
     */
    setValue(value: T, trigger?: boolean): void;
    /**
     * Registers the specified callback function to listen to value change events.
     * @param {Action<T>} callback The function to be invoked on value change.
     */
    subscribe(callback: Action<T>): number;
    /**
     * Subscribes the specified callback function and immediately calls it with the Bindable's value.
     * @param {Action<T>} callback The function to be invoked on value change and immediately after this method call.
     */
    subscribeAndTrigger(callback: Action<T>): number;
    /**
     * Removes the listener of specified id.
     * @param {number} callbackId The subscriber ID returned from calling subscribe method.
     */
    unsubscribe(callbackId: number): void;
    /**
     * Adds the specified callback to listen to value changes.
     */
    bind(callback: Action<T>, trigger?: boolean): void;
    /**
     * Unbinds the specified callback reference.
     */
    unbind(callback: Action<T>): void;
    /**
     * Manually triggers all listeners' callback functions.
     */
    trigger(): void;
}
export {};
