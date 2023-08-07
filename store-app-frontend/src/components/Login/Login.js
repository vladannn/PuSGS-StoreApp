import React, { useContext, useState } from "react";
import { Container, Paper, Avatar, Typography, Box, Link, Grid, Button, TextField, ThemeProvider } from "@mui/material";
import { LockOutlined } from '@mui/icons-material';
import theme from "../../layout/Theme";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../../context/auth-context";
import { toast } from "react-toastify";

function Login(){
  const navigate = useNavigate();
  const authContext= useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const googleLoginHandler = async (response) => {
    try {
      const token = response.credential;
      await authContext.googleLogin(token);
    } catch (error) {
      alert(error.response);
    }
  };

  const validate=()=>{
    if(email===""){
      toast.error("Please enter your email!");
      return false;
    }
    else if(!emailRegex.test(email))
    {
      toast.error("Please enter valid email!");
      return false;
    }

    if(password==="")
    {
      toast.error("Please enter your password!");
      return false;
    }
    else if(password.trim().length<6)
    {
      toast.error("Password has at least 6 characters!");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(validate()){
      try{
        const data = new FormData(event.currentTarget);
        await authContext.onLogin(data);
      }
      catch(e){
        console.log(e);
      }
    }
    else{
      return
    }

    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component={Paper} maxWidth='sm' sx={{mr: 36, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 13}}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(event)=> setEmail(event.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              label="Password"
              type="password"
              onChange={(event)=> setPassword(event.target.value)}
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            </Box>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" onClick={()=> navigate('/register')}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid><br/>
            <Grid>
            <GoogleLogin onSuccess={googleLoginHandler} onError={e => alert("Login Failed.")} />
            </Grid>
          
      </Container>
      </ThemeProvider>
  );
}

export default Login;