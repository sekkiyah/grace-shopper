import React from 'react';
import { useParams } from 'react-router-dom';
import { updateProduct } from './api'

const EditProduct = ({ token, products, navigate }) => {
    const { productId } = useParams();
    const [currentProduct] = products.filter(product => product.id === parseInt(productId));

    if (currentProduct === undefined) {
        return null;
    }

    const { name, description, price, thumbnailImage } = currentProduct;

    const [newName, setNewName] = useState(name);
    const [newDescription, setNewDescription] = useState(description);
    const [newPrice, setNewPrice] = useState(price);
    const [newThumbnailImage, setNewThumbnailImage] = useState('');

    async function editProduct() {
        const updatedProduct = {
            token: token,
            name: newName,
            description: newDescription,
            price: newPrice,
            thumbnailImage: newThumbnailImage,
            productId
        }
        const results = await updateProduct(updatedProduct);
        if (results) {
            navigate('/products')
        }
    }

    return (
        <div className="editProductContainer">
            <form onSubmit={(event) => {
                event.preventDefault();
                editProduct();
            }}>
                <h2>Edit product</h2>
                <input
                    type='text'
                    placeholder='Enter new product name'
                    onSubmit={(event) => setNewName(event.target.value)} />
                <input
                    type='text'
                    placeholder='Enter new product description'
                    onSubmit={(event) => setNewDescription(event.target.value)} />
                <input
                    type='text'
                    placeholder='Enter new product price'
                    onSubmit={(event) => setNewPrice(event.target.value)} />
                <input
                    type='text'
                    placeholder='Enter new product image'
                    onSubmit={(event) => setNewThumbnailImage(event.target.value)} />
                <button type='submit'>
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditProduct;