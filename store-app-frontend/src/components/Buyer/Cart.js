import {useCart} from "../../context/cart-context";
import { TableContainer, Table, TableCell, TableHead, TableRow, TableBody, Paper, Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField} from "@mui/material";
import { useState } from "react";
import AddOrder from "./AddOrder";

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity} = useCart();

    const convertImage = (img) => {
        return `data:image/jpg;base64,${img}`;
      };

    const [dialogOpen, setDialogOpen] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const handleQuantityChange = (id, newValue) =>{
        updateQuantity(id, newValue);
    }

    const handleRemoveFromCart = (id) =>{
        removeFromCart(id);
    }

    const handleDialogOpen = () => {
        setDialogOpen(true);
        setShowAdd(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    if (cartItems.length===0) return <Box display="flex" justifyContent="center" mt={2}><Typography variant="h3">Your cart is empty</Typography></Box>

    return (
        <>
            <Box display="flex" justifyContent="center" mt={2}>
                <h2>Shopping Cart</h2>
            </Box>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Available</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {cartItems.map((item) => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display='flex' alignItems='center'>
                                        <img style={{ height: 50, marginRight: 20 }} src={convertImage(item.image)} alt={item.name} />
                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">${item.price}</TableCell>
                                <TableCell align="right">{item.amount}</TableCell>
                                <TableCell align="right">{item.description}</TableCell>
                                <TableCell align="right">${item.price * item.quantity}</TableCell>
                                <TableCell align="right">
                                <TextField
                                    value={item.quantity}
                                    type="number"
                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                />
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleRemoveFromCart(item.id)}
                                    >
                                        Remove
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
            </Table>
            </TableContainer><br/>
            <Button variant="contained" color="primary" onClick={handleDialogOpen}>
                Look at order
            </Button>

            {showAdd && <AddOrder orderItems={cartItems}></AddOrder>}

            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Order Summary</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        
                            {cartItems.map((item) => (
                                <span key={item.id} component="li">
                                    {item.name} - {item.quantity} x ${item.price.toFixed(2)}<br></br>
                                </span>
                            ))}<br/>
                            <span>
                                Total: ${(calculateTotal(cartItems)+ 5).toFixed(2)}
                            </span><br/>
                            <span>
                                Delivery Fee: $5.00
                            </span>
                        
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Cart;