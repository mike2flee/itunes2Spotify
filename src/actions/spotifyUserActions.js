import * as userService from "../services/spotifyUserService";
import Promise from "redux-promise-middleware";

export const GET_USER_DATA = "GET_USER_DATA";

export const spotifyUserActionsFunctions = {
  getUserData: jwt => ({
    type: GET_USER_DATA,
    payload: new Promise(userService.getUserData(jwt))
  })
};
