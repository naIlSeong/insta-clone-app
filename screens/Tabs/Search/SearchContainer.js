import React, { useState } from "react";
import SearchBar from "../../../components/SearchBar";
import SearchPresenter from "./SearchPresenter";

export default ({ navigation }) => {
  const [term, setTerm] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const onChange = (text) => {
    setShouldFetch(false);
    setTerm(text);
  };

  const onSubmit = () => {
    setShouldFetch(true);
  };

  navigation.setOptions({
    headerTitle: () => (
      <SearchBar value={term} onSubmit={onSubmit} onChange={onChange} />
    ),
  });
  return <SearchPresenter term={term} shouldFetch={shouldFetch} />;
};
