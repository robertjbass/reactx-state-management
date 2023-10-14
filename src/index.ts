type State = Record<string, any>;

interface Actions {
  [key: string]: (context: StoreContext, payload?: any) => void;
}

interface Mutations {
  [key: string]: (state: State, payload?: any) => void;
}

interface Getters {
  [key: string]: (state: State) => any;
}

interface StoreOptions {
  state?: State;
  actions?: Actions;
  mutations?: Mutations;
  getters?: Getters;
}

interface StoreContext {
  state: State;
  getters: Record<string, any>;
  mutations: Mutations;
  actions: Actions;
  dispatch: (action: string, payload?: any) => void;
  commit: (mutation: string, payload?: any) => void;
}

export class Store {
  private state: State;
  private actions: Actions;
  private mutations: Mutations;
  private getterFunctions: Getters;
  public getters: Record<string, any>;
  private context: StoreContext;

  constructor({ state, actions, mutations, getters }: StoreOptions) {
    this.state = state || {};
    this.actions = actions || {};
    this.mutations = mutations || {};
    this.getterFunctions = getters || {};
    this.getters = new Proxy(this.getterFunctions, {
      get: (targetGetter: Getters, getterName: string) => {
        const getter = targetGetter[getterName];
        return getter(this.state);
      },
    });

    this.context = {
      state: this.state,
      getters: this.getters,
      mutations: this.mutations,
      actions: this.actions,
      dispatch: this.dispatch.bind(this),
      commit: this.commit.bind(this),
    };
  }

  private commit(mutationType: string, payload?: any) {
    const mutation = this.context.mutations[mutationType];
    if (!mutation) {
      throw new Error(`Mutation ${mutationType} does not exist`);
    }
    mutation(this.state, payload);
  }

  public dispatch(action: string, payload?: any) {
    const actionFn = this.context.actions[action];
    if (!actionFn) {
      throw new Error(`Action ${action} does not exist`);
    }
    actionFn(this.context, payload);
  }

  public mapGetters() {
    return this.getters;
  }
}
