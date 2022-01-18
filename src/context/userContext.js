import { createContext, useState } from 'react';
import { getDatabase, ref, get, onChildChanged } from 'firebase/database';
import { ref as sRef, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';

import { auth, storage } from 'firebase/firebase.js';

export const Context = createContext({});

const UserContext = ({ children }) => {
  const [info, setInfo] = useState(null);
  const db = getDatabase();

  onAuthStateChanged(auth, (user) => {
    console.log('entrou')
    if (user) {
      get(ref(db, '/users'))
        .then((user) => {
          if (!info && user.exists()) {
            const userInfo = user?.val()[auth?.currentUser?.uid];
            console.log(2, userInfo)
            if (userInfo?.info?.image && ! userInfo?.info.image !== null) {
              getDownloadURL(sRef(storage, userInfo?.info?.image)).then(
                (url) => {
                  setInfo({
                    info: userInfo,
                    id: auth?.currentUser?.uid,
                    image: url,
                  });
                }
              );
            } else {
              setInfo({
                info: userInfo,
                id: auth?.currentUser?.uid,
              });
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  onChildChanged(ref(db, '/users'), (user) => {
    if (user?.val().info?.image !== '') {
      getDownloadURL(sRef(storage, user?.val().info?.image)).then((url) => {
        setInfo({
          info: user?.val(),
          id: auth?.currentUser?.uid,
          image: url,
        });
      });
    } else {
      setInfo({
        info: user?.val(),
        id: auth?.currentUser?.uid,
      });
    }
  });

  return (
    <Context.Provider value={info ? info : null}>{children}</Context.Provider>
  );
};

export default UserContext;
