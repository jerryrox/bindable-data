# bindable-data
A smaller version of the parent project `bindable-bloc`.

## Versions
### 0.1.1
- Potential fix for weird initial behavior when called `useBindable`.

### 0.1.0
- Removed additional `onChange` argument on `useBindable` and `useBindableUnsafe` hooks due to negligible usage and being a hindrance in extending the hook's functionalities.
- Changed process of `useBindable` and `useBindableUnsafe` to ensure the component can be rerendered when the bindable is triggered even without the reference of `Bindable.value` changing.

### 0.0.1
- Initial release