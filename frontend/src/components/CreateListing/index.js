import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './NewListing.css';
import * as spotActions from "../../store/spot";


// userId: 1,
// address: "Upper Left Side",
// city: "Ring Two",
// state: "Newest New Hampshire",
// country: "Saturn",
// name: "Beautiful Ledge",
// price: 10,
// description: "Don't fall off..."

function CreateListing() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    
    const [userId, setUserId] = useState(sessionUser.id);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    const history = useHistory();
    

    // const updateUserId = (e) => setUserId(sessionUser.id);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updatePrice = (e) => setPrice(parseInt(e.target.value));
    const updateDescription = (e) => setDescription(e.target.value);
    

    

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (password === confirmPassword) {
    //         setErrors([]);
    //         return dispatch(sessionActions.signup({ email, username, password }))
    //             .catch(async (res) => {
    //                 const data = await res.json();
    //                 if (data && data.errors) setErrors(data.errors);
    //             });
    //     }
    //     return setErrors(['Confirm Password field must be the same as the Password field']);
    // };

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

    // let createdSpot =  dispatch(createSpot(payload))


    const handleSubmit = (e) => {
        e.preventDefault();
        let path = `/users/${payload.userId}`
        
        console.log("PAYLOAD!!!!!!!!", payload)
        
        
            // setErrors([]);
        return dispatch(spotActions.createSpot(payload))
                .then( () => {
                    history.push(path)
                },
                    async (res) => {
                        const data = await res.json() 
                        if (data && data.errors) setErrors(data.errors);
                    } 
                );
        
    };
    const handleCancelClick = (e) => {
        e.preventDefault();
        
    };

    

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Address
                <input
                    type="text"
                    value={address}
                    onChange={updateAddress}
                    required
                />
            </label>
            <label>
                City
                <input
                    type="text"
                    value={city}
                    onChange={updateCity}
                    required
                />
            </label>
            <label>
                State
                <input
                    type="text"
                    value={state}
                    onChange={updateState}
                    required
                />
            </label>
            <label>
                Country
                <input
                    type="text"
                    value={country}
                    onChange={updateCountry}
                    required
                />
            </label>
            <label>
                Name
                <input
                    type="text"
                    value={name}
                    onChange={updateName}
                    required
                />
            </label>
            <label>
                Price
                <input
                    type="number"
                    value={price}
                    onChange={updatePrice}
                    required
                />
            </label>
            <label>
                Description
                <input
                    type="text"
                    value={description}
                    onChange={updateDescription}
                />
            </label>
            <button type="submit">Create Listing</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    );
}


export default CreateListing;