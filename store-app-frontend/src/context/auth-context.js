import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const login = async (data) => {
    try{
      const response = await axios.post(`${process.env.REACT_APP_API_URL}users/login`, data, {headers: {"Content-Type": "multipart/form-data"}});
      if(!response){
        return
      }

      setToken(response.data);
      localStorage.setItem('token', response.data);
      navigate('/home');

      }
      catch(error)
      {
          console.error(error);
      }
  };

  const googleLogin = async (prop) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}users/google-login`, prop, {headers: {"Content-Type": "application/json"}});
      if(!response){
        return
      }
      setToken(response.data);
      localStorage.setItem('token', response.data);
      navigate('/');

    } catch (error) {
      alert(error.response.data.Exception);
    }
  };

  const logout =()=>{
    localStorage.clear();
    setToken(null);
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{token: token, onLogin: login, googleLogin: googleLogin, onLogout: logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
