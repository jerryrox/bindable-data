/**
 * Represents an event which a BLoC instance can receive and react upon.
 */
export default class BlocEvent {
    private _name;
    private _data;
    get name(): string;
    get data(): any;
    constructor(name: string, data: any);
}
