import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useNavigate, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './EditListing.css';
import * as spotActions from "../../store/spot";




// userId: 1,
// address: "Upper Left Side",
// city: "Ring Two",
// state: "Newest New Hampshire",
// country: "Saturn",
// name: "Beautiful Ledge",
// price: 10,
// description: "Don't fall off..."

function EditListing() {
    const dispatch = useDispatch();
    const { spotId } = useParams();


    useEffect(() => {
        dispatch(spotActions.getSpot())

    }, [dispatch])

    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;

    let hello = async (res) => {
        const data = await res.json()

    }

    const spot = useSelector(state => Object.values(state.spot).find(spot => spot && spot.id === parseInt(spotId)));







    const [address, setAddress] = useState(spot ? spot.address : "");
    const [city, setCity] = useState(spot ? spot.city : "");
    const [state, setState] = useState(spot ? spot.state : "");
    const [country, setCountry] = useState(spot ? spot.country : "");
    const [name, setName] = useState(spot ? spot.name : "");
    const [price, setPrice] = useState(spot ? spot.price : "");
    const [description, setDescription] = useState(spot ? spot.description : "");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();



    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);


    const id = parseInt(spotId);

    let payload = {
        id,
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
        let path = `/spots/${spotId}`



        setErrors([]);
        return dispatch(spotActions.editSpot(payload))
            .then(() => {
                navigate(path)
            },
                async (res) => {
                    const data = await res.json()
                    if (data && data.errors) setErrors(data.errors);
                }
            );

    };
    const handleCancelClick = (e) => {
        e.preventDefault();
        let path = `/`
        navigate(path)
    };



    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="formdiv">
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
                        min="0"
                        step=".01"
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
                <div className="btndiv">
                    <button className="btn" type="submit">Submit Edit</button>
                    <button className="btn" type="button" onClick={handleCancelClick}>Cancel</button>
                </div>
            </div>
        </form>
    );
}


export default EditListing;