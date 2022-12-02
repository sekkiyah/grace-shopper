import {React, useState, useEffect} from 'react';
import { Container, Table } from 'react-bootstrap';
import { getAllProducts } from '../api';
const Admin = () => {

    const {products, setProducts} = useState([]);

    async function getProductsHelper(){
        const result = await getAllProducts();
        if(result){
            setProducts(result);
        }
    }
    useEffect(() => {
        getProductsHelper();
    }, []);

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Inventory</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       products ? products.map((product) => {
                            const {id, name, description, price, inventory} = product;
                            return (
                                <tr>
                                    <th>{id}</th>
                                    <th>{name}</th>
                                    <th>{description}</th>
                                    <th>{price}</th>
                                    <th>{inventory}</th>
                                </tr>
                            )
                        }) : <></>
                    }
                </tbody>
            </Table>
        </Container>
    );
}

export default Admin;