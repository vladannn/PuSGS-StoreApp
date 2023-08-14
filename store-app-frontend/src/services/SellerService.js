import axios from "axios";
import { ProductModel } from "../models/models";

const getProducts = async ()=>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}seller/get-all-products`, {headers: {"Authorization": `Bearer ${token}`}});
        
        const productsList=[];
        for(let i = 0; i < response.data.length; i++){
            const product = response.data[i];
            productsList[i] = new ProductModel(
                product.id,
                product.name,
                product.description,
                product.amount, 
                product.image,
                product.price,
                product.sellerId
            );
        }
        return productsList;
    }
    catch(error)
    {
        alert(error.response.data.Exception);
        return null;
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getProducts};