import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import history from '../../../services/history';

import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));
    toast.success('Você fez login');
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    //Configura o token como um cabeçalho padrão para todas requisições

    history.push('/Contatos');
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 0) {
      toast.error(
        'Estamos tendo dificuldades para conectar ao servidor. Tente novamente em alguns minutos.',
        {
          autoClose: 30000
        }
      );
    } else {
      toast.error('Usuário ou senha inválidos');
    }

    //toast.error('Usuário ou senha inválidos');
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/users', payload);
    //Faz com que o SAGA ouça a requisção que foi chamada no Login
    toast.success('Cadastro realizado com sucesso');
    toast.success('Faça Login!');
    yield put(actions.registerCreatedSuccess(payload));
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);
    toast.error(errors[0]);
    yield put(actions.loginFailure());
  }
}

function* createdNewContact({ payload }) {
  try {
    const { nome, sobrenome, email, telefone } = payload;

    const response = yield call(axios.post, '/alunos', {
      nome,
      sobrenome,
      email,
      telefone
    });

    //Faz com que o SAGA ouça a requisção que foi chamada no Login
    toast.success('Contato adicionado com sucesso');
    yield put(actions.createdNewContactSuccess(payload));
    history.push('/Contatos');
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);
    toast.error(errors[0]);
    yield put(actions.loginFailure());
    history.push('/');
  }
}

function* updateContact({ payload }) {
  try {
    const { nome, sobrenome, email, telefone, id } = payload;

    const response = yield call(axios.put, `/alunos/${id}`, {
      nome,
      sobrenome,
      email,
      telefone
    });

    //Faz com que o SAGA ouça a requisção que foi chamada no Login
    toast.success('Contato atualizado com sucesso');
    yield put(actions.createdNewContactSuccess(payload));
    history.push('/Contatos');
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);
    toast.error(errors[0]);
    yield put(actions.loginFailure());
    history.push('/');
  }
}

//takeLatest - Caso o usúario clique varias vezes no botão, só vai pegar o ultimo click
export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
  takeLatest(types.CREATED_NEW_CONTACT, createdNewContact),
  takeLatest(types.UPDATE_CONTACT, updateContact)
]);

//call - chama função assicrona
//put - disparar uma action
//all - Permite colocar mais de uma action
//takeLatest - Caso o usúario clique varias vezes no botão, só vai pegar o ultimo click
