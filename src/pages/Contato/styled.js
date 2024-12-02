import styled from 'styled-components';

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  background-color: rgba(26, 0, 78, 1);
  border-radius: 8px;
  padding: 20px;
`;

export const Paragrafo = styled.p`
  font-size: 80px;
`;

export const Form = styled.form`
  display: flex;
  padding: 18px 16px;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 21px;
  border-radius: 6px;
  border: 2px solid rgba(255, 255, 255, 0.02);
  background: rgba(255, 255, 255, 0);
  box-shadow: 1px 4px 10px 0px #fff;
  max-width: 460px;
  height: 100%;
  align-items: flex-start;
  justify-content: center;

  button {
    align-self: center; /* Centraliza o botão horizontalmente */
  }
`;

export const FormLogin = styled.form`
  display: flex;
  padding: 18px 16px;
  flex-direction: column;
  justify-content: space-between;
  align-self: flex-start;
  align-items: center;
  border-radius: 6px;
  border: 2px solid rgba(255, 255, 255, 0.02);
  background: rgba(255, 255, 255, 0);
  box-shadow: 1px 4px 10px 0px #fff;
  height: 380px;
`;

export const DivForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  label {
    font-weight: 300;
  }

  input {
    width: 100%; /* Define 50% de largura para todos os inputs */
    height: 40px;
    border-radius: 8px;
    border: 1px solid #8f8f8f;
    background: rgba(0, 0, 0, 0.25);
    transition: all 0.8s ease;
    padding: 0 10px;

    &:focus {
      border: 1px solid #9a0680;
    }
  }
  &:nth-of-type(3) {
    width: 100%;
  }
`;

export const DivFormLogin = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  label {
    font-weight: 300;
  }

  input {
    width: 100%; /* Define 50% de largura para todos os inputs */
    height: 40px;
    border-radius: 8px;
    border: 1px solid #8f8f8f;
    background: rgba(0, 0, 0, 0.25);
    transition: all 0.8s ease;

    &:focus {
      border: 1px solid #9a0680;
    }
  }
`;
