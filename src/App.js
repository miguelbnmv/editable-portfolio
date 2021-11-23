import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Projects from './pages/projects/projects-list';
import Project from './pages/projects/project';
import Experience from './pages/experience';
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<Project />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
