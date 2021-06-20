import React from "react";
import Bindable from '../../src/Bindable';
import useBindable from '../../src/useBindable';
import { useBindableUnsafe } from "../../src/useBindable";

interface ILabelDisplayerProp {
    bindable: Bindable<string>;
    onChange?: (value: string) => void;
}
export const LabelDisplayer = ({
    bindable,
    onChange,
}: ILabelDisplayerProp) => {

    const boundData = useBindable(bindable, onChange);

    return (
        <div>
            <p>{boundData}</p>
        </div>
    );
};


interface INullableTestParam {
    bindable: Bindable<string> | null | undefined;
    onChange?: (value: string | undefined) => void;
}
const NullableTest = ({
    bindable,
    onChange,
}: INullableTestParam) => {

    const data = useBindableUnsafe(bindable, onChange);

    return (
        <div>
            <p>{data ?? "undefined"}</p>
        </div>
    );
};
export default NullableTest;