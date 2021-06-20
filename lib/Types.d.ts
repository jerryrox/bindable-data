export declare type Action = () => void;
export declare type ActionT<T> = (t: T) => void;
export declare type ActionTT<T1, T2> = (t1: T1, t2: T2) => void;
export declare type Constructor<T> = new (...args: any[]) => T;
