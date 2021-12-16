import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

import { auth } from 'firebase/firebase.js';

const PrivateRoute = ({ children, isLogin }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return null;
  if (isLogin) return children;
  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
