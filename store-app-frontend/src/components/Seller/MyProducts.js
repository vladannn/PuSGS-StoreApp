import { useState, useEffect } from "react";
import sellerService from "../../services/SellerService";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TableCell, Box, TableContainer, Typography, Table, TableBody, TableHead, TableRow, Paper} from "@mui/material";

const MyProducts = ()=>{
    const [products, setProducts]= useState([]);
    const str = "No picture";
    const navigate = useNavigate();

    useEffect(()=>{
        sellerService.getProducts().then(
            (response)=>{
                if (response!=null){
                    setProducts(response);
                    console.log(response);
                }
            }
        );
    },[]);

    const deleteHandle=(event, idd)=>{
        event.preventDefault();
        sellerService.deleteProduct(idd).then(
            (res)=>{
                if(res){
                    alert("Succesfully deleted!");
                }
                
            }
        )
    }

    const editHandle = (event, idd) =>{
        event.preventDefault();
        navigate(`/edit-product?id=${idd}`);
    }

    const convertImage = (img) => {
        return `data:image/jpg;base64,${img}`;
    };

    return(
    
    <>
        {products.length>0 ?(
        <>
        <Box display="flex" justifyContent="center" mt={2}>
                <h2>Your products</h2>
        </Box>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="right">Delete product</TableCell>
                            <TableCell align="right">Edit product</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {products.map((product) =>(
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{product.name}</TableCell>
                                <TableCell align="center">{product.price}</TableCell>
                                <TableCell align="center">{product.amount}</TableCell>
                                <TableCell align="center">{product.description}</TableCell>
                                {product.image && product.image.length > 0 ? (
                                          <TableCell align="center"><img height={100} width={100}  src={convertImage(product.image)} alt="Product" /></TableCell>
                                        ) : (
                                            <TableCell align="center">{str}</TableCell>
                                     )}
                                <TableCell align="right"><Button onClick={(e)=>deleteHandle(e, product.id)}>Delete</Button></TableCell>
                                <TableCell align="right"><Button onClick={(e) => editHandle(e, product.id)}>Edit</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
            </Table>
        </TableContainer>
        </>)
        :
        (<Box display="flex" justifyContent="center" mt={2}><Typography variant="h3">There is no products</Typography></Box>  )               
}
        </>
    )
}

export default MyProducts;