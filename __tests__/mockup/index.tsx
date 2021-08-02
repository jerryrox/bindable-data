import React from "react";
import Bindable from '../../src/Bindable';
import useBindable from '../../src/useBindable';
import { useBindableUnsafe } from "../../src/useBindable";

interface ILabelDisplayerProp {
    bindable: Bindable<string>;
}
export const LabelDisplayer = ({
    bindable,
}: ILabelDisplayerProp) => {

    const boundData = useBindable(bindable);

    return (
        <div>
            <p>{boundData}</p>
        </div>
    );
};


interface INullableTestParam {
    bindable: Bindable<string> | null | undefined;
}
export const NullableTest = ({
    bindable,
}: INullableTestParam) => {

    const data = useBindableUnsafe(bindable);

    return (
        <div>
            <p>{data ?? "undefined"}</p>
        </div>
    );
};


interface IArrayDisplayerProp {
    bindable: Bindable<string[]>;
}
export const ArrayDisplayer = ({
    bindable,
}: IArrayDisplayerProp) => {

    const boundData = useBindable(bindable);

    return (
        <div>
            <p>{JSON.stringify(boundData)}</p>
        </div>
    );
};


interface INullableArrayDisplayerProp {
    bindable: Bindable<string[]> | null | undefined;
}
export const NullableArrayDisplayer = ({
    bindable,
}: INullableArrayDisplayerProp) => {

    const boundData = useBindableUnsafe(bindable);

    return (
        <div>
            <p>{boundData === undefined ? "undefined" : JSON.stringify(boundData)}</p>
        </div>
    );
};