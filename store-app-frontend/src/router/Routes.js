import Login from "../components/Login/Login.js";
import Registration from "../components/Registration/Registration";
import { Routes, Route} from "react-router-dom";
import Profile from "../components/Profile/Profile";

function Rout(){
    return(
        <Routes>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Registration/>}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="/"></Route>
        </Routes>
    )
}

export default Rout;
