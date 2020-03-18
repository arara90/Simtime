import axios from "axios";
// import { tokenConfig } from "../actions/auth";

export const getEvent = (id, token) => {
  return axios
    .get(
      `/api/events/${id}`
      // , {
      //   "content-type": "application/json",
      //   authorization: `Bearer ${token}`
      // }
    )
    .then(res => res.data)
    .catch(
      err => {}
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};
