import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects/ProjectsList';
import Experience from './pages/Experience';

function App() {
  console.log(Home);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;