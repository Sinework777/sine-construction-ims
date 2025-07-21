import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('sessionUser'));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  function login(userObj) {
    setUser(userObj);
    setIsLoggedIn(true);
    localStorage.setItem('sessionUser', JSON.stringify(userObj));
  }

  function logout() {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('sessionUser');
  }

  function getUser() {
    return user;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export { AuthContext };
