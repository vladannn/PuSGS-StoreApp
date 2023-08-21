import axios from "axios";
import {GetUserModel, OrderModel} from "../models/models";

const getUsersList= async()=>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}admin/get-all-users`, {headers: {"Authorization": `Bearer ${token}`}});
        
        const usersList=[];
        for(let i = 0; i < response.data.length; i++){
            const user = response.data[i];
            usersList[i] = new GetUserModel(
                user.id,
                user.username,
                user.email,
                user.fullName,
                user.birthday,
                user.address,
                user.typeOfUser,
                user.userImage
            );
        }
        return usersList;
    }
    catch(error)
    {
        alert(error.response.data.Exception);
        return null;
    }
}

const forVerification= async()=>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}admin/for-verification`, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data;
    }
    catch(error)
    {
        alert(error.response.data.Exception);
        return null;
    }
}

const verifyUser= async(data)=>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }

        await axios.post(`${process.env.REACT_APP_API_URL}admin/verify-user`, data, {headers: {"Authorization": `Bearer ${token}`}});
        return true;
    }
    catch(error)
    {
        alert(error.response.data.Exception);
        return false;
    }
}

const declinedRequest= async()=>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}admin/declined-user`, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data;
    }
    catch(error)
    {
        alert(error.response.data.Exception);
        return null;
    }
}

const getOrders = async ()=>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}admin/get-orders`, {headers: {"Authorization": `Bearer ${token}`}});
        
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
    catch(ex)
    {
        console.error(ex); 
        alert(`An error occurred: ${ex.message}`);
        return null;
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {getUsersList, forVerification, verifyUser, declinedRequest, getOrders};