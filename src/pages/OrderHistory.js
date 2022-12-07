import {React, useState, useEffect} from 'react';
import { Container, Table, Button } from "react-bootstrap";
import { getUsersOrderHistory } from '../api';
import { useParams } from 'react-router-dom';
import { OrderDetails } from '../components';
const OrderHistory = ({token, user}) => {
    const {userId} = useParams();
    const [orderHistory, setOrderHistory] = useState([]);
    console.log(orderHistory)
    async function getOrderHistoryHelper(){
        if(userId == user.id){
            const result = await getUsersOrderHistory(token, userId);
            setOrderHistory(result);
        }
    }

    useEffect(() => {
        getOrderHistoryHelper();
    }, [user]);

    return (
        <Container className='d-flex flex-column align-items-center'>
            {
                !orderHistory.length ? <Container className='text-center mb-3 mt-4'>
                    <p className='fs-4'>You have no Order History! Please order something! PLEASE!</p>
                </Container> 
                : 
                <Container className="border border-dark rounded-pill mt-3 ms-5 me-5 w-50 bg-opacity-50 shadow p-3 mb-5 bg-danger rounded">
                    <Container className='text-center border border-dark rounded-pill p-2 mx-auto bg-danger bg-opacity-75'>
                        <p className='fs-3 fw-bold text-decoration-underline'>Your Order History</p>
                    </Container>
                </Container>
            }
        <Table striped hover className='text-center'>
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
            <tbody className='text-center'>
                {
                   orderHistory.length ? orderHistory.map((order) => {
                        const {id, userId, status, total, dateOrdered, orderDetails} = order;
                        return (
                            <tr key={id}>
                                <th>{id}</th>
                                <th>{userId}</th>
                                <th>{status}</th>
                                <th>${total}</th>
                                <th>{dateOrdered}</th>
                                <td>
                                    <OrderDetails orderDetailsProp={orderDetails} />
                                </td>
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