export class Store {
  private state: { [key: string]: any };
  private actions: { [key: string]: any };
  private mutations: { [key: string]: any };
  private getterFunctions: { [key: string]: any };
  public getters: { [key: string]: any };

  constructor({ state, actions, mutations, getters }: any) {
    this.state = state || {};
    this.actions = actions || {};
    this.mutations = mutations || {};
    this.getterFunctions = getters || {};
    this.getters = new Proxy(this.getterFunctions, {
      get: (targetGetter: any, getterName: string) => {
        const getter = targetGetter[getterName];
        return getter(this.state);
      },
    });
  }

  private getContext() {
    const context = {
      state: { ...this.state },
      getters: { ...this.getters },
      mutations: { ...this.mutations },
      actions: { ...this.actions },
      //? ensure that `this` within methods refer to the store instance, not object calling it
      dispatch: this.dispatch.bind(this),
      commit: this.commit.bind(this),
    };
    return context;
  }

  private commit(action: string, payload: any) {
    const context = this.getContext();
    const mutation = context.mutations[action];
    if (!mutation) {
      throw new Error(`Mutation ${action} does not exist`);
    }

    mutation(this.state, payload);
  }

  public dispatch(action: string, payload: any) {
    const context = this.getContext();
    const actionFn = context.actions[action];
    if (!actionFn) {
      throw new Error(`Action ${action} does not exist`);
    }

    actionFn(context, payload);
  }

  public mapGetters() {
    return this.getters;
  }
}
