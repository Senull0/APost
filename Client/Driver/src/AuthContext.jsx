import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? { token: storedToken } : '';
  });

  const login = ({ username, token }) => {
    localStorage.setItem('token', token);
    setUser({ username, token });
  };

  const logout = () => {
    setUser('');
  };

  const refreshToken = () => {
    console.log('Refreshing user token...');
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('token', user.token);
    } else if (user == '') {
      localStorage.removeItem('token');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
