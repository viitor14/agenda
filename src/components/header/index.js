import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Nav, AddNewContato, ButtonLogout } from './styled';

import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import { toast } from 'react-toastify';
export default function Header({ buttonText, onButtonClick, styleBg }) {
  const dispatch = useDispatch();

  const handleBackClick = () => {
    if (onButtonClick) {
      onButtonClick(); // Executa a função personalizada, se passada
    } else {
      history.push('/Contatos'); // Volta para a página anterior, função padrão
    }
  };

  const logout = () => {
    dispatch(actions.loginFailure());
    history.push('/');
    toast.error('Você foi desconectado');
  };

  return (
    <Nav>
      <AddNewContato style={{ backgroundColor: styleBg }} onClick={handleBackClick}>
        {buttonText || 'Voltar'}
      </AddNewContato>
      <ButtonLogout onClick={logout}>Sair</ButtonLogout>
    </Nav>
  );
}

Header.propTypes = {
  styleBg: PropTypes.string, // Garante que buttonText é uma string
  buttonText: PropTypes.string, // Garante que buttonText é uma string
  onButtonClick: PropTypes.func // Garante que onButtonClick é uma função e é obrigatório
};
