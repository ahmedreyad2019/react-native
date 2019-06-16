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
export const setUser = user => {
  return {
    type: types.SET_USER,
    user
  };
};
export const setCompanies = companies => {
  return {
    type: types.SET_COMPANIES,
    companies
  };
};
export const setAllCompanies = companies => {
  return {
    type: types.SET_ALL_COMPANIES,
    companies
  };
};
export const setRequests = requests => {
  return {
    type: types.SET_REQUESTS,
    requests
  };
};
export const selectCompany = company => {
  return {
    type: types.SELECT_COMPANY,
    company
  };
};
export const closeCompanyModal = () => {
  return {
    type: types.CLOSE_COMPANY_MODAL
  };
};
export const openCompanyModal = () => {
  return {
    type: types.OPEN_COMPANY_MODAL
  };
};
export const closeDateModal = () => {
  return {
    type: types.CLOSE_DATE_MODAL
  };
};
export const openDateModal = () => {
  return {
    type: types.OPEN_DATE_MODAL
  };
};
export const logout = () => {
  return {
    type: types.LOGOUT
  };
};
export const login = (email, password) => {
  return dispatch => {
    dispatch(loading(true));
    dispatch(setCompanies(null));
    fetch("https://serverbrogrammers.herokuapp.com/api/investors/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        if (data.auth) {
          dispatch({
            type: types.LOGIN,
            payload: {
              token: data.token,
              userId: data.id
            }
          });
        } else dispatch(error(true));
        dispatch(loading(false));
      });
    });
  };
};

export const fetchRequests = token => {
  return dispatch => {
    dispatch(loading(true));
    fetch(
      `http://serverbrogrammers.herokuapp.com/api/investors/MyRequests/all`,
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
        dispatch(setRequests(response.data));
      })
      .catch(error => {
        dispatch(error(error));
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };
};
export const fetchCompanies = token => {
  return dispatch => {
    dispatch(loading());
    fetch(
      `http://serverbrogrammers.herokuapp.com/api/investors/View/ViewCompanies`,
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
        dispatch(setCompanies(response.data));
      })
      .catch(error => {
        dispatch(error(error));
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };
};
export const fetchAllCompanies = () => {
  return dispatch => {
    dispatch(loading());
    fetch(`http://serverbrogrammers.herokuapp.com/api/company/`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setAllCompanies(response.data));
      })
      .catch(error => {
        dispatch(error(error));
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };
};
export const fetchProfile = (userId, token) => {
  return dispatch => {
    dispatch(loading(true));
    fetch(`http://serverbrogrammers.herokuapp.com/api/investors/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setUser(response.data));
        dispatch(loading(false));
      })
      .catch(error => {
        dispatch(error());
      });
  };
};
