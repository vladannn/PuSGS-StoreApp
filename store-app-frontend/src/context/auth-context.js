import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const[loggedIn, setLoggedIn]= useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
      if(token===null || token==="")
    {
      setLoggedIn(false);
    }
    else
    {
      setLoggedIn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

 

  const login = async (data) => {
    try{
      const response = await axios.post(`${process.env.REACT_APP_API_URL}users/login`, data, {headers: {"Content-Type": "multipart/form-data"}});
        if(response.status===200){

        setToken(response.data);
        setLoggedIn(true);
        localStorage.setItem('token', response.data);
        navigate('/profile');
        }
        else{
          alert(response.data);
        }
      }
      catch(error)
      {
          alert(error.response.data);
      }
  };

  const isTokenExpired = (token) => {
    if (!token) {
      return true;
    }
  
    try {
      const tokenDecoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
  
      return tokenDecoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  const googleLogin = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}users/google-login`, {token: data.credential});
      if(!response){
        return
      }
      setToken(response.data.result);
      setLoggedIn(true);
      localStorage.setItem('token', response.data.result);
      console.log(response.data.result);
      navigate('/profile');

    } catch (error) {
      alert(error.response.data.Exception);
    }
  };

  const typeOfUser = ()=>{
      try 
      {
        if(!token)
            return null;
        const tokenDecoded = jwtDecode(token);
        return tokenDecoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      } 
      catch(e) 
      {
        console.log(e);
      }
  }

  const logout =()=>{
    localStorage.clear();
    setLoggedIn(false);
    setToken(null);
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{token: token, onLogin: login, onGoogleLogin: googleLogin, onLogout: logout, loggedIn: loggedIn, onUserType: typeOfUser, onIsTokenExpired: isTokenExpired }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
