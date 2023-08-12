import theme from "../../layout/Theme";
import { Grid, Container, Avatar, ThemeProvider, Button, TextField, Box, Typography, Paper } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import userService from "../../services/UserService";

function Profile(){
    const navigate = useNavigate();
    const minDate = dayjs('1920-01-01');
    const maxDate = dayjs().subtract(18, 'year');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    var flag = 0;
    const [data, setData] = useState({
        username: '',
        password: '',
        password2: '',
        email: '',
        fullName: '',
        birthday: '',
        address: '',
        imageFile: '',
        image: ''
      });
  
    useEffect(()=>{
        userService.getUserUpdate().then((response)=>{
            console.log(response);
            setData({
                ...data,
                username: response.username,
                fullName: response.fullName,
                email: response.email,
                address: response.address,
                image: response.userImage,
                birthday: response.birthday
            }
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const convertImage = (img) => {
        return `data:image/jpg;base64,${img}`;
      };

      const validate=()=>{

        if(data.fullName===""){
          toast.error("Enter your full name!");
          flag=1;
          return
        }
        else if(data.fullName.trim().length<2)
        {
          toast.error("Your full name can't have less than 2 characters!");
          flag=1;
          return
        }
  
        if(data.username===""){
          toast.error("Enter your username!");
          flag=1;
          return
        }
        else if(!usernameRegex.test(data.username)){
          toast.error("Enter valid username(Between 3 and 20 characters)!");
          flag=1;
          return
        }
  
        if(data.email===""){
          toast.error("Enter your email!");
          flag=1;
          return
        }
        else if(!emailRegex.test(data.email)){
          toast.error("Enter valid email");
          flag=1;
          return
        }
  
        if(data.password===""){
          toast.error("Enter your password!");
          flag=1;
          return
        }
        else if(data.password.trim().length<6)
        {
          toast.error("Password has at least 6 characters!");
          flag=1;
        }
  
        if(data.password2===""){
          toast.error("Confirm password you have entered before!");
          flag=1;
          return
        }
        else if(data.password!==data.password2)
        {
          toast.error("Passwords do not match!");
          flag=1;
          return
        }
  
        if(data.typeOfUser===""){
          toast.error("Please select your role on this app!");
          flag=1;
          return
        }
  
        if(data.birthday==="" || data.birthday===null)
        {
          toast.error("Select your day of birth!");
          flag=1;
          return
        }
  
        if(data.address===""){
          toast.error("Please enter your address!");
          flag=1;
          return
        }
      }

    const handleSubmit=(event)=>{
        event.preventDefault();

        validate();

        if(flag===0)
        {
            const formData= new FormData();
            formData.append("username", data.username);
            formData.append("password", data.password);
            formData.append("email", data.email);
            formData.append("fullname", data.fullName);
            formData.append("birthday", data.birthday);
            formData.append("address", data.address);
            data.imageFile && formData.append("imageFile", data.imageFile);

            userService.setUserUpdate(formData).then((res) => {
              console.log(res);
            if(res.data==='' || res.data===null)
            {
                alert("Succesfully updated your profile");
            }
            else{
                alert(res.data);
            }
        });
            navigate("/profile");
        }
        else{
            return;
        }
    }

    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.name]: event.target.value,
        })
    }

    const birthdayHandleChange=(name, value)=>{
        setData({
            ...data,
            [name]: value,
        });
    }

    return (
        <ThemeProvider theme={theme}>
          <Container component={Paper} maxWidth='sm' sx={{mr: 36, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2}}>
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlined />
              </Avatar>
              <Typography component="h1" variant="h5">
                Your Profile
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="fullName"
                      required
                      fullWidth
                      id="fullName"
                      label="Full Name"
                      value={data.fullName || ''}
                      autoFocus
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      value={data.username}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="New Password"
                      type="password"
                      id="password"
                      value={data.password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password2"
                      label="Confirm password"
                      type="password"
                      id="password2"
                      value={data.password2}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          label="Birthday"
                          minDate={minDate}
                          maxDate={maxDate}
                          value={dayjs(data.birthday)}
                          onChange={(value) => {
                            if (value instanceof dayjs) {
                              birthdayHandleChange("birthday", value.toISOString()); // Pretvaranje u ISO string da bi se poslalo na backend
                            } else {
                              birthdayHandleChange("birthday", ""); // Postavljanje na prazan string ako je vrednost null ili neki drugi nevažeći tip
                            }
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      onChange={handleChange}
                      name="address"
                      value={data.address}
                      label="Address"
                      id="address"
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      title="Image"
                      width={200}
                      height={100}
                      alt="Add"
                      src={data.imageFile ? URL.createObjectURL(data.imageFile) : data.image && convertImage(data.image)}
                      
                    />
                    <span style={{ marginRight: "10px" }}>
                      <input
                        type="file"
                        name="imageFile"
                        id="imageFile"
                        accept="image/jpg"
                        onChange={(e) => {
                          console.log(e);
                          setData({ ...data, imageFile: e.target.files[0] });
                        }}
                      />
                    </span>
                  </div>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Box>
              </Container>
        </ThemeProvider>
      );
    }
    
export default Profile;