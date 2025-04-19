import React, { createContext, useState, useEffect } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({type: ''});

  const fetchData = async (name) => {
    try{
      setLoading(true)
      if(name){
        const response = await fetch(`https://api.github.com/users/${name}`)
        const result = await response.json()
        setData(result)
        if (response.status === 404) {
          setError({ type: 'not-found' });
          setData(null);
        } else if (response.ok) {
          setError(null);
          setData(result);
        } else {
          setError({ type: 'another' });
          setData(null);
        }
        
      }
    }catch(error){
      setError(true)
    }
    finally{
      setLoading(false)
    }
    
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ApiContext.Provider value={{ data, fetchData, loading, error }}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext };