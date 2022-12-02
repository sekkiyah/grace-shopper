import { React, useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { getAllProducts } from '../api';


const AdminProducts = () => {

    const [products, setProducts] = useState([]);
    const [targetSort, setTargetSort] = useState('id');
    const [isEdit, setIsEdit] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
     };
     const handleMouseLeave = () => {
        setIsHover(false);
     };
    
    async function getProductsHelper(){
        const result = await getAllProducts();
        if(result){
            setProducts(result);
        }
    }
    function handleSetEdit(){
        setIsEdit(!isEdit);
    }
    async function handleTargetSort(sortId){
        setTargetSort(sortId);
        setProducts(products.sort((a, b) => {return a[sortId]-b[sortId]}));
    }
    function handleSubmitEdit(){
        console.log('Edit submitted');
    }

    useEffect(() => {
        getProductsHelper();
    }, []);
    console.log(isEdit);
    

    return (
        <Container>
            <Table striped hover >
                <thead>
                    <tr>
                        <th onClick={() => handleTargetSort('id')}>id</th>
                        <th onClick={() => handleTargetSort('name')}>Name</th>
                        <th onClick={() => handleTargetSort('description')}>Description</th>
                        <th onClick={() => handleTargetSort('price')}>Price</th>
                        <th onClick={() => handleTargetSort('inventory')}>Inventory</th>
                        <th onClick={() => handleSetEdit()}>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       products ? products.map((product) => {
                            const {id, name, description, price, inventory} = product;
                            return (
                                <tr key={id}>
                                    <th>{id}</th>
                                    <th>{name}</th>
                                    <th>{description}</th>
                                    <th>{price}</th>
                                    <th>{inventory}</th>
                                    {
                                        isEdit ? <th onClick={handleSubmitEdit} >Submit Edit</th> : <></>
                                    }
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