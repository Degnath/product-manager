import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Edit = () => {
    const {idParam} = useParams();
    const history = useHistory();


    const[productInfo, setProductInfo] = useState({})

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${idParam}`)
        .then(res=>{
            console.log("response when trying to get on product edited", res)
            setProductInfo(res.data.results)
        })
        .catch(err=>console.log(err))
    }, [idParam])


    const changeHandler=(e)=>{
        console.log("changing after edit form")
        console.log(e.target.name, e.target.value)
        setProductInfo({
            ...productInfo, [e.target.name]:e.target.value
        })

    }


    const submitHandler = (e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/products/${idParam}`, productInfo)
        .then(res=>{
            console.log("response after put request", res)
            history.push(`/products/${idParam}`)
        })
        .catch(err=>console.log(err))
      }
    return (
        <div >
            <h3>Edit product here</h3>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input onChange={changeHandler} type="text" className="form-control" name="title"  value={productInfo.title}  placeholder="Enter title here"/>
                </div>
                <br/>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input onChange={changeHandler} type="text" className="form-control" name="price" value={productInfo.price} placeholder="Enter price"/>
                </div>
                <br/>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input onChange={changeHandler} type="text" className="form-control" name="description"  value={productInfo.description} placeholder="Enter description"/>
                </div>
                <br/>
                <input className="btn btn-info" type="submit" value ="Edit Product"/>
                <p><Link className="btn btn-primary mt-3" to="/">Back</Link></p>
            </form>

        </div>
    );
};



export default Edit;