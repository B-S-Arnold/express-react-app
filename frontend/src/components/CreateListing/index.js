import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './NewListing.css';
import * as spotActions from "../../store/spot";



function CreateListing() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();

    if (!sessionUser){
        history.push('/')
        window.location.reload()
    }

    

   
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);


    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    
    const userId = sessionUser.id

    let payload = {
            userId,
            address,
            city,
            state,
            country,
            name,
            price,
            description
    };


    

    

    const handleSubmit = (e) => {
        e.preventDefault();
        let path = `/users/${payload.userId}`
        
        
       
        return dispatch(spotActions.createSpot(payload))
                .then( () => {
                    history.push(path)},
                    async (res) => {
                        const data = await res.json 
                        if (data && data.errors) setErrors(data.errors);
                    } 
                );
        
    };
    const handleCancelClick = (e) => {
        e.preventDefault();
        let path = `/`
        history.push(path)
        
    };

    

    return (
        <div className="formpage">
        <form className = "form" onSubmit={handleSubmit}>
            
            <div className="title">
                Create a listing for people to stay
            </div>
            <div className='desc'>
                 Give a detailed description to increase your listing's appeal.
            </div>

                {errors?.length ? <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>: <></>}
                
            <div className='sindiv'>
                <label className="sinlab"> ADDRESS </label>
                <input
                    className="inloc"
                    type="text"
                    value={address}
                    onChange={updateAddress}
                    // placeholder='Address'
                    required
                />
            
            </div>
            <div className='sindiv'>
                <label className="sinlab"> CITY </label>
                <input
                    className="inloc"
                    type="text"
                    value={city}
                    onChange={updateCity}
                    required
                />
            </div>
            <div className='sindiv'>
                    <label className="sinlab"> STATE </label>
                    <input
                        className="inloc"
                        type="text"
                        value={state}
                        onChange={updateState}
                        required
                    />
                
            </div>
            <div className='sindiv'>
                    <label className="sinlab"> COUNTRY </label>
                    <input
                        className="inloc"
                        type="text"
                        value={country}
                        onChange={updateCountry}
                        required
                    />
                
            </div>
            <div className='sindiv'>
                    <label className="sinlab"> NAME </label>
                    <input
                        className="inloc"
                        type="text"
                        value={name}
                        onChange={updateName}
                        required
                    />
                
            </div>
            <div className='sindiv'>
                    <label className="sinlab"> PRICE </label>
                    <input
                        className="inloc"
                        type="number"
                        min="0"
                        step=".01"
                        value={price}
                        onChange={updatePrice}
                        required
                    />
                
            </div>
            <div className='descdiv'>
                    <label className="sinlab"> DESCRIPTION </label>
                    <textarea
                        className="descin"
                        type="text"
                        value={description}
                        onChange={updateDescription}
                    />
                
            </div>
            <div className = "btndiv">
                <button className = 'formbtn' type="submit">Create Listing</button>
                <button className='formbtn' type="button" onClick={handleCancelClick}>Cancel</button>
            </div>
            
        </form>
        </div>
    );
}


export default CreateListing;