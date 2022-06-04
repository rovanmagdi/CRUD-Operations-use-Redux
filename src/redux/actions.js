import * as types from "./actionType";
import axios from "axios";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

const deleteUser = () => ({
  type: types.DELETE_USERS,
});
const getUser = (user) => ({
  type: types.GET_SINGLE_USER,
  payload: user,
});
const addUser = () => ({
  type: types.ADD_USERS,
});

const updateUser = () => ({
  type: types.UPDATE_SINGLE_USER,
});

export const loadUsers = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}`)
      .then((req) => {
        dispatch(getUsers(req.data));
        // console.log(req.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteUserFun = (id) => {
  return function (dispatch) {
    axios
      .delete(`${process.env.REACT_APP_API}/${id}`)
      .then((req) => {
        dispatch(deleteUser());
        dispatch(loadUsers()); //عشان مش اعمل رفريش ف يبقي يظهرلي باقي users اللي مش اتمسحت

        console.log(req.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addUserFun = (user) => {
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_API}`, user)
      .then((req) => {
        dispatch(addUser());
      })
      .catch((error) => {
        // console.log(error);
      });
  };
};

export const getSingleUser = (id) => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}/${id}`)
      .then((req) => {
        console.log(req.data);
        dispatch(getUser(req.data));
        // dispatch(loadUsers()) //عشان مش اعمل رفريش ف يبقي يظهرلي باقي users اللي مش اتمسحت
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateUserFun = (user, id) => {
  return function (dispatch) {
    axios
      .put(`${process.env.REACT_APP_API}/${id}`, user)
      .then((req) => {
        console.log(req.data);
        dispatch(updateUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
