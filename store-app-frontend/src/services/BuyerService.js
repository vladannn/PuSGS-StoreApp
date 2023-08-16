import axios from "axios";
import { ProductModel } from "../models/models";

const getProducts = async ()=>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}buyer/get-products`, {headers: {"Authorization": `Bearer ${token}`}});
        
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

const getProduct= async (id)=>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}buyer/get-product/${id}`, {headers: {"Authorization": `Bearer ${token}`}});
        
        const model = new ProductModel(
            response.data.id,
            response.data.name,
            response.data.description,
            response.data.amount,
            response.data.image,
            response.data.price,
            response.data.sellerId
        );
        return model;
    }
    catch(error)
    {
        alert(error.response.data.Exception);
        return null;
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getProducts, getProduct};