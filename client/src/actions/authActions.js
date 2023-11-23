// src/actions/authActions.js
import authService from '../services/authService';

export const login = (userData) => async (dispatch) => {
  dispatch({ type: 'AUTH_REQUEST' });

  try {
    const response = await authService.login(userData);
    dispatch({ type: 'AUTH_SUCCESS', payload: response });
  } catch (error) {
    dispatch({ type: 'AUTH_FAILURE', payload: error.response.data });
  }
};

export const register = (userData) => async (dispatch) => {
  dispatch({ type: 'AUTH_REQUEST' });

  try {
    const response = await authService.register(userData);
    dispatch({ type: 'AUTH_SUCCESS', payload: response });
  } catch (error) {
    dispatch({ type: 'AUTH_FAILURE', payload: error.response.data });
  }
}

export const logout = () => {
  authService.logout();
  return { type: 'LOGOUT' };
};
