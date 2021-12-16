import React from 'react';
import { Helmet } from 'react-helmet';

import UserContext from 'context/userContext';
import Switch from 'navigation/Switch';

import './styles/global.scss';

function App() {
  return (
    <UserContext>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Editable Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Switch />
    </UserContext>
  );
}

export default App;
