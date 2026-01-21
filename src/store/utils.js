/**
 * A higher-order reducer that combines multiple reducers into a single reducer.
 * @template {Record<string, unknown>} S
 * @template {{[K in keyof S]: (state: S[K], action?: {type: string, payload?: unknown}) => S[K]}} M
 * @param {M} reducersMap
 * @returns {(state: S, action?: {type: string, payload?: unknown}) => S}
 */
export function combineReducers(reducersMap) {
  return (state = /** @type {S} */ ({}), action) => {
    return /** @type {S} */ (
      Object.entries(reducersMap).reduce((partialState, [key, reducer]) => {
        partialState[key] = reducer(state[key], action);
        return partialState;
      }, /** @type {Record<string, unknown>} */ ({}))
    );
  };
}

/**
 * @template S
 * @typedef {import('redux').Store<S>} Store
 */

/**
 * @typedef {import('redux').Action} Action
 */

/**
 * @template S
 * @typedef {(store: Store<S>) => (next: Store<S>['dispatch']) => (action: Action | Promise<Action>) => (Action | Promise<Action>)} Middleware
 * @exports
 */

/**
 * @template S
 * @param {Middleware<S>[]} middlewares
 * @returns {import('redux').StoreEnhancer<S>}
 */
export function applyMiddlewares(middlewares) {
  return (nextCreator) => {
    return (reducer, initialState) => {
      const store = nextCreator(reducer, initialState);
      middlewares
        .slice()
        .reverse()
        .forEach((middleware) => {
          store.dispatch = /** @type {typeof store.dispatch} */ (
            middleware(store)(store.dispatch)
          );
        });
      return store;
    };
  };
}