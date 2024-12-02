import * as types from '../types';
import axios from '../../../services/axios';

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  token: false,
  user: {},
  attempt: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      newState.isLoading = false;
      return newState;
    }

    case types.LOGIN_FAILURE: {
      delete axios.defaults.headers.Authorization;
      const newState = { ...initialState };
      return newState;
    }

    case types.LOGIN_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }

    case types.REGISTER_REQUEST: {
      const newState = { ...initialState };
      newState.isLoading = true;
      return newState;
    }

    case types.REGISTER_CREATED_SUCCESS: {
      const newState = { ...initialState };
      return newState;
    }

    case types.CREATED_NEW_CONTACT: {
      const newState = { ...state };
      return newState;
    }

    case types.CREATED_NEW_CONTACT_SUCCESS: {
      const newState = { ...state };
      newState.attempt = 0;
      return newState;
    }

    case types.CREATED_NEW_CONTACT_FAILURE: {
      const newState = { ...state };
      newState.attempt++;
      return newState;
    }

    case types.UPDATE_CONTACT: {
      const newState = { ...state };
      newState.attempt = 0;
      return newState;
    }

    default:
      return state;
  }
}
