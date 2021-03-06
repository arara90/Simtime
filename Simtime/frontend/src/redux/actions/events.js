import { createMessage, returnErrors } from "./messages";
import { axiosInstance, axiosFormInstance } from "./axiosApi";
import {getStrFullDate , getFullTime} from "./calendar"
import {startLoading, finishLoading } from "./loading"
import {addInvitations} from "./invitations"

import {
  GET_EVENTS,
  GET_EVENT,
  DELETE_EVENT,
  EDIT_EVENT,
  DELETE_INVITATION,
  GET_ERRORS,
  CREATE_MESSAGE,
  START_LOADING,
  FINISH_LOADING
} from "./types";


function separateEventTime(data){
  var res = {...data}
  var event_at = new Date(Date.parse(res.event_time))
  res['event_date'] = getStrFullDate(event_at, "yyyy-mm-dd")
  res['event_time'] = getFullTime(event_at)
  return res
}

export const getEvents = (start, end) => (dispatch) => {
  axiosFormInstance
    .get(`/api/events/${start}/${end}`)
    .then((res={data:[]}) => {
      var transformed = {}
      res.data.map((d)=>{
        var separated = separateEventTime(d)
        var date = separated.event_date
        if( transformed[date]==undefined){
          transformed[date] = [separated]
        }else{
          transformed[date] = [...transformed[date], separated]
        }
      })
      dispatch({type: GET_EVENTS,payload: transformed,});
    })
    .catch((err) =>{
      dispatch(returnErrors(err.response.data, err.response.status))
      console.log(err)
    });
};

export const getEvent = (id) => (dispatch) => {
  dispatch({type: GET_EVENT,payload: id});
};

export const addEvent =  (event, img) => async (dispatch) =>{
  const SUCCEESS = 'ADD_EVENT_SUCCESS'
  const FAILURE = 'ADD_EVENT_FAILURE'

  try{
    if(img) {
      const formData = new FormData();
      formData.append("photo", img);
      formData.append("host", event.host);
      formData.append("event_name", event.event_name);
      formData.append("event_time", event.event_time);
      formData.append("status", event.status);
      formData.append("event_place", JSON.stringify(event.event_place) );
      formData.append("message", event.message);
  
      return axiosFormInstance
        .post("/api/events/create", formData)
        .then((response) => {
          //본인 to 본인 invitation 보내기
          return dispatch(addInvitations(response.data.id, [response.data.host.id]))
        })
        .then((res)=>{
          dispatch(createMessage({ addEvent: "Event Added" }));
          return res.event.id
        })
        .catch((err) => {
          console.log(err)
        });
    }else{
      return axiosInstance
        .post("/api/events/create", event)
        .then((response) => {
          //본인 to 본인 invitation 보내기
          var resEvent = response.data
          return dispatch(addInvitations(resEvent.id, [resEvent.host.id]))
        })
        .then((res)=>{
          console.log('eventres', res)
          dispatch(createMessage({ addEvent: "Event Added" }));
          return res.event.id
        })
        .catch((err) => {
          dispatch(returnErrors(err, err.response.status));
          console.log(err)
        });
    }
  }catch(e){
    dispatch({type:FAILURE,payload: e,error: true});
  }
}

export const deleteEvent = (id, event_date) => (dispatch) => {
  axiosInstance
    .delete(`/api/events/${id}`)
    .then(() => {
      dispatch(createMessage({ deleteEvent: "Event Deleted" }));
      dispatch({type: DELETE_EVENT, payload:{id:id, event_date:event_date}});
      dispatch({type: DELETE_INVITATION, payload:{id:id, event_date:event_date}});
    })
    .catch((err) => {
      // dispatch(returnErrors(err, err.response.status));
      console.log(err)
    });
};

export const editEvent = (event) => (dispatch) => {
  axiosFormInstance
    .put(`/api/events/${event.id}`, event)
    .then((res) => {
      dispatch({type: EDIT_EVENT, payload: res.data});
    })
    .catch((err) => {
      dispatch(returnErrors(err, err.response.status));
      console.log(err)
    });
};


