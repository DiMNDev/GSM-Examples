## An incomplete guide to Global State Mangement

State is an important part of any application. React gives us some great tools like _**`useState()`**_, it's powerful but has it's limitations. Sure we can pass state as a variable to children to get it's value, we can even pass our setState as a method to call it lower down the component tree, but what if that's 5 children deep? It's possible, but maybe not that practical. This has been referred to as _**prop-drilling**_

### Prop Drilling

Prop Drilling is when you pass a prop down multiple levels of the component tree. There may be times when this might be acceptable, but typically you'd reach for a different medthod to do this. Maybe like _**`useContext()`**_

### useContext()

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

When a user clicks **Increment** our code will _**dispatch**_ our reducer, which is setup with a switch statement, based on the _**type**_ of action. The switch statement will then return the object `{ count: state.count + 1}` with the computed value to dispatch. This will then update the const state with the new value which is shown in the `<p>` element of our component. We can use this in our _**`<ContextProvider />`**_ and get pretty far. But in the words of the late Billy Mays _**"But wait! There's more!**_

### Redux

Redux is a popular package that allows us to manage Global State. It offers more meat and potatoes when dealing with complex application logic. It works similar to _**`useContext()`**_ and _**`useReducer()`**_. Redux uses a **store** as a source of truth like _**`useContext()`**_ and uses **action types** and **reducers** like _**`useReducer()`**_ but comes with more features. Overtime Redux has continued to evolve and the maintainers of Redux recommend using `@reduxjs/toolkit` to implement Redux into new applications.

Some of the benefits of using Redux include:

- Single Source of Truth
- Debugging developer tools
- Predictable State Updates (Action -> Reducer)
- Setting initial state for SSR
- Offers Middleware for Async Logic
- Consistent Behavior of State Logic
- Time-Travel Debugging
- Testing State Logic

### Choosing which path to take

When choosing which approach to take when it comes to Global State Management ultimatley depends on the needs of your application. If you only need to pass values down to children and prop drilling seems too convoluted, _**`useContext()`**_ might be an appropriate solution and Redux might be overkill.

If your application needs simple boolean toggles or simple changes, you could use _**`useContext()`**_ and simply pass the _**state**_ and _**state setter**_ through the _**`<ContextProvider />`**_.

If your application's State Managment needs are a little more complex you can use _**`useReducer()`**_ in conjunction with _**`useContext()`**_ to keep your State Manipulation Methods more uniform by keeping _like_ methods together in one function.

If your application's needs are even more complex where you need to perform asynchrounus operations, need middleware, or are needing initial state values to be rendered server side; Redux might be a good option.

All in all, the methodology you choose depends on your application and the way you design the architecture of it. It's up to you to decide what the needs of your application are.
