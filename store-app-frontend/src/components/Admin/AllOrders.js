import { useEffect, useState } from "react";
import adminService from "../../services/AdminService";
import { TableCell, Box, TableContainer, Typography, Table, TableBody, TableHead, TableRow, Paper} from "@mui/material";

const AllOrders = () =>{
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        adminService.getOrders().then(
        (res)=>{
            if(res!=null)
            {
                console.log(res);
                setOrders(res);
            }
        }
        )
    }, []);

    
    return (
        <>
        {orders.length>0 ?(
        <>
        <Box display="flex" justifyContent="center" mt={2}>
                <h2>All orders</h2>
        </Box>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Delivery address</TableCell>
                            <TableCell align="right">Comment</TableCell>
                            <TableCell align="center">Order Time</TableCell>
                            <TableCell align="right">Delivery Time</TableCell>
                            <TableCell align="right">Order Status</TableCell>
                            <TableCell align="right">Items</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {orders.map((order) =>(
                            <TableRow
                                key={order.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">{order.deliveryAddress}</TableCell>
                                <TableCell align="right">{order.comment}</TableCell>
                                <TableCell align="right">{new Date(order.orderTime).toLocaleString()}</TableCell>
                                <TableCell align="right">{new Date(order.deliveryTime).toLocaleString()}</TableCell>
                                <TableCell align="right">{order.orderStatus===0? "Delivered": "Canceled"}</TableCell>
                                <TableCell align="right">
                                {order.orderItems.map((item) => (
                                    <span key={item.id}>
                                    {item.name}: {item.amount} x
                                    <br />
                                    </span>
                                ))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
            </Table>
        </TableContainer>
        </>)
        :
        (<Box display="flex" justifyContent="center" mt={2}><Typography variant="h3">There is no orders</Typography></Box>  )               
}
        </>
    );
}

export default AllOrders;