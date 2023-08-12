import { useEffect, useState } from "react";
import adminService from "../../services/AdminService";
import { Button } from "@mui/material";

const Verification = ()=>{
    const [forVerification, setForVerification] = useState([]);
    const str = "No picture";

    useEffect(()=>{
        adminService.forVerification().then(
            (response)=>{
                if(response!=null)
                {
                    setForVerification(response);
                }
            }
        );
    });

    const convertDate = (date)=>{
        const date1 =date.split("T")[0];
        const date2 = date1.split("-");
        return `${date2[2]}.${date2[1]}.${date2[0]}`;
    }

    const convertImage = (img) => {
        return `data:image/jpg;base64,${img}`;
      };

    const verifyHandler=(num, idd)=>{

    }

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
                                            <Button onClick={(event) => verifyHandler(1, seller.id)}>Accept</Button>
                                            <Button onClick={(event) => verifyHandler(2, seller.id)}>Decline</Button>
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
        </>
    )
}

export default Verification;