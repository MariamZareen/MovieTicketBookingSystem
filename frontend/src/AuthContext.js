import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState(null);

  const loginHandler = (userEmail) => {
    setLogin(true);
    setEmail(userEmail);
  };

  const logoutHandler = () => {
    setLogin(false);
    setEmail(null);
  };
 console.log(email,"this is from autentication page")
  return (
    <AuthContext.Provider value={{ login, email, loginHandler, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
