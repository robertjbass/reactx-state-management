# reactx-state-management

> Type safety is a WIP

## Example

```ts
// store.ts
const options = {
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

const store = new Store(options);
export default store;

// app.ts
import store from "./store";

const count = store.getters.getCount;
console.log(count); // 0

store.dispatch("incrementCount");
const countDoubled = store.getters.getCount;
console.log(count); // 2
```

## Test

```bash
npm run test
```
