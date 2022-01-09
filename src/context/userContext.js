import { useEffect, createContext, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

import { auth } from 'firebase/firebase.js';

export const Context = createContext({});

const UserContext = ({ children }) => {
  const [info, setInfo] = useState(null);
  const db = getDatabase();

  useEffect(() => {
    onValue(ref(db, '/users'), (user) => {
      if (user && auth?.currentUser) {
        setInfo({
          info: user?.val()[auth?.currentUser?.uid],
          id: auth?.currentUser?.uid,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, auth?.currentUser]);

  return (
    <Context.Provider value={info ? info : null}>{children}</Context.Provider>
  );
};

export default UserContext;
