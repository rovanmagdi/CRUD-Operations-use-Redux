import * as types from "./actionType";

const initialState = {
  usersList: [],
  user: {},
  loading: true,
};

const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERS:
      return {
        ...state,
        usersList: action.payload,
        loading: false,
      };
    case types.DELETE_USERS:
      return {
        ...state,
        loading: false,
      };
    case types.ADD_USERS:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case types.UPDATE_SINGLE_USER:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
export default usersReducers;
