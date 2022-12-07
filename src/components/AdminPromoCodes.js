import {React, useState, useEffect} from 'react';
import { Container, Table, Button } from "react-bootstrap";
import { getPromoCodes } from '../api';
import { CreatePromoCode, EditPromoCode} from './index'

const AdminPromoCodes = ({token}) => {
    const [promoCodes, setPromoCodes] = useState([]);

    async function getPromoCodesHelper(){
        const result = await getPromoCodes();
        setPromoCodes(result);
    }

    useEffect(() => {
        getPromoCodesHelper();
    }, []);

    return (
        <Container>
            <Container className="text-center">
                <CreatePromoCode getPromoCodesHelper={getPromoCodesHelper}/>
            </Container>
            <Table striped hover >
                <thead>
                    <tr>
                        <th onClick={() => handleTargetSort('id')}>id</th>
                        <th onClick={() => handleTargetSort('productId')}>ProductId</th>
                        <th onClick={() => handleTargetSort('code')}>Code</th>
                        <th onClick={() => handleTargetSort('flatDiscount')}>Flat Discount</th>
                        <th onClick={() => handleTargetSort('percentDiscount')}>Percent Discount</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       promoCodes ? promoCodes.map((promo_code) => {
                            const {id, productId, code, flatDiscount, percentDiscount} = promo_code;
                            return (
                                <tr key={id}>
                                    <th>{id}</th>
                                    <th>{productId}</th>
                                    <th>{code}</th>
                                    <th>${flatDiscount}</th>
                                    <th>{percentDiscount}</th>
                                    <td>
                                        <EditPromoCode token={token} getPromoCodesHelper={getPromoCodesHelper} id={id} code={code} flatDiscount={flatDiscount} percentDiscount={percentDiscount}/>
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

export default AdminPromoCodes;