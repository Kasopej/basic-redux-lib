import React, { PropTypes } from 'react';
import { Link as RouterLink } from "react-router";

const Link = ({ children, filter }) => {
  return (
    <RouterLink
      to={filter}
      activeStyle={{
        textDecoration: "none",
        color: "brown",
      }}
    >
      {children}
    </RouterLink>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Link;
