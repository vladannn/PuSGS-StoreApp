import React from "react";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {useCart} from "../../context/cart-context";

const ProductCard = ({product}) =>{
    const {addToCart} = useCart();

    const convertImage = (img) => {
        return `data:image/jpg;base64,${img}`;
      };

      const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: { fontWeight: 'bold', color: 'primary.main' }
                }}
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                image={convertImage(product.image)}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h5">
                    Din{product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleAddToCart}>Add to Cart</Button>
                <Button component={Link} to={`/get-products/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard;