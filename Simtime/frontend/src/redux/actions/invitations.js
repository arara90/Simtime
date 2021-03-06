import { axiosInstance } from "./axiosApi";
import { createMessage, returnErrors } from "./messages";
import { getStrFullDate , getFullTime } from "./calendar"

import {
  GET_INVITATIONS,
  ADD_INVITATION,
  DELETE_INVITATION,
  TOGGLE_INVITATION, 
  GET_ERRORS,
  CREATE_MESSAGE,
  GET_EVENTS,
} from "./types";


function separateTime(data){
  var res = {...data}
  var event_at = new Date(Date.parse(res.event_time))
  res['event_date'] = getStrFullDate(event_at, "yyyy-mm-dd")
  res['event_time'] = getFullTime(event_at)
  return res
}

export const addInvitations = (event, friendIds) => async (dispatch) => {
  var invitations = new Array(friendIds.length)
  friendIds.forEach( (friendId, index) => {
    invitations[index] = {event: event, guest:friendId}
  });
  return axiosInstance
  .post("/api/invitations/create", invitations)
  .then((res={data:[]}) => {
    var datas = res.data
    if(datas.length==1 && (datas[0].event.host.id == datas[0].guest)){
      var resInvitation = datas[0]
      var separated = separateTime(resInvitation.event)
      resInvitation['event'] = separated
      dispatch({
        type: ADD_INVITATION,
        payload: resInvitation,
      });

      return resInvitation
      }else{
        dispatch(createMessage({ addInvitations: 'Invited friends!' }));
      }
  })
  .catch((err) => {
    dispatch(returnErrors(err, err.response.status));
    console.log(err)
  });

};


export const getInvitations = (start, end) => (dispatch) => {
  console.log(start, end)
  axiosInstance
    .get(`/api/invitations/${start}/${end}`)
    .then((res={data:[]}) => {
      var transformed = {}
      res.data.map((item)=>{
        var separated = separateTime(item.event)
        var date = separated.event_date
        if( transformed[date]==undefined){
          transformed[date] = [{...item, 'event': separated}]
        }else{
          transformed[date] = [...transformed[date], {...item, 'event': separated}]
        }
      })
      dispatch({type: GET_INVITATIONS, payload: transformed,});
    })
    .catch((err) =>{
      dispatch(returnErrors(err.response, err.response.status))
      console.log(err)
    });
};

export const toggleInvitations = (invitation, key) => async (dispatch) => {
  invitation[key] = !invitation[key]
  // invitation['event'] = invitation.evnet.id
  var message = {
    'like' : 'Like',
    'show' :  !invitation[key] ?  "Hide" : "Show",
    'attendance' : !invitation[key] ?  "Cancel" : "Join the Event",
  }

  return axiosInstance
  .put(`/api/invitations/${invitation.id}`, invitation)
  .then((res) => {
    var separated = separateTime(res.data.event)
    res.data['event'] = separated

    dispatch({
      type: TOGGLE_INVITATION,
      payload: res.data,
    });
    dispatch(createMessage({ toggleInvitation: message[key] }));
  })
  .catch((err) => {
    dispatch(returnErrors(err.response, err.response.status));
    console.log(err)
  });

};

export const deleteInvitation= (id, event_date) => (dispatch) => {
  axiosInstance
    .delete(`/api/invitation/${id}`)
    .then(() => {
      dispatch(createMessage({ deleteInvitation: "Invitation Deleted" }));
      dispatch({type: DELETE_INVITATION, payload:{id:id, event_date:event_date}});
    })
    .catch((err) => {
      // dispatch(returnErrors(err, err.response.status));
      console.log(err)
    });
};