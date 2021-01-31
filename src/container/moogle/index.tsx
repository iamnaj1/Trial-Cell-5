import * as React from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import "./index.scss";
import _ from "lodash";
import Search from "../../components/Search";
import {
  fetchCharactersData,
  setCharacterData,
} from "../../actions/characters";
import { useEffect } from "react";
import CharacterSection from "../../components/CharacterSection";

interface MoogleProps {
  charData: any;
  getCharactersData: (name: string) => void;
  setData: (data: any) => void;
}

const Moogle = (props: MoogleProps) => {
  const { charData } = props;

  const handleSearchProduct = (name: string) => {
    const { getCharactersData, setData } = props;
    if (name.trim() === "") {
      setData([]);
    } else {
      getCharactersData(name);
    }
  };
  return (
    <div className="moogle-container">
      <Search setSearchValue={handleSearchProduct} type={"Character"} />
      <CharacterSection charData={charData} />
    </div>
  );
};

const mapStateToProps = (state: {}) => ({
  charData: get(state, "character.charData"),
});

const mapDispatchToProps = {
  getCharactersData: (search: string) => fetchCharactersData(search),
  setData: (data: any) => setCharacterData(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(Moogle);
