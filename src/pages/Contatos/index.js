import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom/';
import Swal from 'sweetalert2';

import Header from '../../components/header';
import Loading from '../../components/loading';
import { Container } from '../../styles/GlobalStyles';
import { succesColor, infoColor } from '../../config/colors';
import { Main, Panel, Paragrafo, DivContatos, ButtonView, LinkEdit, ButtonDelete } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Contatos() {
  const dispatch = useDispatch();
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await axios.get('/alunos');
        setAlunos(response.data);
        setIsLoading(false);
      } catch (e) {
        const errors = get(e, 'response.data.errors', []);
        const status = get(e, 'response.status', 0);
        if (status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Faça login para visualizar seus contatos'
          }).then((result) => {
            if (result.isConfirmed) {
              history.push('/');
              dispatch(actions.loginFailure());
            }
          });
        }
      }
    }
    getData();
  }, [dispatch]);

  const deleteContato = (e, id, index) => {
    Swal.fire({
      title: 'Você tem certeza que deseja apagar?',
      text: 'Depois que confirmar não tem como recuperar!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, quero apagar!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(e, id, index);
        Swal.fire({
          title: 'Apagado!',
          text: 'Seu contato foi apagado com sucesso.',
          icon: 'success'
        });
      }
    });
  };

  const handleDelete = async (e, id, index) => {
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const novosContatos = [...alunos];
      novosContatos.splice(index, 1);
      setAlunos(novosContatos);
      setIsLoading(false);
    } catch (err) {
      toast.error('Error ao tentar pagar contato');
    }
  };

  const newContato = () => {
    history.push('/Contato');
  };

  const mostrarDadosUsuario = (usuario) => {
    Swal.fire({
      title: 'Detalhes do Usuário',
      html: `
        <div style="text-align: left; font-size: 16px;">
          <p><strong>Nome:</strong> ${usuario.nome}</p>
          <p><strong>Sobrenome:</strong> ${usuario.sobrenome}</p>
          <p><strong>Email:</strong> ${usuario.email}</p>
          <p><strong>Telefone:</strong> ${usuario.telefone}</p>
        </div>
      `,
      icon: 'info', // Ícone informativo
      confirmButtonText: 'Fechar',
      confirmButtonColor: succesColor,
      background: '#f9f9f9'
    });
  };

  return (
    <div>
      <Loading isLoading={isLoading} />
      <Header
        styleBg={succesColor}
        onButtonClick={newContato}
        buttonText={'Adicionar novo contato'}
      />
      <Container>
        <Panel>
          <Main>
            <Paragrafo>Lista de contato {`#${alunos.length}`}</Paragrafo>
            <DivContatos>
              <ul>
                <li>Nº</li>
                <li>Nome</li>
                <li>E-mail</li>
                <li>Telefone</li>
                <li>Ações</li>
              </ul>

              {alunos.length > 0 ? (
                alunos.map((contato, index) => (
                  <ul key={String(contato.id)} className="body-contatos">
                    <li>{index + 1}</li>
                    <li>{`${contato.nome}  ${contato.sobrenome}`}</li>
                    <li>{contato.email}</li>
                    <li>{contato.telefone}</li>
                    <li>
                      <ButtonView onClick={() => mostrarDadosUsuario(contato)}>
                        Visualizar
                      </ButtonView>

                      <LinkEdit to={`/Contato/${contato.id}/editar`}>Editar</LinkEdit>

                      <ButtonDelete
                        onClick={(e) => deleteContato(e, contato.id, index)}
                        type="button">
                        Excluir
                      </ButtonDelete>
                    </li>
                  </ul>
                ))
              ) : (
                <Paragrafo>Nenhum aluno encontrado</Paragrafo>
              )}
            </DivContatos>
          </Main>
        </Panel>
      </Container>
    </div>
  );
}
