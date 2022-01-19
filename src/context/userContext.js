import { createContext, useState, useEffect } from 'react';
import { getDatabase, ref, get, onChildChanged } from 'firebase/database';
import { ref as sRef, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';

import { auth, storage } from 'firebase/firebase.js';

export const Context = createContext({});

const UserContext = ({ children }) => {
  const db = getDatabase();
  const [id, setId] = useState();
  const [flag, setFlag] = useState(false);
  const [info, setInfo] = useState();

  if (id && !flag) {
    setInfo();
    setFlag(true);
    get(ref(db, '/users')).then((user) => {
      const temp = Object.values(user.val()).find(({ info }) => {
        return id !== undefined && info?.username === id;
      });
      if (temp !== undefined) {
        if (temp?.info?.image && !temp?.info.image !== null) {
          getDownloadURL(sRef(storage, temp?.info?.image)).then((url) => {
            setInfo({
              info: temp,
              id: auth?.currentUser?.uid,
              image: url,
              setId: setId,
            });
          });
        } else {
          setInfo({
            info: temp,
            id: auth?.currentUser?.uid,
            setId: setId,
          });
        }
      }
    });
  }

  onAuthStateChanged(auth, (user) => {
    if (user && !id) {
      get(ref(db, '/users'))
        .then((user) => {
          if (flag && !id) {
            setInfo();
          }
          if (!info && user.exists() && !id) {
            const userInfo = user?.val()[auth?.currentUser?.uid];
            if (userInfo?.info?.image && !userInfo?.info.image !== null) {
              getDownloadURL(sRef(storage, userInfo?.info?.image)).then(
                (url) => {
                  setInfo({
                    info: userInfo,
                    id: auth?.currentUser?.uid,
                    image: url,
                    setId: setId,
                  });
                  setFlag(false);
                }
              );
            } else {
              setInfo({
                info: userInfo,
                id: auth?.currentUser?.uid,
                setId: setId,
              });
              setFlag(false);
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
          setId: setId,
        });
      });
    } else {
      setInfo({
        info: user?.val(),
        id: auth?.currentUser?.uid,
        setId: setId,
      });
    }
  });

  useEffect(() => {
    if (auth?.current) {
      setInfo();
    } else {
      setInfo({ setId: setId });
    }
  }, []);

  return (
    <Context.Provider value={info ? info : null}>{children}</Context.Provider>
  );
};

export default UserContext;
