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
  keyboardType = "default",
  autoCapitalize = "none",
  onChange,
}) => (
  <Container>
    <TextInput
      placeholder={placeholder}
      value={value}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      onChangeText={onChange}
    />
  </Container>
);

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad",
  ]),
  autoCapitalize: PropTypes.oneOf(["characters", "words", "sentences", "none"]),
  onChange: PropTypes.func.isRequired,
};

export default AuthInput;
