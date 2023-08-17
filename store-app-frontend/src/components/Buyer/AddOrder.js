import { useState } from "react";
import theme from "../../layout/Theme";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, Box, Typography, Paper, Grid, Container, Button, TextField } from "@mui/material";

const AddOrder = (props) =>{
    const [data, setData] = useState({
        address: '',
        comment: ''
      });

    const handleSubmit = (event) =>{
        event.preventDefault();

        if(data.address.trim().length<=0)
        {
            toast.error("Please enter valid address!");
            return;
        }

        const orderItems = props.orderItems.map(item => {
            return {
                productId : item.id,
                quantity : item.quantity
            }
        })

        const order = {
            "deliveryAddress": data.address,
            "comment": data.comment,
            "orderItems": orderItems
        }

        console.log(order);
    }

    const handleChange = (event) =>{
        setData({
            ...data,
            [event.target.name]: event.target.value,
    })
    }
    return (
        <ThemeProvider theme={theme}>
          <Container component={Paper} maxWidth='sm' sx={{mr: 36, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2}}>
              
              <Typography component="h1" variant="h5">
                Add order
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      type="text"
                      value={data.address}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="comment"
                      label="Comment"
                      name="comment"
                      type="text"
                      value={data.comment}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add
                </Button>
              </Box>
              </Container>
        </ThemeProvider>
    );
}

export default AddOrder;