import { createContext, useState } from 'react';
import { getDatabase, ref, get, onChildChanged } from 'firebase/database';
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
          if (!info && user.exists()) {
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

  onChildChanged(ref(db, '/users'), (user) => {
    setInfo({
      info: user?.val(),
      id: auth?.currentUser?.uid,
    });
  });

  return (
    <Context.Provider value={info ? info : null}>{children}</Context.Provider>
  );
};

export default UserContext;
