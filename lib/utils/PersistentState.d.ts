import Bindable from '../Bindable';
/**
 * Makes the specified bindable object's state persistent.
 */
export declare function makePersistent<TValue>(bindable: Bindable<TValue>, uniqueKey: string, customStore?: LocalForage): Promise<Bindable<TValue>>;
