import { createContext, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from 'firebase/firebase.js';

export const Context = createContext({});

const UserContext = ({ children }) => {
  const [info, setInfo] = useState(null);
  const db = getDatabase();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      get(ref(db, '/users'))
        .then((user) => {
          if (user.exists()) {
            setInfo({
              info: user?.val()[auth?.currentUser?.uid],
              id: auth?.currentUser?.uid,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  return (
    <Context.Provider value={info ? info : null}>{children}</Context.Provider>
  );
};

export default UserContext;
