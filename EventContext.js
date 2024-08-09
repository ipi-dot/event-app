import React, { createContext, useState, useEffect } from 'react';

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await fetch('/categories');
        const usersRes = await fetch('/users');
        
        if (!categoriesRes.ok || !usersRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const categoriesData = await categoriesRes.json();
        const usersData = await usersRes.json();
        
        setCategories(categoriesData);
        setUsers(usersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <EventContext.Provider value={{ categories, users, loading, error }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
