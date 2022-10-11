import './AllListings.css';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import * as spotActions from '../../store/spot';
import { getSpot } from '../../store/spot';
import ReviewFormModal from '../ReviewModal';
import { getReview } from '../../store/review';
import { getImage } from '../../store/image';


function AllListingsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpot())
        dispatch(getImage())
    }, [dispatch])


    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("kjl");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const { spotId } = useParams();

    const history = useHistory();
    // const sessionUser = useSelector(state => state.session.user);






    const spots = useSelector(state => {

        return state.spot;
    });

    const images = useSelector(state => {

        return state.image;
    });

    const reviews = useSelector(state => {

        return state.review;
    });

    const spotsArr = Object.values(spots);
    const imgArr = Object.values(images)



    const spotMapFunc = () => spotsArr.map((spot) => {
        if (spot !== null) {
            const thisSpot = spot



            let allImages = () => imgArr.map((image) => {
                if (image !== null && parseInt(thisSpot.id) === image.spotId) {



                    return (

                        <div key={image.id}>
                            <img
                                height="350px"
                                width= "350px"
                                src={image.url}
                                alt="new"
                            />


                        </div>

                    )
                }
            })

            let path = `/spots/${thisSpot.id}`

            const handleClick = (e) => {
                e.preventDefault();
                history.push(path);
            };



            return (

                <button className= "spotbtn btn" onClick={handleClick} key={thisSpot.id}>
                    <h2>
                        {spot.name}
                    </h2>
                    <p>
                        ${spot.price} per Night
                    </p>
                    <p>
                        {spot.city}, {spot.state}, {spot.country}
                    </p>

                    <div>
                        {allImages()}
                    </div>

                    <p>
                        {spot.description}
                    </p>

                </button >
            )
        }

    })




    return (
        <>

            {!spotsArr.length && <span>No spots available right now.</span>}
            <div className="spot-list">
                {spotMapFunc()}
            </div>
        </>
    );
}

export default AllListingsPage;