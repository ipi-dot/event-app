import React, { createContext, useState, useEffect } from 'react';

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
    fetch('/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <EventContext.Provider value={{ categories, users }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
