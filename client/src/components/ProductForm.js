import axios from 'axios';
import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
// import AllProducts from './AllProducts';
// import { Link } from 'react-router-dom';


const ProductForm = (props) => {
    // const[price, setPrice]= useState("");
    // const[title, setTitle] = useState("");
    // const[description, setDescription] = useState("");
    const history = useHistory();

    let [formInfo, setFormInfo] = useState({
        title: null,
        price: null,
        description:null
    })

    let [validationErrors, setValidationErrors] = useState({})
    

    const changeHandler=(e)=>{
        console.log("Change something...")
        console.log(e.target.name, e.target.value)

        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/products", formInfo)
            .then(res=>{
                console.log("response after submitting", res)
            
                

                if(res.data.err){ //if there is validation errors
                    //do not redirect if there is validation errors
                    //store the errors object from the back end into a state variabel so i can display the state variable info on the page
                    setValidationErrors(res.data.err.errors)

                }else{ //if the form is filled out properly
                    history.push("/"); //this redirects to home if form is submitting properly
                    props.setSubmitted(!props.submitted)

                }


                // history.push("/");
            })
            .catch(err=>console.log(err))
    }
    return (
        <div className="container">
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input onChange={changeHandler} type="text" className="form-control" name="title"  placeholder="Enter title here"/>
                    <p className="text-danger">{validationErrors.title?.message}</p>
                </div>
                <br/>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input onChange={changeHandler} type="text" className="form-control" name="price" placeholder="Enter price"/>
                    <p className="text-danger">{validationErrors.price?.message}</p>
                </div>
                <br/>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input onChange={changeHandler} type="text" className="form-control" name="description"  placeholder="Enter description"/>
                    <p className="text-danger">{validationErrors.description?.message}</p>
                </div>
                <br/>
                <input className="btn btn-info" type="submit" value ="Create"/>
            </form>

            <hr/>


        </div>
    );
};



export default ProductForm;