import {React, useState, useEffect} from "react";
import { Container, Table, Button } from "react-bootstrap";
import { getAllCategories } from "../api";
import { AddCategory, EditCategory } from './index';

const AdminCategories = ({token}) => {
    const [categories, setCategories] = useState([]);
    const [targetSort, setTargetSort] = useState('id');

    async function getCategoriesHelper(){
        const result = await getAllCategories();
        if(result){
            setCategories(result);
        }
    }
    
    async function handleTargetSort(sortId){
        setTargetSort(sortId);
        setCategories(categories.sort((a, b) => {return a[sortId]-b[sortId]}));
    }
    

    useEffect(() => {
        getCategoriesHelper();
    }, []);
    
    

    return (
        <Container className="d-flex flex-column">
            <Container className="text-center">
                <AddCategory getCategoriesHelper={getCategoriesHelper}/>
            </Container>
            <Table striped hover >
                <thead>
                    <tr>
                        <th onClick={() => handleTargetSort('id')}>id</th>
                        <th onClick={() => handleTargetSort('name')}>Name</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       categories ? categories.map((category) => {
                            const {id, name} = category;

                            
                            return (
                                <tr key={id}>
                                    <th>{id}</th>
                                    <th>{name}</th>
                                    <td>
                                        <EditCategory token={token} getCategoriesHelper={getCategoriesHelper} categoryName={name} categoryId={id}/>
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


export default AdminCategories;