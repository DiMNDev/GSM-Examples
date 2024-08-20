## Prop Drilling & Local Storage

State is an important part of any application. React gives us some great tools like _**`useState()`**_, it's powerful but has it's limitations. Sure we can pass state as a variable to children to get it's value, we can even pass our setState as a method to call it lower down the component tree, but what if that's 5 children deep? It's possible, but maybe not that practical. This has been referred to as _**prop-drilling**_

### Prop Drilling

Prop Drilling is when you pass a prop down multiple levels of the component tree. There may be times when this might be acceptable, but typically you'd reach for a different medthod to do this.

### using local storage?

To pass data around and access it from a global location, local storage could "work". This has limitations and may not fully offer the desired result. It's a tool to be used but not for everything.

A few problems with using local storage:

- You're using space in the users browser
- Might not be very safe
- Might not be Efficient
- Not an effective method of State Management
