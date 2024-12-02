import styled from 'styled-components';
import * as colors from '../../config/colors';
import { Link } from 'react-router-dom';

export const Panel = styled.div`
  background: ${colors.primaryColor};
  border-radius: 10px;
`;

export const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(21, 0, 64, 0);
  border-radius: 8px;
  padding: 0px;
  min-width: 80vw;
`;

export const Paragrafo = styled.p`
  text-align: start;
  padding: 10px 0 10px 40px;
  font-weight: 700;
  background-color: rgba(21, 0, 80, 0.5);
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const DivContatos = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  ul {
    margin: 2px 24px;
    display: flex;
    gap: 10px;
    border-radius: 10px;
  }

  ul.body-contatos li:last-child {
    display: flex;

    gap: 8px;
  }

  li {
    display: flex;
    flex: 1;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: 10px 30px;
    background: rgba(65, 1, 155, 0.2);
    border-radius: 6px;
    border: 1px solid #444;
    font-weight: 800;
  }
`;

export const LinkEdit = styled(Link)`
  color: ${colors.textColor};
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
  background: ${colors.succesColor};
  font-size: 13.33px;
`;

export const ButtonView = styled.button`
  background-color: ${colors.infoColor};
`;
export const ButtonEdit = styled.button`
  background-color: ${colors.succesColor};
`;
export const ButtonDelete = styled.button`
  background-color: ${colors.errorColor};
`;
