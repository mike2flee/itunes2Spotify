import { GET_USER_DATA, SET_JWT } from "../actions/spotifyUserActions";

const initialState = {
  userName: "",
  userID: "",
  jwt: "",
  status: "",
  isRequestComplete: false
};

export default function spotifyUserReducer(state = initialState, actions) {
  switch (actions.type) {
    case SET_JWT:
      return Object.assign({}, state, {
        jwt: actions.jwt
      });
    case `${GET_USER_DATA}_PENDING`:
      return Object.assign({}, state, {
        status: "PENDING",
        isRequestComplete: false
      });
    case `${GET_USER_DATA}_FULFILLED`:
      return Object.assign({}, state, {
        status: "FULFILLED",
        isRequestComplete: true,
        userName: actions.payload.data.display_name,
        userID: actions.payload.data.id
      });
    case `${GET_USER_DATA}_REJECTED`:
      return Object.assign({}, state, {
        status: "REJECTED",
        isRequestComplete: false
      });
    default:
      return state;
  }
}
