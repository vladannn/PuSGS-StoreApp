import { useEffect } from "react";
import { useState } from "react";
import adminService from "../../services/AdminService";
import { TableCell, Box, TableContainer, Typography, Table, TableBody, TableHead, TableRow, Paper} from "@mui/material";

const UsersList=()=>{
    const [users, setUsers]= useState([]);
    const str = "No picture";

    useEffect(()=>{
        adminService.getUsersList().then(
            (response)=>{
                if (response!=null){
                    setUsers(response);
                    console.log(response);
                }
            }
        );
    },[]);

    const convertImage = (img) => {
        return `data:image/jpg;base64,${img}`;
      };

    const convertDate = (date)=>{
        const date1 =date.split("T")[0];
        const date2 = date1.split("-");
        return `${date2[2]}.${date2[1]}.${date2[0]}`;
    }

    return (
        <>
        {users.length>0 ?(
        <>
        <Box display="flex" justifyContent="center" mt={2}>
                <h2>All users</h2>
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
                            <TableCell align="right">Type of User</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map((user) =>(
                            <TableRow
                                key={user.username}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">{user.username}</TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="center">{user.fullName}</TableCell>
                                <TableCell align="right">{convertDate(user.birthday)}</TableCell>
                                <TableCell align="right">{user.address}</TableCell>
                                {user.userImage && user.userImage.length > 0 ? (
                                            <TableCell align="right"><img width={100} height={100} src={convertImage(user.userImage)} alt="User" /></TableCell>
                                        ) : (
                                            <TableCell align="center">{str}</TableCell>
                                        )}
                                {user.typeOfUser === 1 ? <TableCell align="center">Seller</TableCell> : <TableCell align="center">Buyer</TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
            </Table>
        </TableContainer>
        </>)
        :
        (<Box display="flex" justifyContent="center" mt={2}><Typography variant="h3">There is no users</Typography></Box>  )               
}
        </>
    )
}

export default UsersList;