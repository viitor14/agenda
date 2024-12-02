import React from 'react';
import { Switch } from 'react-router-dom';
import { toast } from 'react-toastify';

import Contatos from '../pages/Contatos';
import Contato from '../pages/Contato';
import MyRoute from './MyRoute';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Login} />
      <MyRoute exact path="/Contatos" component={Contatos} isClosed={false} />
      <MyRoute exact path="/Contato" component={Contato} isClosed={false} />
      <MyRoute exact path="/Contato/:id/editar" component={Contato} isClosed={false} />

      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
