import { useEffect } from "react";
import { useState } from "react";
import adminService from "../../services/AdminService";

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
        {users.length>0 ? (<div>
            <table border={1} bgcolor="white" align="center" >
                <thead> 
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Full Name</th>
                        <th>Birthday</th>
                        <th>Address</th>
                        <th>Image</th>
                        <th>Type of user</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.username}>
                            <td style={{ textAlign: 'center' }}>{user.username}</td>
                            <td style={{ textAlign: 'center' }}>{user.email}</td>
                            <td style={{ textAlign: 'center' }}>{user.fullName}</td>
                            <td style={{ textAlign: 'center' }}>{convertDate(user.birthday)}</td>
                            <td style={{ textAlign: 'center' }}>{user.address}</td>
                            {/* <td><img src={user.image ? convertImage(user.userImage) : null} alt="User" /></td> */}
                            {user.userImage && user.userImage.length > 0 ? (
                                            <td style={{ textAlign: 'center' }}><img src={convertImage(user.userImage)} alt="User" /></td>
                                        ) : (
                                            <td style={{ textAlign: 'center' }}>{str}</td>
                                        )}
                            {user.typeOfUser === 1 ? <td style={{ textAlign: 'center' }}>Seller</td> : <td style={{ textAlign: 'center' }}>Buyer</td>}
                        </tr>
                        ))} 
                    </tbody>
            </table>
        </div>)
        : <h1>There is no users</h1>}
        </>
    )
}

export default UsersList;