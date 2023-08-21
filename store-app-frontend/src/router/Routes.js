import Login from "../components/Login/Login.js";
import Registration from "../components/Registration/Registration";
import { Routes, Route} from "react-router-dom";
import Profile from "../components/Profile/Profile";
import UsersList from "../components/Admin/UsersList.js";
import Verification from "../components/Admin/Verification.js";
import AddProduct from "../components/Seller/AddProduct.js";
import MyProducts from "../components/Seller/MyProducts.js";
import EditProduct from "../components/Seller/EditProduct.js";
import Catalog from "../components/Seller/Catalog.js";
import ProductDetails from "../components/Product/ProductDetails.js";
import Cart from "../components/Buyer/Cart.js";
import NewOrders from "../components/Buyer/NewOrders.js";
import OldOrders from "../components/Buyer/OldOrders.js";
import OldOrdersSeller from "../components/Seller/OldOrdersSeller.js";
import NewOrdersSeller from "../components/Seller/NewOrdersSeller.js";

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
                <Route path="/get-products" element={<Catalog/>}></Route>
                <Route path="/get-products/:id" element={<ProductDetails/>}></Route>
                <Route path="/cart" element={<Cart/>}></Route>
                <Route path="/new-orders" element={<NewOrders/>}></Route>
                <Route path="/old-orders" element={<OldOrders/>}></Route>
                <Route path="/old-orders-seller" element={<OldOrdersSeller/>}></Route>
                <Route path="/new-orders-seller" element={<NewOrdersSeller/>}></Route>
                <Route path="/"></Route>
                
        </Routes>
    )
}

export default Rout;
