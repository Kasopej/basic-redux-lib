/**
 * A higher-order reducer that combines multiple reducers into a single reducer.
 * @template {Object.<string, (state: unknown, action?: {type: string, payload?: unknown}) => unknown>} M
 * @param {M} reducersMap
 * @template {{ [K in keyof M]: ReturnType<M[K]> }} S
 * @returns {(state: S, action?: {type: string, payload?: unknown}) => S}
 */
export function combineReducers(reducersMap) {
    return (state = {}, action) => {
       return /** @type {S} */ (
        Object.entries(reducersMap).reduce((partialState, [key, reducer]) => {
            partialState[key] = reducer(state[key], action)
            return partialState
        }, /** @type {Record<string, unknown>} */ ({}))
    )
    }
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
 * Applies middlewares to the given store.
 * @template S
 * @param {Store<S>} store - The store to which middleware should be applied.
 * @param {Middleware<S>[]} middlewares
 * @returns {void}
 */
export function applyMiddlewares(store, middlewares) {
    middlewares.slice().reverse().forEach(middleware => {
       store.dispatch =  /** @type {typeof store.dispatch} */ (middleware(store)(store.dispatch))
    })
}