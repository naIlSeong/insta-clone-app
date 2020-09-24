import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const [term, setTerm] = useState("");
  const onChange = (text) => {
    setTerm(text);
  };
  const onSubmit = () => {
    console.log(term);
  };

  navigation.setOptions({
    headerTitle: () => (
      <SearchBar value={term} onSubmit={onSubmit} onChange={onChange} />
    ),
  });
  return (
    <View>
      <Text>Search</Text>
    </View>
  );
};
