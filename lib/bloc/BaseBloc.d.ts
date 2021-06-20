import BlocEvent from "./BlocEvent";
declare type EventHandler = (e: BlocEvent) => void;
/**
 * The base class of any BLoC class in the application.
 */
export default abstract class BaseBloc {
    private _eventHooks;
    constructor();
    /**
     * Initializes the BLoC instance asynchronously if required.
     */
    initialize(): Promise<void>;
    /**
     * Handles the specified event using handlers registered via hookEvent.
     * @param {BlocEvent} event The event data to pass to the event handlers.
     */
    processEvent(event: BlocEvent): void;
    /**
     * Hooks the specified handler to an event name.
     * @param {string} name The name of the event to listen to.
     * @param {EventHandler} handler The function which performs certain action in response to the listening event.
     */
    protected hookEvent(name: string, handler: EventHandler): void;
}
export {};
