import React,{useEffect, useState} from "react";
import {useParams} from "react-router";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";



const OneProduct = () => {
    const{idParam} = useParams();
    const[productInfo, setProductInfo] = useState({})
    const history = useHistory();


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${idParam}`)
        .then(res=>{
            console.log("result on one product page", res)
            setProductInfo(res.data.results)
        })
        .catch(err=>console.log("error on one product page ", err))
    }, [idParam])

    const deleteClickHandler = () =>{
        console.log("after deleting the priduct!!", productInfo._id)
        axios.delete(`http://localhost:8000/api/products/${productInfo._id}`)
        .then(res=>{
            console.log('response after delete', res)
            history.push('/')
            
        })
        .catch(err=>console.log(err))
    }


    return (
        <div>
            <h1>Info about product with id of {idParam}</h1>
            <p>Title: {productInfo.title}</p>
            <p>Price: {productInfo.price}</p>
            <p>Description:{productInfo.description}</p>
            <p className="btn btn-primary"><button onClick={deleteClickHandler} className="btn btn-danger">Delete</button> || <Link className="btn btn-info" to="/">Back</Link></p>

        </div>
    );
};



export default OneProduct;