import Login from "../components/Login/Login.js";
import Registration from "../components/Registration/Registration";
import { Routes, Route} from "react-router-dom";
import Profile from "../components/Profile/Profile";
import UsersList from "../components/Admin/UsersList.js";
import Verification from "../components/Admin/Verification.js";
import AddProduct from "../components/Seller/AddProduct.js";
import MyProducts from "../components/Seller/MyProducts.js";
import EditProduct from "../components/Seller/EditProduct.js";

function Rout(){
    return(
        <Routes>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Registration/>}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="/all-users" element={<UsersList/>}></Route>
                <Route path="/for-verification" element={<Verification/>}></Route>
                <Route path="/add-product" element={<AddProduct/>}></Route>
                <Route path="/get-my-products" element={<MyProducts/>}></Route>
                <Route path="/edit-product" element={<EditProduct/>}></Route>
                <Route path="/"></Route>
                
        </Routes>
    )
}

export default Rout;
