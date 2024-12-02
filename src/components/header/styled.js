import styled from 'styled-components';
import * as colors from '../../config/colors';
export const Nav = styled.nav`
  background-color: ${colors.primaryColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid rgba(160, 160, 160, 0.3);
  box-shadow: 0px 2px 8px 0px #fff;
`;

export const AddNewContato = styled.button`
  background: ${colors.errorColor};
  border-radius: 6px;
  padding: 14px;
  margin-left: 80px;
`;
export const ButtonLogout = styled.button`
  background: #41019b;
  border-radius: 6px;
  padding: 14px;
  margin-right: 80px;
`;
