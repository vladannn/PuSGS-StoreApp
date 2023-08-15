import { useState, useEffect } from "react";
import sellerService from "../../services/SellerService";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
        {products.length>0 ? (<div>
            <table border={1} bgcolor="white" align="center" >
                <thead> 
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Delete product</th>
                        <th>Edit product</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td style={{ textAlign: 'center' }}>{product.name}</td>
                            <td style={{ textAlign: 'center' }}>{product.price}</td>
                            <td style={{ textAlign: 'center' }}>{product.amount}</td>
                            <td style={{ textAlign: 'center' }}>{product.description}</td>
                            {product.image && product.image.length > 0 ? (
                                            <td style={{ textAlign: 'center' }}><img height={100} width={200}  src={convertImage(product.image)} alt="Product" /></td>
                                        ) : (
                                            <td style={{ textAlign: 'center' }}>{str}</td>
                                        )}
                            <td><Button onClick={(e)=>deleteHandle(e, product.id)}>Delete</Button></td>
                            <td><Button onClick={(e) => editHandle(e, product.id)}>Edit</Button></td>
                        </tr>
                        ))} 
                    </tbody>
            </table>
        </div>)
        : <h1>There is no products</h1>}
        </>
    )
}

export default MyProducts;