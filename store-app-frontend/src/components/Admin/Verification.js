import { useEffect, useState } from "react";
import adminService from "../../services/AdminService";
import { Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import "./Verification.css";
import { Card } from '@mui/material';

const Verification = ()=>{
    const [forVerification, setForVerification] = useState([]);
    const [declinedUsers, setDeclinedUsers] = useState([]);
    const str = "No picture";
    const navigate = useNavigate();

    useEffect(()=>{
        adminService.forVerification().then(
            (response)=>{
                if(response!=null)
                {
                    setForVerification(response);
                }
            }
        );
        adminService.declinedRequest().then(
            (response)=>{
                if(response!=null)
                {
                    setDeclinedUsers(response);
                }
            }
        );
    },[]);

    const convertDate = (date)=>{
        const date1 =date.split("T")[0];
        const date2 = date1.split("-");
        return `${date2[2]}.${date2[1]}.${date2[0]}`;
    }

    const convertImage = (img) => {
        return `data:image/jpg;base64,${img}`;
      };

    const verify=(id, num)=>{
        adminService.verifyUser({id: id, verificationStatus: num}).then(
            (res)=>{alert("User is succesfully verified!"); navigate("/profile")}
        );
    };

    return(
        <>
            <>
                {
                    forVerification.length>0 ? 
                    (
                        <>
                        <h1>Sellers that need verification</h1>
                        <table>
                            <thead>
                                <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Full Name</th>
                                <th>Birthday</th>
                                <th>Address</th>
                                <th>Image</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {forVerification.map((seller) => (
                                    <tr key={seller.username}>
                                        <td>{seller.username}</td>
                                        <td>{seller.email}</td>
                                        <td>{seller.fullName}</td>
                                        <td>{convertDate(seller.birthday)}</td>
                                        <td>{seller.address}</td>
                                        {seller.userImage && seller.userImage.length > 0 ? (
                                            <td style={{ textAlign: 'center' }}><img src={convertImage(seller.userImage)} alt="User" /></td>
                                        ) : (
                                            <td style={{ textAlign: 'center' }}>{str}</td>
                                        )}
                                        <td>
                                            <Button onClick={(e) => verify(seller.id, 0)}>Accept</Button>
                                            <Button onClick={(e) => verify(seller.id, 1)}>Decline</Button>
                                        </td>
                                    </tr>
                                    ))} 
                        </tbody>
                        </table>
                        </>
                    )
                    :
                    <h1>There is no sellers to verificate</h1>
                }
                </>
            <>
                {
                    declinedUsers.length>0 ? 
                    (
                        <>
                        <h1>Sellers with declined verification</h1>
                        <table>
                            <thead>
                                <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Full Name</th>
                                <th>Birthday</th>
                                <th>Address</th>
                                <th>Image</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {declinedUsers.map((seller) => (
                                    <tr key={seller.username}>
                                        <td>{seller.username}</td>
                                        <td>{seller.email}</td>
                                        <td>{seller.fullName}</td>
                                        <td>{convertDate(seller.birthday)}</td>
                                        <td>{seller.address}</td>
                                        {seller.userImage && seller.userImage.length > 0 ? (
                                            <td style={{ textAlign: 'center' }}><img src={convertImage(seller.userImage)} alt="User" /></td>
                                        ) : (
                                            <td style={{ textAlign: 'center' }}>{str}</td>
                                        )}
                                    </tr>
                                    ))} 
                        </tbody>
                        </table>
                        </>
                    )
                    :
                    <h1>There is no sellers whose request has been declined</h1>
                }
            </>
        </>
    )
}

export default Verification;