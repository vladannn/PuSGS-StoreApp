import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import buyerService from "../../services/BuyerService";
import React from 'react';
import {Paper, Typography} from '@mui/material';
import theme from "../../layout/Theme";

const ProductDetails = () =>{
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        amount: 0,
        description: '',
        image: ''
    }
    );
    const {id} = useParams();
    const idAsInteger = parseInt(id, 10);


    useEffect(()=>{
        buyerService.getProduct(idAsInteger).then(
            (res)=>{
                if(res!=null)
                {
                    setProduct(res);
                }
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const convertImage = (img) => {
        return `data:image/jpg;base64,${img}`;
    };

    return (
        <>
            <Paper sx={{ padding: theme.spacing(2), backgroundColor: '#ffffff', borderRadius: theme.spacing(1), boxShadow: theme.shadows[2], maxWidth: 400, margin: '70px auto' }}>
                
                    <Typography variant="h3" sx={{ marginTop: 3 }} align="center">
                        {product.name}
                    </Typography>
                    
                    
                    <img
                        title="Image"
                        style={{ width: '90%', maxWidth: 300, height: 'auto' }}
                        alt="Product"
                        src={product.image && convertImage(product.image)}
                    />
                    
                    <Typography variant="h6" component="div" sx={{ backgroundColor: '#FF0000', color: 'white', padding: '4px 8px', borderRadius: 4 }}>
                        Price: {product.price} USD
                    </Typography>
                    <Typography variant="h6" sx={{ marginTop: 1 }}>
                        Amount: {product.amount}
                    </Typography>
                    
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
                    {product.description}
                </Typography>
            </Paper>
        </>
    );
}

export default ProductDetails;