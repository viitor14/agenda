import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmail, isNumeric } from 'validator';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import Loading from '../../components/loading';
import Header from '../../components/header';
import { Container } from '../../styles/GlobalStyles';
import { Title, Form, DivForm, FormLogin, DivFormLogin } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Contato({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');

  const idd = useSelector((state) => state.auth.user);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (id) {
      async function getData() {
        try {
          setIsloading(true);
          const { data } = await axios.get(`alunos/${id}`);
          setNome(data.nome);
          setSobrenome(data.sobrenome);
          setEmail(data.email);
          setTelefone(String(data.telefone));
          setIsloading(false);
        } catch (err) {
          var status = get(err, 'response.status', 0);
          const errors = get(err, 'response.data.errors', []);
          if (status === 400) errors.map((error) => toast.error(error));
          //history.goBack();
          setIsloading(true);
        }
      }
      getData();
    }
  }, [id]);

  const attempt = useSelector((state) => state.auth.attempt);
  function handleSubmitNewContato(e) {
    e.preventDefault();
    let formErrors = false;

    if (attempt > 2) {
      toast.error('Você foi desconectado por tentar forçar um erro');
      dispatch(actions.loginFailure());
      history.push('/');
      return;
    }

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }
    if (sobrenome.length < 3 || sobrenome.length > 255) {
      formErrors = true;
      toast.error('Sobrenome deve ter entre 3 e 255 caracteres');
    }
    if (!isNumeric(telefone) || telefone.length > 10) {
      formErrors = true;
      //Telefone não pode passar de 9 números
      if (telefone.length > 9) {
        toast.error('Telefone não pode conter mais de 10 números');
      }
      toast.error('Telefone inválido');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }

    if (formErrors) {
      dispatch(actions.createdNewContactFailure());
      return;
    }
    setIsloading(true);
    if (id) {
      dispatch(actions.updateContact({ id, nome, sobrenome, email, telefone: Number(telefone) }));
    } else {
      dispatch(actions.createdNewContact({ nome, sobrenome, email, telefone: Number(telefone) }));
    }
  }

  return (
    <div>
      <Loading isLoading={isLoading} />
      <Header />
      <Container>
        <Title>
          <Form onSubmit={handleSubmitNewContato}>
            <p>Preencha todas campos, para poder adicionar um novo contato!</p>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
              />
            </DivForm>

            <DivForm>
              <label htmlFor="telefone">Telefone</label>
              <input
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="999999999"
              />
            </DivForm>

            <button type="submit">{id ? 'Editar Contato' : 'Criar Contato'}</button>
          </Form>
        </Title>
      </Container>
    </div>
  );
}
Contato.propTypes = {
  match: PropTypes.shape({}).isRequired
};
