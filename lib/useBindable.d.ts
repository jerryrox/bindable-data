import Bindable from "./Bindable";
/**
 * A custom React hook which allows a functional component to refresh when the value of the bindable has changed.
 */
export default function useBindable<T>(bindable: Bindable<T>, onChange?: (v: T) => any): T;
/**
 * Variation of useBindable which allows for a null or undefined Bindable instance as input.
 * If the bindable is null or undefined, the value will be undefined.
 */
export declare function useBindableUnsafe<T>(bindable: Bindable<T> | null | undefined, onChange?: (v: T | undefined) => any): T | undefined;
