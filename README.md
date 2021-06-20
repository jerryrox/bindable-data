# bindable-bloc
 A simple BLoC pattern library

## Usage
### How it's different from the BLoC pattern in Flutter
One of the biggest difference would be that there is no concept of sink and streams. We assume the following data flow to simulate a similar effect.
1. A component calls a business logic function of a BLoC instance OR broadcasts an event to the BLoC container and have it caught by an event handler.
2. The state is modified on the bindable object within a BLoC instance.
3. For a component to listen to this state change, the component will call useBindable hook with the bindable state it wants to listen to.

But then again, it all depends on how you utilize the classes included in this library. I initially had no intention on establishing a solid pattern that must be followed to use it.

### Example
#### Using Bindable objects
The basic usage of bindable object is as simple as follows:
```
// Defining a bindable state
username = new Bindable<string>("");

// Setting a value to the bindable state
username.setValue("John");

// Retrieving the value in the bindable state
const name = username.getValue();
```
You can subscribe and unsubscribe to changes of a bindable state. However, it is almost unlikely that you'll need these functionalities yourself.
```
// Subscribing to a bindable object.
// It returns a subscriber ID which can be used for unsubscribing at a later time.
const id = username.subscribe((v) => {
    /* Do something with the value... */
    console.log("New username: " + v);
});

// Unsubscribing from the bindable requires the id that was returned when you subscribed to the bindable object.
username.unsubscribe(id);
```
Bindables can be used within a component to receive new state values when they change, using a React hook "useBindable". They internally use the subscribe/unsubscribe functions mentioned above to achieve this.
```
// Let's assume this bindable object exists somewhere in your app.
const username = new Bindable<string>("John");

// Then in your component,
const MyComponent = () => {

    // Listen to state change in the "username" bindable.
    // If the internal value of the specified bindable changes, it will trigger a component refresh.
    const name = useBindable(username);

    // The resulting output will be "Username is: John"
    return (
        <div>
            <p>Username is: {name}</p>
        </div>
    );
};
```
You may wrap any type of object in a Bindable but remember that "useBindable" internally uses "useState" hook, which only triggers component refresh when the object reference changes.
```
// Say we have this
const myData = [1, 2, 3];
const bindableData = new Bindable<Array<number>>(myData);

// Doing this will update the bindable data, but not trigger component refresh because the value is still the same object reference!
myData.push(4);
bindableData.setValue(myData);

// This will successfully trigger component refresh.
bindableData.setValue([
    ...myData, 4
]);
```

## TODOs
- Add more examples in README

## Versions
### 1.2.4
- Implemented `useBindableUnsafe` to support null or undefined bindables as parameter.
- Fixed `useBindable`'s `onChange` callback not being invoked when the bindable changes.
### 1.2.1
- Added bind/unbind functions to cover some limitations imposed by subscribe/unsubscribe.
### 1.2.0
- Added a flag to trigger on `setValue` only when the new value is not equal to the existing value.
- Implemented ability to continuously receive value from another `Bindable` using `startProxy` and `stopProxy`.
### 1.1.8
- Fixed bug in `useBindable` where changing the Bindable instance wouldn't trigger state update.
### 1.1.7
- A quick fix where bindable subscription would potentially occur every render.
### 1.1.6
- Added value getter / setter properties to Bindable for convenience.
- Added ability to set Bindable's value without triggering an event.
### 1.1.5
- Added undefined value check against listener during Bindable.trigger().
### 1.1.4
- Fixed bug where the Bindable.trigger() method will throw an error if the callback became undefined or null.
### 1.1.3
- Added ability to subscribe to a bindable and immediately receive trigger callback.
### 1.1.2
- Support for persistent state using localForage dependency.
### 1.1.1
- Added more tests.
- Changed BlocContextValue.getBloc's return type from T | null to T. If you provide a constructor which a BLoC instance hasn't been cached for, it will throw an error instead.
### 1.0.0
- Initial publish to NPM.