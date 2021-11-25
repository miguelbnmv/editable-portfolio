import { createContext } from 'react';

import Data from 'assets/json/user.json';

export const Context = createContext({});

const UserContext = ({ children }) => (
  <Context.Provider value={Data}>{children}</Context.Provider>
);

export default UserContext;
