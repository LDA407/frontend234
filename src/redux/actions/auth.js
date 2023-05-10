import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  LOGOUT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIL
} from './types';
import { setAlert } from './alert';
import axios from 'axios';


export const check_authenticated = () => async dispatch => {
  if(localStorage.getItem('access')){
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };
    const body = JSON.stringify({token: localStorage.getItem('access')});

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
          body,
          config
      )
      
      if (res.status === 200) {
        dispatch({
          type: AUTHENTICATED_SUCCESS
        });
      } else {
      dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    } 
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
}


export const signup = (full_name, email, password, re_password) => async dispatch => {
  dispatch({ type: SET_AUTH_LOADING })
  const config = {
    headers: {'Content-Type': 'application/json'},
  };
  const body = JSON.stringify({
    full_name, email, password, re_password,
  })
  
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/`, body, config
    );
    
    if (res.status === 201) {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
      dispatch(setAlert('Te enviamos un correo para que actives tu cuenta', 'green'))
    } else {
      dispatch({
        type: SIGNUP_FAIL,
      });
      dispatch(setAlert('Ups! algo salio mal... por favor, intentalo de nuevo mas tarde.', 'red'))
    }
    dispatch({
      type: REMOVE_AUTH_LOADING
    })
  } catch (e) {
    dispatch({
      type: SIGNUP_FAIL,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING
    })
    dispatch(setAlert('Error conectando con el servidor', 'red'))
  }
};


export const load_user = () => async dispatch =>{
  if(localStorage.getItem('access')){
    const config ={
      headers: {
        'Authorization' : `JWT ${localStorage.getItem('access')}`,
        'Accept' : 'application/json'}
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`,
          config
      )
      
      if (res.status === 200) {
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: res.data 
        });
      } else {
        dispatch({
          type: USER_LOADED_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    } 
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
}


export const login = (email, password) => async dispatch => {
  dispatch({
    type: SET_AUTH_LOADING
  })
  const config = {
    headers: {
      'Content-Type': 'application/json'
  }};
  const body = JSON.stringify({email, password});

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
        body,
        config
    );
    
    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(load_user())
      dispatch({
        type: REMOVE_AUTH_LOADING
      })
      dispatch(setAlert('Inicio de sesión con éxito', 'green'));
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING
      })
      dispatch(setAlert('Ups!!! Algo sali... intenta mas tarde', 'red'))
    }
  } catch (e) {
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING
    });
    dispatch(setAlert('Error al conectar con el servidor', 'red'))
  }
}


export const activate = (uid, token ) => async dispatch => {
  dispatch({ type: SET_AUTH_LOADING })
  const config = {
    headers: { 'Content-Type': 'application/json' }
  }

  const body = JSON.stringify({ uid, token })

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
        body,
        config
    );
    
    if (res.status === 204) {
      dispatch({
        type: ACTIVATION_SUCCESS,
      });
      dispatch(setAlert('Cuenta activada correctamente', 'green'))
    } else {
      dispatch({
        type: ACTIVATION_FAIL,
      });
      dispatch(setAlert('Ups!!! Algo salio... intenta mas tarde', 'red'))
    }
    dispatch({
      type: REMOVE_AUTH_LOADING
    })
  } catch (e) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING
    })
    dispatch(setAlert('Error al conectar con el servidor', 'red'))
  }
}


export const refresh_token = () => async dispatch => {
  if(localStorage.getItem('refresh')){
    const body = JSON.stringify({refresh: localStorage.getItem('refresh')});
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`,
          body,
          config
      )
      
      if (res.status === 200) {
        dispatch({
          type: REFRESH_SUCCESS,
          payload: res.data
        });
      } else {
        dispatch({
          type: REFRESH_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: REFRESH_FAIL,
      });
    } 
  } else {
    dispatch({
      type: REFRESH_FAIL,
    });
  }
}


export const reset_password = ( email ) => async dispatch => {
  dispatch({
    type: SET_AUTH_LOADING,
  });
  const body = JSON.stringify({ email });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
  };
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config 
    )
    if (res.status === 204) {
      dispatch({
        type: RESET_PASSWORD_SUCCESS
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    } else {
      dispatch({
        type: RESET_PASSWORD_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
    });
  }
}


export const reset_password_confirm = ( uid, token, new_password, re_new_password ) => async dispatch => {
  dispatch({
    type: SET_AUTH_LOADING,
  });
  const body = JSON.stringify({ uid, token, new_password, re_new_password })
  const config = {
    headers : {
      'Content-Type' : 'application/json'
  }}
  if(new_password !== re_new_password) {
    dispatch({
      type: RESET_PASSWORD_CONFIRM_FAIL, 
    });
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
    dispatch(setAlert('Password do not match', 'red'));
  } else {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
        body,
        config
      );
      if (res.status === 204) {
        dispatch({
          type: RESET_PASSWORD_CONFIRM_SUCCESS
        });
        dispatch({
          type: REMOVE_AUTH_LOADING,
        });
        dispatch(setAlert('Password has been reset successfully', 'green'));
      } else {
        dispatch({
          type: RESET_PASSWORD_CONFIRM_FAIL,
        });
        dispatch({
          type: REMOVE_AUTH_LOADING,
        });
        dispatch(setAlert('Error reseting your password', 'red'));
      }
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_CONFIRM_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      dispatch(setAlert('Error reseting your password', 'red'));
    }
  }
}


export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT,
  });
  dispatch(setAlert('logout', 'red'))
}