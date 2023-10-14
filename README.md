# framework-agnostic-vuex

**framework-agnostic-vuex** is a lightweight, framework-agnostic state management library. While it's designed to be especially friendly for React developers, its core design principles make it usable across different JavaScript frameworks.

> 🚧 Type safety is currently in development.

## Quick Start

### Setting up the Store

In this example, we'll set up a simple store that keeps track of a count.

**store.ts**:

```ts
const storeOptions = {
  state: {
    count: 0,
  },
  actions: {
    incrementCount: ({ getters, commit }: any, payload?: number) => {
      const newCount = getters.getCount + (payload || 1);
      commit("SET_COUNT", newCount);
    },
  },
  mutations: {
    SET_COUNT: (state: any, payload: any) => {
      state.count = payload;
    },
  },
  getters: {
    getCount: (state: any) => state.count,
    getCountDoubled: (state: any) => state.count * 2,
  },
};

const store = new Store(storeOptions);
export default store;
```

### Using the Store in Your Application

**app.ts**:

```ts
import store from "./store";

// Fetching the count from store
let count = store.getters.getCount;
console.log(count); // Outputs: 0

// Dispatching an action to increment the count
store.dispatch("incrementCount");
count = store.getters.getCount;
console.log(count); // Outputs: 1

// Fetching a derived value from the store
const countDoubled = store.getters.getCountDoubled;
console.log(countDoubled); // Outputs: 2
```

## Running Tests

To ensure the integrity of your state management setup, you can run tests using the following command:

```bash
npm run test
```
