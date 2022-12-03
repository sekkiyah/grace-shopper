import { React, useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { getAllUsers } from '../api';
import { EditUser } from './index';



const AdminUsers = ({token}) => {

    const [users, setUsers] = useState([]);
    const [targetSort, setTargetSort] = useState('id');

    async function getUsersHelper(){
        const result = await getAllUsers(token);
        if(result){
            setUsers(result);
        }
    }

    async function handleTargetSort(sortId){
        setTargetSort(sortId);
        setUsers(users.sort((a, b) => {return a[sortId]-b[sortId]}));
    }
    

    useEffect(() => {
        getUsersHelper();
    }, []);
    
    

    return (
        <Container>
            <Table striped hover >
                <thead>
                    <tr>
                        <th onClick={() => handleTargetSort('id')}>id</th>
                        <th onClick={() => handleTargetSort('username')}>Username</th>
                        <th onClick={() => handleTargetSort('email')}>Email</th>
                        <th onClick={() => handleTargetSort('firstName')}>First Name</th>
                        <th onClick={() => handleTargetSort('lastName')}>Last Name</th>
                        <th onClick={() => handleTargetSort('isAdmin')}>isAdmin?</th>
                        <th onClick={() => handleTargetSort('isBanned')}>isBanned?</th>
                        <th onClick={() => handleTargetSort('passwordResetRequired')}>Password Reset Required?</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       users ? users.map((user) => {
                            const {id, email, username, firstName, lastName, isAdmin, isBanned, passwordResetRequired} = user;
                            return (
                                <tr key={id}>
                                    <th>{id}</th>
                                    <th>{username}</th>
                                    <th>{email}</th>
                                    <th>{firstName}</th>
                                    <th>{lastName}</th>
                                    <th>{isAdmin.toString()}</th>
                                    <th>{isBanned.toString()}</th>
                                    <th>{passwordResetRequired.toString()}</th>
                                    <td>
                                        <EditUser users={users} token={token} getUsersHelper={getUsersHelper} userId={id}></EditUser>
                                    </td>
                                </tr>
                            )
                        }) : <></>
                    }
                </tbody>
            </Table>
        </Container>
    );
}

export default AdminUsers