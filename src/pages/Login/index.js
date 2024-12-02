import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import Loading from '../../components/loading';
import { Container } from '../../styles/GlobalStyles';
import { Title, Form, DivForm, FormLogin, DivFormLogin } from './styled';
import * as actions from '../../store/modules/auth/actions';

export default function Login() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordEqual, setNewPasswordEqual] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.auth.isLoading);

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha inválida');
    }

    if (formErrors) return;
    dispatch(actions.loginRequest({ email, password }));
  };

  function handleSubmitRegister(e) {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }
    if (sobrenome.length < 3 || sobrenome.length > 255) {
      formErrors = true;
      toast.error('Sobrenome deve ter entre 3 e 255 caracteres');
    }
    if (!isEmail(newEmail)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }

    if (newPassword.length < 6 || newPassword.length > 50) {
      formErrors = true;
      toast.error('Senha deve ter entre 3 e 50 caracteres');
    }

    if (newPassword !== newPasswordEqual) {
      formErrors = true;
      toast.error('Senhas não coincidem');
    }
    if (formErrors) return;
    dispatch(actions.registerRequest({ nome, email: newEmail, password: newPassword }));

    setNewEmail('');
    setNewPassword('');
    setNewPasswordEqual('');
  }
  return (
    <div>
      <Loading isLoading={isLoading} />
      <Container>
        <Title>
          <Form onSubmit={handleSubmitRegister}>
            <p>Crie sua conta para poder registrar seus contatos particular</p>
            <DivForm>
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder=""
              />
            </DivForm>

            <DivForm>
              <label htmlFor="sobrenome">Sobrenome</label>
              <input
                type="text"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                placeholder=""
              />
            </DivForm>

            <DivForm>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder=""
              />
            </DivForm>

            <DivForm>
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder=""
              />
            </DivForm>

            <DivForm>
              <label htmlFor="confirmar senha">Confirmar senha</label>
              <input
                type="password"
                value={newPasswordEqual}
                onChange={(e) => setNewPasswordEqual(e.target.value)}
                placeholder="Repita Senha"
              />
            </DivForm>

            <button type="submit">Criar conta</button>
          </Form>

          <FormLogin onSubmit={handleSubmitLogin}>
            <p>Faça login para visualizar seus registros.</p>

            <div style={{ width: '100%' }}>
              <DivFormLogin>
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                />
              </DivFormLogin>

              <DivFormLogin>
                <label htmlFor="senha">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=""
                />
              </DivFormLogin>
            </div>

            <button type="submit">Fazer Login</button>
          </FormLogin>
        </Title>
      </Container>
    </div>
  );
}
