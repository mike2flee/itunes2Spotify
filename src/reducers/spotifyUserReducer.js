import { GET_USER_DATA } from "../actions/spotifyUserActions";

const initialState = {
  userName: "",
  userID: "",
  jwt: "",
  status: "",
  isRequestComplete: false
};

export default function spotifyUserReducer(state = initialState, actions) {
  switch (actions.type) {
    case `${GET_USER_DATA}_PENDING`:
      return Object.assign({}, state, {
        status: "PENDING",
        isRequestComplete: false
      });
    case `${GET_USER_DATA}_FULFILLED`:
      return Object.assign({}, state, {
        state: "FULFILLED",
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
