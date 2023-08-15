import axios from "axios";
import { ProductModel } from "../models/models";

const getProducts = async ()=>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}seller/get-my-products`, {headers: {"Authorization": `Bearer ${token}`}});
        
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

const addProduct = async(formData) =>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }

        await axios.post(`${process.env.REACT_APP_API_URL}seller/add-product`, formData,  {headers: {"Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data"}});
        return true;
    }
    catch(error)
    {
        alert(error.response.data.Exception);
        return false;
    }
}

const deleteProduct = async(id) =>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }
        await axios.delete(`${process.env.REACT_APP_API_URL}seller/get-my-products/${id}`,  {headers: {"Authorization": `Bearer ${token}`}});
        return true;
    }
    catch(error)
    {
        alert(error.response.data.Exception);
        return false;
    }
}

const getProduct = async(id)=>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }
        const response = await axios.get(`${process.env.REACT_APP_API_URL}seller/get-product/${id}`,  {headers: {"Authorization": `Bearer ${token}`}});
        return response.data;
    }
    catch(error)
    {
        alert(error.response.data.Exception);
        return null;
    }
}

const editProduct = async(id, formData)=>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }
        const response = await axios.post(`${process.env.REACT_APP_API_URL}seller/edit-product/${id}`,formData,  {headers: {"Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data"}});
        return response.data;
    }
    catch(error)
    {
        alert(error.response.data.Exception);
        return null;
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getProducts, addProduct, deleteProduct, getProduct, editProduct};