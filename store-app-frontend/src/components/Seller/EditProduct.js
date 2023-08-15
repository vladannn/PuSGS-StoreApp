import { Avatar, ThemeProvider, Box, Typography, Paper, Grid, Container, Button, TextField } from "@mui/material";
import theme from "../../layout/Theme";
import { LockOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import sellerService from "../../services/SellerService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () =>{
    const [data, setData] = useState({
        name: '',
        price: 0,
        amount: 0,
        description: '',
        image: '',
        imageFile: ''
      });

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    const convertImage = (img) => {
        return `data:image/jpg;base64,${img}`;
    };

    const handleChange = (event) =>{
        setData({
            ...data,
            [event.target.name]: event.target.value,
    })
    }

    const handleSubmit = (event)=>{
        event.preventDefault();

        if (!data.name || !data.price || !data.description || !data.amount) {
            toast.error("All fields are required");
            return;
        }

        if (!data.amount || data.amount <= 0) {
            toast.error("Amount must be over 0.");
            return;
        }

        if (!data.amount || !parseInt(data.amount)) {
            toast.error("Amount is integer");
            return;
        }
      
        if (!data.price || data.price <= 0) {
            toast.error("Price must be over 0.");
            return;
        }

        if (!data.price || !parseFloat(data.price)) {
            toast.error("Price is floater");
            return;
        }

        const formData= new FormData();
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("amount", data.amount);
        formData.append("description", data.description);
        data.imageFile && formData.append("imageFile", data.imageFile);
        sellerService.editProduct(id, formData).then(
            (res)=>{
                if(res!=null)
                {
                    setData(res);
                    alert("Succesfully updated!");
                }
            }
        );
    }

    useEffect(()=>{
        sellerService.getProduct(id).then(
            (res)=>{
                if(res!=null)
                {
                    setData(res);
                }
            }
        )
    },[]);

    return (
        <ThemeProvider theme={theme}>
          <Container component={Paper} maxWidth='sm' sx={{mr: 36, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2}}>
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlined />
              </Avatar>
              <Typography component="h1" variant="h5">
                Update product
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      type="text"
                      value={data.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="price"
                      label="Price"
                      name="price"
                      type="number"
                      value={data.price}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="amount"
                      label="Amount"
                      type="number"
                      id="amount"
                      value={data.amount}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      onChange={handleChange}
                      name="description"
                      type="text"
                      value={data.description}
                      label="Description"
                      id="description"
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
                  Update
                </Button>
              </Box>
              </Container>
        </ThemeProvider>
      );
}

export default EditProduct;