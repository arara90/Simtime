import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_EVENTS,
  GET_EVENT,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  GET_ERRORS,
  CREATE_MESSAGE
} from "./types";

export const getEvents = () => (dispatch, getState) => {
  axios
    .get("/api/events/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getEvent = id => (dispatch, getState) => {
  console.log("getEvent ", getState);
};

export const addEvent = event => (dispatch, getState) => {
  axios
    .post("/api/events/", event, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_EVENT,
        payload: res.data
      });

      dispatch(createMessage({ addEvent: "Event Added" }));
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const deleteEvent = id => (dispatch, getState) => {
  axios
    .delete(`/api/events/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteEvent: "Event Deleted" }));
      dispatch({
        type: DELETE_EVENT,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

export const updateEvent = id => (dispatch, getState) => {
  axios
    .put(`/api/events/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UPDATE_EVENT,
        payload: id
      });
    })
    .catch(err => console.log(err));
};
