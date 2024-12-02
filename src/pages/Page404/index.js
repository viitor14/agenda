import React from 'react';

import { Container } from '../../styles/GlobalStyles';
import Header from '../../components/header';
export default function Page404() {
  return (
    <div>
      <Header />
      <Container>
        <h1>Essa pagina não existe</h1>
      </Container>
    </div>
  );
}
