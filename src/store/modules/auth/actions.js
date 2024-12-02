import * as types from '../types';

export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload
  };
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload
  };
}

export function loginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE,
    payload
  };
}

export function registerRequest(payload) {
  return {
    type: types.REGISTER_REQUEST,
    payload
  };
}

export function registerCreatedSuccess(payload) {
  return {
    type: types.REGISTER_CREATED_SUCCESS,
    payload
  };
}

export function createdNewContact(payload) {
  return {
    type: types.CREATED_NEW_CONTACT,
    payload
  };
}
export function createdNewContactSuccess(payload) {
  return {
    type: types.CREATED_NEW_CONTACT_SUCCESS,
    payload
  };
}
export function createdNewContactFailure(payload) {
  return {
    type: types.CREATED_NEW_CONTACT_FAILURE,
    payload
  };
}

export function updateContact(payload) {
  return {
    type: types.UPDATE_CONTACT,
    payload
  };
}

export function clicaBotaoFailure() {
  return {
    type: types.BOTAO_CLICADO_FAILURE
  };
}
