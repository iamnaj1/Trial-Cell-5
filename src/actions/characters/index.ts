import Axios from "axios";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { SET_CHARACTERS_DATA } from "../../constants/characters";
import { errorMessage } from "../../utils/notifications";

export const setCharacterData = (data: any) => ({
  type: SET_CHARACTERS_DATA,
  payload: data,
});

export const fetchCharactersData = (search: string) => (dispatch: any) => {
  return Axios.get(
    `https://www.moogleapi.com/api/v1/characters/search?name=${search}`
  )
    .then((response) => {
      dispatch(setCharacterData(response.data));
    })
    .catch((err) => {
      // display error
      if (err.response && err.response.status === 404) {
        errorMessage("No result");
      }
    });
};
