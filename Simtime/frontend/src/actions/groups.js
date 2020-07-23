import { createMessage, returnErrors } from "./messages";
import { axiosInstance, axiosFormInstance } from "./axiosApi";
// import axios from "axios";
// import { getCookie } from "./cookie";

import {
  ADD_GROUP,
  GET_GROUPS,
  GET_GROUP,
  EDIT_GROUP,
  GET_GROUPMEMBERS,
  DELETE_GROUP,
} from "./types";

export const getGroups = () => (dispatch) => {
  axiosFormInstance
    .get("/api/groups/")
    .then((res) => {
      console.log("groups", res);
      dispatch({
        type: GET_GROUPS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const createGroup = (data) => (dispatch) => {
  console.log("createGroup", data);

  return axiosInstance
    .post("/api/groups/create/", {
      account: data.account,
      groupname: data.groupname,
    })
    .then((res) => {
      dispatch({
        type: ADD_GROUP,
        payload: res.data,
      });
      dispatch(createMessage({ addGroup: "Group Added" }));
      return res.data;
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return err.response.data;
    });
};

export const deleteGroup = (id) => (dispatch) => {
  axiosInstance
    .delete(`/api/group/${id}`)
    .then((res) => {
      console.log(res);
      dispatch(createMessage({ deleteGroup: "Group Deleted" }));
      dispatch({
        type: DELETE_GROUP,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

export const getGroup = (id) => (dispatch) => {
  axiosInstance
    .get(`/api/group/${id}`)
    .then((res) => {
      dispatch({
        type: GET_GROUP,
        payload: res.data.id,
      });
      dispatch(createMessage({ getGroup: res.data.groupname }));
    })
    .catch((err) => console.log(err));
};

export const editGroup = (group) => (dispatch) => {
  axiosInstance
    .put(`/api/group/${group.id}/`, group)
    .then((res) => {
      dispatch(createMessage({ editGroup: "Group Edited" }));
      dispatch({
        type: EDIT_GROUP,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getMemebers = (id) => (dispatch) => {
  console.log("getMemebers id", id);
  return axiosInstance
    .get(`/api/groupmember/${id}`)
    .then((res) => {
      console.log("groupMemebers res", res.data);
      dispatch({
        type: GET_GROUPMEMBERS,
        payload: { id: id, members: res.data },
      });
    })
    .catch((err) =>{
    dispatch({
      type: GET_GROUPMEMBERS,
      payload: { id: id , members: [] },
    })
      dispatch(returnErrors(err.response.data, err.response.status))
  });
};


export const deleteMemebers = (id) => (dispatch) => {
   return axiosInstance
     .delete("/api/groupmember/", id)
     .then((res) => {
       dispatch(createMessage({ deleteMember: "Deleted" }));
     })
     .catch((err) => {
       dispatch(returnErrors(err.response.data, err.response.status));
     });
};

// 친구가 속한 그룹 관리
export const addToGroup = (datas) => (dispatch) => {
  //{relationship:0, group:0}
  console.log("addToGroup", datas);
  return axiosInstance
    .post("/api/friend/add-to-group/", datas)
    .then((res) => {
      dispatch(createMessage({ addToGroup: "Added to Group" }));
      return res;
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return err;
    });
};