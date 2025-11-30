import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './pages/Home.jsx';
import Tips from './pages/Tips.jsx';
import ClipboardSuggestions from './pages/ClipboardSuggestions.jsx';
import FirstDates from './pages/FirstDates.jsx';
import Chat from './pages/Chat.jsx';
import GiftSuggestions from './pages/GiftSuggestions.jsx';
import FestiveDates from './pages/FestiveDates.jsx';
import SubscriptionSuccess from './pages/SubscriptionSuccess.jsx';
import SubscriptionCancel from './pages/SubscriptionCancel.jsx';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/clipboard" element={<ClipboardSuggestions />} />
          <Route path="/firstdates" element={<FirstDates />} />
          <Route path="/festivedates" element={<FestiveDates />} />
          <Route path="/gifts" element={<GiftSuggestions />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/subscription/success" element={<SubscriptionSuccess />} />
          <Route path="/subscription/cancel" element={<SubscriptionCancel />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

