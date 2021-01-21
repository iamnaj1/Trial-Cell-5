import React, { useEffect } from "react";
import { Input } from "semantic-ui-react";
import _ from "lodash";
import "./index.scss";
import { useInput } from "../../hooks/useInput";

const ProductSearch = (props: any) => {
  const { setSearchValue, searchValue } = props;
  const {
    value: data,
    bind: bindSearch,
    setValue: setSearch,
  } = useInput(searchValue);

  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);

  return (
    <Input
      className={
        _.isEmpty(searchValue)
          ? "product-search"
          : "product-search--active "
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
      placeholder={"Search Product Name"}
    />
  );
};

export default ProductSearch;
