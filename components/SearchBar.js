import React from "react";
import { TextInput } from "react-native";
import PropTypes from "prop-types";

import { screenWidth } from "../constants";
import styles from "../styles";

const SearchBar = ({ onChange, value, onSubmit }) => (
  <TextInput
    style={{
      width: screenWidth - 30,
      backgroundColor: styles.lightGreyColor,
      borderRadius: 4,
      padding: 6,
      textAlign: "center",
    }}
    returnKeyType="search"
    autoCapitalize="none"
    onChangeText={onChange}
    onEndEditing={onSubmit}
    value={value}
    placeholder={"Search"}
    placeholderTextColor={styles.darkGreyColor}
  />
);
SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
