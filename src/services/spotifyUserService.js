import axios from "axios";
import uriConstants from "../common/constants";

export function getUserData(jwt) {
  const config = {
    headers: {
      Authorization: "Bearer " + jwt
    }
  };
  axios
    .get(uriConstants.USER_DATA_URL, config)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
}
