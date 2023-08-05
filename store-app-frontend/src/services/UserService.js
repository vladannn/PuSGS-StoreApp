import axios from 'axios';

const register=async(formData)=>{
    try{
        console.log("FormData", formData);
        const response = await axios.post(`${process.env.REACT_APP_API_URL}users/register`, formData, {headers: {"Content-Type": "multipart/form-data"}});
        console.log(response);
    }
    catch(error)
    {
        console.error(error);
    }
}

export default register;