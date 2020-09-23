import React from "react";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";

const NavIcon = ({
  focused = false,
  name,
  size = 30,
  color = styles.blackColor,
}) => (
  <Ionicons
    name={name}
    size={size}
    color={focused ? color : styles.darkGreyColor}
  />
);

NavIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  focused: PropTypes.bool,
};

export default NavIcon;
