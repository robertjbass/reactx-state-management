import { Store } from "src";
import { assert, expect, test } from "vitest";

const store = new Store({
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
});

test("store has accessable mutations", () => {
  assert(Object.keys((store as any).mutations).length > 0);
});

test("store has accessable actions", () => {
  assert(Object.keys((store as any).actions).length > 0);
});

test("store has accessable getters", () => {
  assert(Object.keys((store as any).getterFunctions).length > 0);
});

test("store has accessable state", () => {
  assert(Object.keys((store as any).state).length > 0);
});

test("store.getters.getCount", () => {
  expect(store.getters.getCount).toBe(0);
});

test("store.dispatch('incrementCount')", () => {
  store.dispatch("incrementCount", 1);
  expect(store.getters.getCount).toBe(1);
});

test("getters are consistent with state values", () => {
  store.dispatch("incrementCount", 2);
  assert(store.getters.getCount * 2 === store.getters.getCountDoubled);
});
