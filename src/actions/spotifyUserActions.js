//import * as userService from "../services/spotifyUserService";
//import Promise from "redux-promise-middleware";
import axios from "axios";
import uriConstants from "../common/constants";
import { createAsyncAction } from "redux-promise-middleware-actions";

export const GET_USER_DATA = "GET_USER_DATA";
export const SET_JWT = "SET_JWT";

export const getUserData = createAsyncAction(GET_USER_DATA, jwt =>
  axios
    .get(uriConstants.USER_DATA_URL, {
      headers: { Authorization: "Bearer " + jwt }
    })
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    })
);

export const jwtActionFunction = {
  getJWT: jwtoken => ({
    type: SET_JWT,
    jwt: jwtoken
  })
};
