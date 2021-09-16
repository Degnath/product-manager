import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const AllProducts = (props) => {
    // hava a variable to store all the product that get back from api
    const [product, setProduct] = useState([]);
    

    const [deleteClicked, setDeleteClicked] = useState(false);


    // call the api upon initial rendering using useeffect,

    useEffect(()=>{
        axios.get("http://localhost:8000/api/products")
        .then(res=>{
            console.log("request response", res);
            setProduct(res.data.results);
        })
        .catch(err=>console.log("Error msg", err))
        
    }, [deleteClicked, props.submitted])

    const deleteClickHandler = (e, idOfProduct) =>{
        console.log("after deleting the priduct!!", idOfProduct)
        axios.delete(`http://localhost:8000/api/products/${idOfProduct}`)
        .then(res=>{
            console.log('response after delete', res)
            setDeleteClicked(!deleteClicked)
            
            
        })
        .catch(err=>console.log(err))
    }


    return (
        <div>
            <h3>All Products:</h3>
            {
                product.map((product, i)=>{
                    return <div key={i} className="card">
                                <div className="card-body">
                                    <h4 className="card-title btn btn-success"><Link className="btn btn-primary" to={`/products/${product._id}`}>{product.title}</Link> || <Link to={`/products/edit/${product._id}`} className="btn btn-secondary">Edit Product</Link></h4>
                                    <p className="card-text">${product.price}</p>
                                    <p className="card-text">{product.description}</p>
                                    <p><button onClick={(e)=>deleteClickHandler(e,product._id)} className="btn btn-danger">Delete</button></p>
                                </div>
                        </div>
                })
            }
        </div>
    );
};



export default AllProducts;
