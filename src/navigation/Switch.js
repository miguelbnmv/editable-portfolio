import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivateRoute from 'navigation/components/PrivateRoute';

import Home from '../pages/home';
import Projects from '../pages/projects/projects-list';
import Project from '../pages/projects/project';
import Experience from '../pages/experience';
import Landing from '../pages/landing';

const Switch = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute isLogin>
            <Landing />
          </PrivateRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <PrivateRoute>
            <Projects />
          </PrivateRoute>
        }
      />
      <Route
        path="/projects/:projectId"
        element={
          <PrivateRoute>
            <Project />
          </PrivateRoute>
        }
      />
      <Route
        path="/experience"
        element={
          <PrivateRoute>
            <Experience />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default Switch;