import Link from "./Link.js";
import connectedComponent from "../hocs/connected-component.js";

const FilterLink = connectedComponent(Link, {
  store: [],
});

export default FilterLink;
