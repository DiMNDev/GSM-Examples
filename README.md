### Using Redux

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

### Setting up Redux

[NextJS Redux Documentation](https://redux.js.org/usage/nextjs)

1. Install dependencies
   - `npm install @reduxjs/toolkit`
   - `npm install react-redux`
2. Define the files structure
   ```
   /app
     layout.tsx
     page.tsx
   /redux
     StoreProvider.tsx
     store.ts
     /reducers
   ```
3. Configure Store
   This setup will return a new store per request. This is important when working with Server Side Rendering(SSR) because:

   - It isolates state for each request
   - Prevents Memory Leaks and State Contamination
   - Provides consistency for SSR
   - Ensures Predictiable Behavior

   ```typescript
   //store.ts
   import { configureStore } from "@reduxjs/toolkit";

   export const makeStore = () => {
     return configureStore({
       reducer: {},
     });
   };

   // Infer the type of makeStore
   export type AppStore = ReturnType<typeof makeStore>;
   // Infer the `RootState` and `AppDispatch` types from the store itself
   export type RootState = ReturnType<AppStore["getState"]>;
   export type AppDispatch = AppStore["dispatch"];
   ```

4. Setup Hooks for _**useAppDispatch**_, _**useAppSelector**_, _**useAppSelector**_
   When using TypeScript it is good practice to define types for these methods

   ```typescript
   import { useDispatch, useSelector, useStore } from "react-redux";
   import type { AppDispatch, AppStore, RootState } from "./store";

   // Use throughout your app instead of plain `useDispatch` and `useSelector`
   export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
   export const useAppSelector = useSelector.withTypes<RootState>();
   export const useAppStore = useStore.withTypes<AppStore>();
   ```
