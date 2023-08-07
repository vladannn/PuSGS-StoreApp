import Login from "../components/Login/Login.js";
import Registration from "../components/Registration/Registration";
import { Routes, Route} from "react-router-dom";

function Rout(){
    return(
        <Routes>
                {/* <Route path="/" element={<Profile/>}></Route> */}
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Registration/>}></Route>
        </Routes>
    )
}

export default Rout;
