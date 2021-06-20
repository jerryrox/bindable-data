import { useState, useEffect } from 'react';
import Bindable from "./Bindable";

/**
 * A custom React hook which allows a functional component to refresh when the value of the bindable has changed.
 */
export default function useBindable<T>(bindable: Bindable<T>, onChange?: (v: T) => any) {
    const [value, setValue] = useState(bindable.getValue());

    useEffect(() => {
        const invokeOnChange = (v: T) => {
            if (onChange !== undefined) {
                onChange(v);
            }
        };

        const id = bindable.subscribe((newVal: T) => {
            setValue(newVal);
            invokeOnChange(newVal);
        });
        // Set value once again in case the bindable itself has changed.
        setValue(bindable.value);
        invokeOnChange(bindable.value);
        return () => {
            bindable.unsubscribe(id);
        };
    }, [bindable, onChange]);
    return value;
}

/**
 * Variation of useBindable which allows for a null or undefined Bindable instance as input.
 * If the bindable is null or undefined, the value will be undefined.
 */
export function useBindableUnsafe<T>(bindable: Bindable<T> | null | undefined, onChange?: (v: T | undefined) => any) {
    const [value, setValue] = useState<T | undefined>(bindable?.getValue());

    useEffect(() => {
        const invokeOnChange = (v: T | undefined) => {
            if (onChange !== undefined) {
                onChange(v);
            }
        };

        if (bindable === null || bindable === undefined) {
            setValue(undefined);
            invokeOnChange(undefined);
            return () => { };
        }

        const id = bindable.subscribe((newVal: T) => {
            setValue(newVal);
            invokeOnChange(newVal);
        });
        setValue(bindable.value);
        invokeOnChange(bindable.value);
        return () => {
            bindable.unsubscribe(id);
        };
    }, [bindable, onChange]);
    return value;
}