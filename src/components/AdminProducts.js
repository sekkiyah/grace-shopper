import { React, useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { getAllProducts } from '../api';
import { EditProduct, CreateProduct, AddProductToCategory, DeleteCategory } from "./index";


const AdminProducts = ({token}) => {

    const [products, setProducts] = useState([]);
    const [targetSort, setTargetSort] = useState('id');

    async function getProductsHelper(){
        const result = await getAllProducts();
        if(result){
            setProducts(result);
        }
    }
    
    async function handleTargetSort(sortId){
        setTargetSort(sortId);
        setProducts(products.sort((a, b) => {return a[sortId]-b[sortId]}));
    }
    

    useEffect(() => {
        getProductsHelper();
    }, []);
    
    

    return (
        <Container>
            <Container className="text-center">
                <CreateProduct token={token} getProductsHelper={getProductsHelper}/>
            </Container>
            <Table striped hover >
                <thead>
                    <tr>
                        <th onClick={() => handleTargetSort('id')}>id</th>
                        <th onClick={() => handleTargetSort('name')}>Name</th>
                        <th onClick={() => handleTargetSort('description')}>Description</th>
                        <th onClick={() => handleTargetSort('price')}>Price</th>
                        <th onClick={() => handleTargetSort('inventory')}>Inventory</th>
                        <th>Categories</th>
                        <th>Add Categories</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       products ? products.map((product) => {
                            const {id, name, description, price, inventory, categories} = product;

                            
                            return (
                                <tr key={id}>
                                    <th>{id}</th>
                                    <th>{name}</th>
                                    <th>{description}</th>
                                    <th>${price}</th>
                                    <th>{inventory}</th>
                                    <th>
                                        {categories.map((category) => {
                                            return <DeleteCategory key={category.id} token={token} name={category.name} productId={id} categoryId={category.id} getProductsHelper={getProductsHelper}/>
                                        })}
                                    </th>
                                    <td>
                                        <AddProductToCategory token={token} getProductsHelper={getProductsHelper} productId={id} />
                                    </td>
                                     <td>
                                        <EditProduct products={products} token={token} getProductsHelper={getProductsHelper} productId={id}></EditProduct>
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


export default AdminProducts;