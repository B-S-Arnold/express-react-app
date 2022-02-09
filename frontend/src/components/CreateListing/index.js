import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './NewListing.css';
import { createSpot } from "../../store/spot";

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
    

    // const updateUserId = (e) => setUserId(sessionUser.id);
    const updateAdress = (e) => setAddress(e.target.value);
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


    const handleSubmit = async (e) => {
        // e.preventDefault();
        // setUserId(sessionUser.id)
    }

    

    return (
        <form>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Address
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </label>
            <label>
                City
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </label>
            <label>
                State
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
            </label>
            <label>
                Country
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
            </label>
            <label>
                Name
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Price
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                    required
                />
            </label>
            <label>
                Description
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <button type="submit">Create Listing</button>
        </form>
    );
}


export default CreateListing;