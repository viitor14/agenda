import { styled, createGlobalStyle } from 'styled-components';
import '@fontsource-variable/quicksand';

import * as colors from '../config/colors';
import { media } from '../config/response';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  :root{
    --toastify-icon-color-success: white;
    --toastify-icon-color-error: white;
  }

  * {
    margin:0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
    font-family: 'Quicksand Variable',sans-serif;
  }

  body{
    background-color: ${colors.primaryColor};
    color: ${colors.textColor};

  }


  html, body, #root{

  }

  button {
    cursor: pointer;
    background: ${colors.buttonStandardColor};
    border: none;
    color: ${colors.textColor};
    padding: 10px 20px;
    border-radius: 8px ;
    font-weight: bold;
  }

  input{
    color: ${colors.textColor};
    font-size: 16px;

  }

  a{
    text-decoration: none;
    color: ${colors.primaryColor};
  }

  ul {
    list-style: none;
  }

  //Mudar css do Toastify
  body .Toastify .Toastify__toast-container .Toastify__toast--success{
    background: ${colors.succesColor};
    color: #fff;
  }

  .Toastify__progress-bar--success {
  background: white;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--error{
    background: ${colors.errorColor};
    color: #fff;
  }

  .Toastify__progress-bar--error {
    background: white;
  }

  .swal2-confirm.swal2-styled{
    background: ${colors.errorColor}
  }

  .swal2-cancel.swal2-styled{
    background: ${colors.infoColor}
  }
`;

export const Container = styled.div`
  position: relative;
  width: fit-content;
  background: rgba(26, 0, 78, 0.56); /* Fundo principal */
  margin: 200px auto;
  padding: 2px;
  border-radius: 4px;
  z-index: 1; /* Garante que o conteúdo fique acima do ::before */

  &::before {
    content: '';
    position: absolute;
    top: -1px; /* Compensa a espessura da borda */
    left: -0px;
    right: -0px;
    bottom: -0px;
    border-radius: 10px; /* Maior que o do conteúdo para ficar "fora" */
    background: linear-gradient(to top, #834ee9, rgba(251, 0, 255, 0.14)); /* Gradiente da borda */
    z-index: -1; /* Coloca o ::before atrás do Container */
  }

  @media ${media.tablet} {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
  }
`;
