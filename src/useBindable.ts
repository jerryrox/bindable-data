import { useState, useEffect, useMemo } from 'react';
import Bindable from "./Bindable";
import { v1 } from "uuid";

/**
 * A custom React hook which allows a functional component to refresh when the value of the bindable has changed.
 */
export default function useBindable<T>(bindable: Bindable<T>): T {
    const [id, setId] = useState("");
    const value = useMemo<T>(() => {
        return bindable.getValue();
    }, [id, bindable]);

    useEffect(() => {
        const subscription = bindable.subscribe(() => {
            setId(v1());
        });
        setId(v1());
        return () => {
            bindable.unsubscribe(subscription);
        };
    }, [bindable]);
    return value;
}

/**
 * Variation of useBindable which allows for a null or undefined Bindable instance as input.
 * If the bindable is null or undefined, the value will be undefined.
 */
export function useBindableUnsafe<T>(bindable: Bindable<T> | null | undefined): T | undefined {
    const [id, setId] = useState("");
    const value = useMemo<T | undefined>(() => {
        return bindable?.getValue();
    }, [id, bindable]);

    useEffect(() => {
        if (bindable === null || bindable === undefined) {
            setId(v1());
            return () => { };
        }

        const subscription = bindable.subscribe(() => {
            setId(v1());
        });
        setId(v1());
        return () => {
            bindable.unsubscribe(subscription);
        };
    }, [bindable]);
    return value;
}