import { useEffect, useState } from "react";
import adminService from "../../services/AdminService";
import { Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import "./Verification.css";
//import { Card } from '@mui/material';
import { TableCell, Box, TableContainer, Table, TableBody, TableHead, TableRow, Paper} from "@mui/material";

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
                {forVerification.length>0 ?(
                    <>
                    <Box display="flex" justifyContent="center" mt={2}>
                            <h2>Sellers that need verification</h2>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Username</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Full Name</TableCell>
                                        <TableCell align="right">Birthday</TableCell>
                                        <TableCell align="right">Address</TableCell>
                                        <TableCell align="center">Image</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {forVerification.map((seller) =>(
                                        <TableRow
                                            key={seller.username}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="right">{seller.username}</TableCell>
                                            <TableCell align="right">{seller.email}</TableCell>
                                            <TableCell align="center">{seller.fullName}</TableCell>
                                            <TableCell align="right">{convertDate(seller.birthday)}</TableCell>
                                            <TableCell align="right">{seller.address}</TableCell>
                                            {seller.userImage && seller.userImage.length > 0 ? (
                                                        <TableCell align="right"><img width={100} height={100} src={convertImage(seller.userImage)} alt="User" /></TableCell>
                                                    ) : (
                                                        <TableCell align="center">{str}</TableCell>
                                                    )}
                                            <TableCell>
                                                <Button onClick={(e) => verify(seller.id, 0)}>Accept</Button>
                                                <Button onClick={(e) => verify(seller.id, 1)}>Decline</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                        </Table>
                    </TableContainer>
                    </>)
                    :
                    (<Box display="flex" justifyContent="center" mt={2}><Typography variant="h3">There is no users that are waiting for verification</Typography></Box>  )               
            }
                </>
            <>
                
                {declinedUsers.length>0 ?(
                    <>
                    <Box display="flex" justifyContent="center" mt={2}>
                            <h2>Sellers with declined verification</h2>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Username</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Full Name</TableCell>
                                        <TableCell align="right">Birthday</TableCell>
                                        <TableCell align="right">Address</TableCell>
                                        <TableCell align="center">Image</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {declinedUsers.map((seller) =>(
                                        <TableRow
                                            key={seller.username}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{seller.username}</TableCell>
                                            <TableCell align="center">{seller.email}</TableCell>
                                            <TableCell align="center">{seller.fullName}</TableCell>
                                            <TableCell align="right">{convertDate(seller.birthday)}</TableCell>
                                            <TableCell align="right">{seller.address}</TableCell>
                                            {seller.userImage && seller.userImage.length > 0 ? (
                                                        <TableCell align="right"><img width={100} height={100} src={convertImage(seller.userImage)} alt="User" /></TableCell>
                                                    ) : (
                                                        <TableCell align="center">{str}</TableCell>
                                                    )}
                                        </TableRow>
                                    ))}
                                </TableBody>
                        </Table>
                    </TableContainer>
                    </>)
                    :
                    (<Box display="flex" justifyContent="center" mt={2}><Typography variant="h3">There is no sellers whose request has been declined</Typography></Box>  )               
            }
            </>
        </>
    )
}

export default Verification;