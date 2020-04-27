import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;
const SearchBox = (props) => {
  const [SearchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    props.refreshFuction(event.target.value);
  };
  return (
    <div>
      <Search
        value={SearchTerm}
        onChange={handleSearch}
        placeholder="Search by Typing..."
      />
    </div>
  );
};

export default SearchBox;
