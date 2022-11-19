import React from 'react';
import { addNewProduct } from './api'

const NewProduct = ({ token, fetchProducts, navigate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnailImage, setThumbnailImage] = useState('');

    const addProduct = async () => {
        const results = await addNewProduct(token, { name, description, price, thumbnailImage });
        if (results) {
            fetchProducts();
            navigate('/products')
        } else {
            alert("Error creating new product.")
        }
    }

    return (
        <div className="newProductContainer">
            <form onSubmit={(event) => {
                event.preventDefault();
            }}>
                <h2>Create a new product</h2>
                <input
                    type='text'
                    placeholder='Enter product name'
                    onSubmit={(event) => setName(event.target.value)} />
                <input
                    type='text'
                    placeholder='Enter product description'
                    onSubmit={(event) => setDescription(event.target.value)} />
                <input
                    type='text'
                    placeholder='Enter product price'
                    onSubmit={(event) => setPrice(event.target.value)} />
                <input
                    type='text'
                    placeholder='Enter product image'
                    onSubmit={(event) => setThumbnailImage(event.target.value)} />
                <button
                    onClick={async () => addProduct()}
                    type='submit'>
                    Create
                </button>
            </form>
        </div>
    );
};

export default NewProduct;