import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EventsPage from './components/EventsPage';
import EventPage from './components/EventPage';
import EventProvider from './context/EventContext';

function App() {
  return (
    <EventProvider>
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/event/:id" element={<EventPage />} />
      </Routes>
    </EventProvider>
  );
}

export default App;
