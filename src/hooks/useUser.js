// src/hooks/useUser.js
/*
import { useEffect, useState } from 'react';
import axios from 'axios';

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/users/mi-pagina', {
      withCredentials: true
    })
    .then(res => setUser(res.data.datos))
    .catch(() => setUser(null));
  }, []);

  return user;
};
*/

import { useState, useEffect } from 'react';

export function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(false); // No logueado
      }
    } catch (error) {
      console.error('Error leyendo el usuario:', error);
      setUser(false);
    }
  }, []);

  return user;
}
