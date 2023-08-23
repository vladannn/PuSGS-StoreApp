import axios from 'axios';
import { UserModel } from "../models/models";

const register=async(formData)=>{
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}users/register`, formData, {headers: {"Content-Type": "multipart/form-data"}});
        console.log(response.data);
        return response.data
    }
    catch(error)
    {
        console.error(error);
    }
}

const getUserUpdate = async()=>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}users/get-user`, {headers: {"Authorization": `Bearer ${token}`}});
        
        console.log(response);
        return response.data ? new UserModel(response.data) : null;
    }
    catch(error)
    {
        console.error(error);
    }
}

const setUserUpdate = async(formData)=>{
    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }

        const response = await axios.post(`${process.env.REACT_APP_API_URL}users/update-user`, formData, {headers: {"Authorization": `Bearer ${token}`, "Content-Type":"multipart/form-data"}});
        
        console.log(response);
        return response;
    }
    catch(error)
    {
        console.error(error);
        return error;
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    register,
    getUserUpdate,
    setUserUpdate
};