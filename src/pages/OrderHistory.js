import {React, useState, useEffect} from 'react';
import { Container, Table, Button } from "react-bootstrap";
import { getUsersOrderHistory } from '../api';
import { useParams } from 'react-router-dom';
const OrderHistory = ({token, user}) => {
    const {id} = user;
    const [orderHistory, setOrderHistory] = useState([]);
    async function getOrderHistoryHelper(){
        const result = await getUsersOrderHistory(token, id);
        setOrderHistory(result);
    }

    useEffect(() => {
        getOrderHistoryHelper();
    }, []);

    return (
        <Container>
        <Table striped hover >
            <thead>
                <tr>
                    <th onClick={() => handleTargetSort('id')}>id</th>
                    <th onClick={() => handleTargetSort('username')}>UserId</th>
                    <th onClick={() => handleTargetSort('email')}>Status</th>
                    <th onClick={() => handleTargetSort('firstName')}>Total</th>
                    <th onClick={() => handleTargetSort('lastName')}>Date Ordered</th>
                    <th>Order Details Button</th>
                </tr>
            </thead>
            <tbody>
                {
                   orderHistory.length ? orderHistory.map((order) => {
                        const {id, userId, status, total, dateOrdered} = order;
                        return (
                            <tr key={id}>
                                <th>{id}</th>
                                <th>{userId}</th>
                                <th>{status}</th>
                                <th>${total}</th>
                                <th>{dateOrdered}</th>
                                <th>Order Details</th>
                            </tr>
                        )
                    }) : <></>
                }
            </tbody>
        </Table>
    </Container>
    )
}

export default OrderHistory;