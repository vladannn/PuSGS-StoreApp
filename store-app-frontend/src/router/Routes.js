import Login from "../components/Login/Login.js";
import Registration from "../components/Registration/Registration";
import { Routes, Route, Navigate} from "react-router-dom";
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
import AllOrders from "../components/Admin/AllOrders.js";
import { AuthContext } from "../context/auth-context.js";
import { useContext } from "react";
import Home from "../components/Home/Home.js";

function Rout(){
    const auth = useContext(AuthContext);

    return(
        <Routes>
                <Route path="/login" element={auth.token? <Navigate to="/profile"/> :<Login/>}></Route>
                <Route path="/register" element={auth.token? <Navigate to="/profile"/> :<Registration/>}></Route>
                <Route path="/profile" element={auth.token? <Profile/>:<Navigate to="/"/>}></Route>
                <Route path="/all-users" element={auth.token && auth.onUserType()==="Administrator" ? <UsersList/> : <Navigate to="/"/>}></Route>
                <Route path="/for-verification" element={auth.token && auth.onUserType()==="Administrator" ? <Verification/> : <Navigate to="/"/>}></Route>
                <Route path="/add-product" element={auth.token && auth.onUserType()==="Seller" ? <AddProduct/> : <Navigate to="/"/>}></Route>
                <Route path="/get-my-products" element={auth.token && auth.onUserType()==="Seller" ? <MyProducts/> : <Navigate to="/"/>}></Route>
                <Route path="/edit-product" element={auth.token && auth.onUserType()==="Seller" ? <EditProduct/> : <Navigate to="/"/>}></Route>
                <Route path="/get-products" element={auth.token && auth.onUserType()==="Buyer" ? <Catalog/> : <Navigate to="/"/>}></Route>
                <Route path="/get-products/:id" element={auth.token && auth.onUserType()==="Buyer" ? <ProductDetails/> : <Navigate to="/"/>}></Route>
                <Route path="/cart" element={auth.token && auth.onUserType()==="Buyer" ? <Cart/> : <Navigate to="/"/>}></Route>
                <Route path="/new-orders" element={auth.token && auth.onUserType()==="Buyer" ? <NewOrders/> : <Navigate to="/"/>}></Route>
                <Route path="/old-orders" element={auth.token && auth.onUserType()==="Buyer" ? <OldOrders/> : <Navigate to="/"/>}></Route>
                <Route path="/old-orders-seller" element={auth.token && auth.onUserType()==="Seller" ? <OldOrdersSeller/> : <Navigate to="/"/>}></Route>
                <Route path="/new-orders-seller" element={auth.token && auth.onUserType()==="Seller" ? <NewOrdersSeller/> : <Navigate to="/"/>}></Route>
                <Route path="/get-orders" element={auth.token && auth.onUserType()==="Administrator" ? <AllOrders/> : <Navigate to="/"/>}></Route>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/home" element={<Home/>}></Route>
                
        </Routes>
    )
}

export default Rout;
