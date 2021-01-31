import React, { useEffect } from "react";
import { Input } from "semantic-ui-react";
import _ from "lodash";
import "./index.scss";
import { useInput } from "../../hooks/useInput";

const Search = (props: any) => {
  const { setSearchValue, type} = props;
  const {
    value: data,
    bind: bindSearch, 
  } = useInput('');
 

  return (
    <Input
      className={
        _.isEmpty(data)
          ? "search"
          : "search--active "
      }
      action={{
        icon: "search",
        onClick: () => {
          setSearchValue(data);
        },
      }}
      onKeyUp={(e: any) => {
        if (e.key === "Enter") {
          setSearchValue(e.target.value);
        }
      }}
      {...bindSearch}
      placeholder={`Search ${type} Name`}
    />
  );
};

export default Search;
