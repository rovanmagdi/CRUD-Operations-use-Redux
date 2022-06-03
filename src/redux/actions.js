import * as types from './actionType';
import axios from 'axios';

const getUsers = (users) =>
({
    type: types.GET_USERS,
    payload: users,

}
)

const deleteUser = () =>
({
    type: types.DELETE_USERS,
}
)
const addUser = () => (

    {
        type: types.ADD_USERS ,
       
    }
)

export const loadUsers = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}`)
            .then((req => {
                dispatch(getUsers(req.data))
                console.log(req.data);
            }))
            .catch((error) => { console.log(error); })
    }
};

export const deleteUserFun = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_API}/${id}`)
            .then((req => {
                dispatch(deleteUser())
                dispatch(loadUsers()) //عشان مش اعمل رفريش ف يبقي يظهرلي باقي users اللي مش اتمسحت

                console.log(req.data);
            })).catch((error) => { console.log(error); })
    }
}

export const addUserFun = (user) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_API}`,user)
            .then((req => {
                dispatch(addUser())
            })).catch((error) => { console.log(error) })
    }
}