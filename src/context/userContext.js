import { createContext, useState } from 'react';
import { getDatabase, ref, get, onChildChanged } from 'firebase/database';
import { ref as sRef, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from 'firebase/auth';

import { auth, storage } from 'firebase/firebase.js';

export const Context = createContext({});

const UserContext = ({ children }) => {
  const [info, setInfo] = useState(null);
  const db = getDatabase();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      get(ref(db, '/users'))
        .then((user) => {
          if (!info && user.exists()) {
            const image = user?.val()[auth?.currentUser?.uid]?.info?.image;
            if (image) {
              getDownloadURL(sRef(storage, image))
              .then((url) => {
                setInfo({
                  info: user?.val()[auth?.currentUser?.uid],
                  id: auth?.currentUser?.uid,
                  image: url,
                });              })
              .catch((error) => {
                console.log(error);
              });
            } else {
              setInfo({
                info: user?.val()[auth?.currentUser?.uid],
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
    const image = user?.val()?.info?.image;
    if (image) {
      getDownloadURL(sRef(storage, image))
      .then((url) => {
        setInfo({
          info: user?.val(),
          id: auth?.currentUser?.uid,
          image: url,
        });          })
      .catch((error) => {
        console.log(error);
      });
    } else {
      setInfo({
        info: user?.val()[auth?.currentUser?.uid],
        id: auth?.currentUser?.uid,
      }); 
    }
  });

  return (
    <Context.Provider value={info ? info : null}>{children}</Context.Provider>
  );
};

export default UserContext;
