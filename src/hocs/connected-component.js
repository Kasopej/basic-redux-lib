import { connect } from "react-redux"
import { withRouter } from "react-router"

/**
 * @typedef {Parameters<typeof import("react-redux").connect>} ReduxConnectParams
 */
/**
 * Setup a component with Redux store and React Router.
 *
 * @param {React.ComponentType<any>} comp
 * @param {{store: unknown[]}} options
 * @return {React.ComponentType<any>} - The setup component.
 */
export default function connectedComponent(comp, options) {
   return withRouter(connect(...
      /** @type {ReduxConnectParams} */ (
      options.store
   ))(comp))
}