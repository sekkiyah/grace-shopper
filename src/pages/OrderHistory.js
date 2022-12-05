import {React, useState, useEffect} from 'react';
import { Container, Table, Button } from "react-bootstrap";
import { getUsersOrderHistory } from '../api';
import { useParams } from 'react-router-dom';
const OrderHistory = () => {
    const {userId} = useParams();
    const [orderHistory, setOrderHistory] = useState([]);
    console.log(orderHistory);
    async function getOrderHistoryHelper(){
        const result = await getUsersOrderHistory()
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
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {
                   orderHistory ? orderHistory.map((order) => {
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