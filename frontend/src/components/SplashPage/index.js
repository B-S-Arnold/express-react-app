import './SplashPage.css';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import * as spotActions from '../../store/spot';
import { getSpot } from '../../store/spot';
import ReviewFormModal from '../ReviewModal';
import { getReview } from '../../store/review';
import { getImage } from '../../store/image';


function SplashPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpot())
        dispatch(getReview())
        dispatch(getImage())
        // console.log("DISPAPAAP SPOT",dispatch(getSpot()))
    }, [dispatch])
    // console.log("DISPATCH",dispatch.spots)


    // console.log("USER ID", userId);

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
        // console.log("STATE", state)
        return state.spot;
    });

    const images = useSelector(state => {
        // console.log("STATE", state)
        return state.image;
    });

    const reviews = useSelector(state => {
        // console.log("STATE", state)
        return state.review;
    });

    const spotsArr = Object.values(spots);
    const imgArr = Object.values(images)
    const rvwArr = Object.values(reviews)


    console.log("SPOTTTSSS", spots)


    const spotMapFunc = () => spotsArr.map((spot) => {
        if (spot !== null) {
            const thisSpot = spot

            

                // console.log("PAYLOAD!!!!!!!!", thisSpot)


                

            // let allReviews = () => {

            // }

            let allReviews = () => rvwArr.map((review) => {
                if (review !== null && parseInt(spotId) === review.spotId) {
                    return (

                        <div key={review.id}>
                            <div>
                                Review: {review.content}
                            </div>
                        </div>

                    )
                }
            })


            
            






            return (

                <button key={thisSpot.id}>
                    <h2>
                        {spot.name}
                    </h2>
                    
                    <div>
                        {allReviews()}
                    </div>
                    
                </button >
            )
        }

    })



    // console.log("SPOTTTS ARRRR", spotsArr)








    // if (sessionUser) return <Redirect to="/" />;

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    // };

    return (
        <>

            {!spotsArr.length && <span>No produce available right now.</span>}
            <ul className="spot">
                {spotMapFunc()}
            </ul>
        </>
    );
}

export default SplashPage;