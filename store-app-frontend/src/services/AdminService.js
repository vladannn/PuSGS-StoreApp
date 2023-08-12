import axios from "axios";
import {GetUserModel} from "../models/models";

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
// eslint-disable-next-line import/no-anonymous-default-export
export default {getUsersList, forVerification};