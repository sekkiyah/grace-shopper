import {React, useState, useEffect, Fragment} from "react";
import { addProductToCart} from "../api";
import { Container, Button, Form, Toast, Alert} from "react-bootstrap";
import { getUserCart } from "../api";

const AddProductToCart = ({token, user, productId}) => {
    
    const [quantity, setQuantity] = useState(1);
    const [usersCart, setUsersCart] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toggleShowToast, setToggleShowToast] = useState(true);
    
    const {id} = user;
    function handleToggleToast(){
        setToggleShowToast(!toggleShowToast);
    }
   
    async function setUserCartHelper(){
        const result = await getUserCart(token, id)
        setUsersCart(result);
    }
    
    async function handleAddProductToCart(){
        const productToAdd = {
            userId: id + '',
            productId: productId,
            quantity: quantity
        }
        const productIdsInCart = usersCart.map((product) => {
            const {id: data} = product;
            return data;
        })
        if(productIdsInCart.includes(Number(productId))){
            setAlertMessage('Product is already in your cart');
        } else if(productToAdd){
            await addProductToCart(token, productToAdd);
            setUserCartHelper();
            setToastMessage('Product added to cart')
        } 
    }
    useEffect(() => {
        setUserCartHelper();
    }, [user])
    return (
        <Container className="d-flex flex-column align-items-center">
            <Form className='d-flex flex-column align-items-center'onSubmit={(e) => {
                e.preventDefault();
                handleAddProductToCart();
            }}>
                <Form.Label>Quantity</Form.Label>
                <Form.Range min='1' max='10' value={quantity} onChange={(e) => setQuantity(e.target.value)}></Form.Range>
                <p>{quantity}</p>
                <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" type="submit">Add To Cart</Button>
                {
                    alertMessage.length ? <Alert className="alert alert-danger">{alertMessage}</Alert> : <></>
                }
                {
                    toastMessage.length ? 
                    <Toast show={toggleShowToast} onClose={handleToggleToast}className="toast position-absolute top-40 end-60">
                        <Toast.Header>
                            <strong className="me-auto fs-5 text-dark">Cart</strong>
                        </Toast.Header>
                        <Toast.Body className="text-center fs-6">Product added to Cart!</Toast.Body>
                    </Toast> : <></>
                }
            </Form>
        </Container>

    )
    
}

export default AddProductToCart;