import * as React from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import "./index.scss";
import _ from "lodash";
import ProductSearch from "../../components/ProductSearch/productSearch";
import { fetchCharactersData } from "../../actions/characters";
import { useEffect } from "react";

interface MoogleProps {
  charData: any;
  getCharactersData: (name: string) => void;
}

const Moogle = (props: MoogleProps) => {
  const handleSearchProduct = (name: string) => {
    const { getCharactersData } = props;
    getCharactersData(name);
  };

  useEffect(() => {
    const { charData } = props;
  }, [props.charData]);

  return (
    <div className="moogle-container">
      <ProductSearch setSearchValue={handleSearchProduct} type={"Character"} />
    </div>
  );
};

const mapStateToProps = (state: {}) => ({
  charData: get(state, "character.charData"),
});

const mapDispatchToProps = {
  getCharactersData: (search: string) => fetchCharactersData(search),
};

export default connect(mapStateToProps, mapDispatchToProps)(Moogle);
