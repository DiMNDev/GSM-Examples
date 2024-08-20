### Using useContext()

React has a baked in hook called _**`useContext()`**_. This method helps us to do just that. We create a _**`<ContextProvider>{children}<ContextProvider />`**_ that holds our values. This acts as a wrapper that allows us to access our values straight into any child it wraps. _**`useContext()`**_ in and of itself is **not** a form of state management. Although the wrapper can pass methods to it's children that can change state _**`useContext()`**_ alone doesn't do it, the logic in our wrapper makes that happen(typically using _**`useState()`**_). This does work, but if your logic becomes more complex where you need perform several things where state changes depend on other state changes you might be re-rendering components more often than they should, the code could become hard to understand. To simplify more complex operations in React also has another useful hook _**`useReducer()`**_.

### useReducer()

_**`useReducer()`**_ allows us to perform multiple operations in a single go and then re-render the component. The _**`useReducer()`**_ hook takes two parameters, the _reducer function_ and the _initial state_.

Here is an example kindly provided by chatGPT

```javascript
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error("Unknown action type");
  }
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
  );
}
```

When a user clicks **Increment** our code will _**dispatch**_ our reducer, which is setup with a switch statement, based on the _**type**_ of action. The switch statement will then return the object `{ count: state.count + 1}` with the computed value to dispatch. This will then update the const state with the new value which is shown in the `<p>` element of our component. We can use this in our _**`<ContextProvider />`**_ and get pretty far.
