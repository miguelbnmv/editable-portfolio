import { initializeApp } from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import * as firebaseDatabase from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCCPPnWqDUTz5wtuMKDEMcaihQzMtTwoxw',
  authDomain: 'editable-portfolio.firebaseapp.com',
  projectId: 'editable-portfolio',
  databaseURL:
    'https://editable-portfolio-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: 'editable-portfolio.appspot.com',
  messagingSenderId: '680868035482',
  appId: '1:680868035482:web:7bfa9d200dd43851179823',
};

const app = initializeApp(firebaseConfig);

const auth = firebaseAuth.getAuth(app);
const database = firebaseDatabase.getDatabase(app);

const loginUser = async ({ loginEmail, loginPassword }) => {
  try {
    await firebaseAuth.signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
  } catch (err) {
    return err;
  }
};

const registerUser = async ({ registerEmail, registerPassword }) => {
  try {
    const res = await firebaseAuth.createUserWithEmailAndPassword(
      auth,
      registerEmail,
      registerPassword
    );
    const user = res.user;
    firebaseDatabase.set(firebaseDatabase.ref(database, 'users/' + user.uid), {
      registerEmail,
    });
  } catch (err) {
    return err;
  }
};

const logout = () => {
  firebaseAuth.signOut(auth);
};

export { app, auth, database, loginUser, registerUser, logout };
