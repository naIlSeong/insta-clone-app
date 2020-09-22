import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { screenWidth } from "../constants";

const Container = styled.View`
  margin-bottom: 15px;
`;

const TextInput = styled.TextInput`
  width: ${screenWidth / 2}px;
  padding: 6px;
  background-color: ${(props) => props.theme.greyColor};
  border: 1px solid ${(props) => props.theme.lightGreyColor};
  border-radius: 3px;
`;

const AuthInput = ({
  placeholder,
  value,
  onChange,
  onSubmitEditing = () => null,
  autoCapitalize = "none",
  autoCorrect = false,
  returnKeyType = "done",
  keyboardType = "default",
}) => (
  <Container>
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      onSubmitEditing={onSubmitEditing}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      returnKeyType={returnKeyType}
      keyboardType={keyboardType}
    />
  </Container>
);

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func,
  autoCapitalize: PropTypes.oneOf(["characters", "words", "sentences", "none"]),
  autoCorrect: PropTypes.bool,
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad",
  ]),
};

export default AuthInput;
