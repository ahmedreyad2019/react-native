import * as types from "../actionConstants/action-types";

export const loading = loading => {
  return {
    type: types.SET_LOADING,
    loading
  };
};
export const error = error => {
  return {
    type: types.SET_ERROR,
    error
  };
};
export const setUser=user=>{
    return {
        type:types.SET_USER,
        user
    }
}
export const login = (email, password) => {
  return dispatch => {
    dispatch(loading(true));

    fetch("https://serverbrogrammers.herokuapp.com/api/investors/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      response
        .json()
        .then(data => {
          dispatch({
            type: types.LOGIN,
            payload: {
              token: data.token,
              userId:data.id
            }
          })
          dispatch(loading(false));
        })
        .catch(error => {
          dispatch(error(error));
        });
    });
  };
};
export const fetchProfile=(userId,token)=>{
return dispatch=>{
    dispatch(loading())
    fetch(
      `http://serverbrogrammers.herokuapp.com/api/investors/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      }
    )
      .then(response => response.json())
      .then(response => {
       
        dispatch(setUser(response.data))
      })
      .catch(error => {
        dispatch(error())
      })
      .finally(() => {dispatch(loading(false))});
}}
export const logout = () => {
  return {
    type: types.LOGOUT
  };
};



