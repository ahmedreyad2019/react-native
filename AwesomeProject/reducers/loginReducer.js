import * as actionTypes from "../actionConstants/action-types";
const intialState = {
  loggedIn: false,
  error: null,
  token: "",
  loading: false,
  userId: "",
  user: ""
};
export default (loginReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        loggedIn: true,
  
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        token: '',
        userId: '',
        loggedIn: false,
        user: '',
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.error,
        loggedIn: false
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
});
