import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Matching } from './pages/Matching';
import { Matched } from './pages/Matched';
import { Received } from './pages/Received';
import { Chat } from './pages/Chat';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/match" element={<Matching />} />
        <Route path="/matched" element={<Matched />} />
        <Route path="/received" element={<Received />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;