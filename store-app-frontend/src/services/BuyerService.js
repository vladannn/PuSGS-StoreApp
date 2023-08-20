import axios from "axios";
import { ProductModel, OrderModel } from "../models/models";

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

const addOrder=async(data) =>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }

        await axios.post(`${process.env.REACT_APP_API_URL}buyer/add-order`, data, {headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"}});
    }
    catch(ex)
    {
        alert(ex.response.data.Exception);
    }
}

const getOldOrders = async ()=>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}buyer/get-old-orders`, {headers: {"Authorization": `Bearer ${token}`}});
        
        const ordersList=[];
        for(let i = 0; i < response.data.length; i++){
            const product = response.data[i];
            ordersList[i] = new OrderModel(
                product.id,
                product.deliveryAddress,
                product.comment,
                product.orderTime, 
                product.orderStatus,
                product.deliveryTime,
                product.orderItems
            );
        }
        return ordersList;
    }
    catch(error)
    {
        alert(error.response.data.Exception);
        return null;
    }
}

const getNewOrders = async ()=>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}buyer/get-new-orders`, {headers: {"Authorization": `Bearer ${token}`}});
        
        const ordersList=[];
        for(let i = 0; i < response.data.length; i++){
            const product = response.data[i];
            ordersList[i] = new OrderModel(
                product.id,
                product.deliveryAddress,
                product.comment,
                product.orderTime, 
                product.orderStatus,
                product.deliveryTime,
                product.orderItems
            );
        }
        return ordersList;
    }
    catch(error)
    {
        alert(error.response.data.Exception);
        return null;
    }
}

const cancelOrder = async(id) =>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }

        await axios.put(`${process.env.REACT_APP_API_URL}buyer/cancel-order/${id}`, {headers: {"Authorization": `Bearer ${token}`}});
    }
    catch(ex)
    {
        alert(ex.response.data.Exception);
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {getProducts, getProduct, addOrder, getOldOrders, getNewOrders, cancelOrder};