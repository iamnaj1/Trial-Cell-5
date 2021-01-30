import { AnyAction } from "redux";
import { SET_CHARACTERS_DATA } from "../../constants/characters";
import { setIn } from "../../utils/setIn";

const initialState = {
  charData: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_CHARACTERS_DATA:
      return setIn(state, "charData", action.payload);
    default:
      return state;
  }
};
