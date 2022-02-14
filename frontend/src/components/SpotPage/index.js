import './SpotPage.css';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import * as spotActions from '../../store/spot';
import { getSpot } from '../../store/spot';
import ReviewFormModal from '../ReviewModal';
import { getReview } from '../../store/review';
import { getImage } from '../../store/image';


function SpotPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpot())
        dispatch(getReview())
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
    const rvwArr = Object.values(reviews)

    
    console.log("SPOTTTSSS", spots)

    
    const spotMapFunc = () => spotsArr.map((spot) => {
        if (spot !== null && parseInt(spotId) === spot.id) {
            const thisSpot = spot

        const deleteButton = (e) => {
            e.preventDefault();
            
            let path = `/users/${thisSpot.userId}`
            // history.push(path)
            console.log("THIS SPOT USER ID", thisSpot.userId)
            
            

            // setErrors([]);
            return dispatch(spotActions.deleteSpot(spot))
                .then(() => {
                    history.push(path)
                },
                    async (res) => {
                        // const data = await res.json
                        // if (data && data.errors) setErrors(data.errors);
                    }
                );

        };

            let allImages = () => imgArr.map((image) => {
                if (image !== null && parseInt(thisSpot.id) === image.spotId) {



                    return (

                        <div key={image.id}>
                            <img
                                src={image.url}
                                alt="new"
                            />


                        </div>

                    )
                }
            })

            let allReviews = () => rvwArr.map((review) => {
                if (review !== null && parseInt(spotId) === review.spotId){
                        return (
                            
                            <div key={review.id}>
                                    <div>
                                        Review: {review.content}
                                    </div>
                            </div>
                            
                        )
                    }
                })
                

            let links
            console.log("SPOT LINK",sessionUser)
            if (sessionUser && sessionUser.id === spot.userId){
                links =
                    <>
                    < button onClick={(e) => {
                        e.preventDefault()
                        history.push(`${spot.id}/edit`)
                    }}>
                            Edit Listing
                        </button>
                        < button onClick={deleteButton} >
                            Delete Listing
                        </button >
                    </>
            }
            if (sessionUser && sessionUser.id !== spot.userId){
                links = (<ReviewFormModal />)
            }
                    
            return (
                
                <div key={thisSpot.id}>
                    <h2>
                        {spot.name}
                    </h2>
                    <div>
                        {allImages()}
                    </div>
                    <div>
                        User Id is {spot.UserId}
                    </div>
                    <div>
                        spotId is {spot.id}
                    </div>
                    <div>
                        {spot.description ? `Description is ${spot.description}` : ``}

                    </div>
                    <div>
                        Param spotID is {spotId}
                    </div>
                    
                    <div>
                        {links}
                    </div>
                    <div>
                        {allReviews()}
                    </div>
                    
                </div >
            )
        }

    })


    return (
        <>
            
            {!spotsArr.length && <span>No produce available right now.</span>}
            <ul className="spot">
                {spotMapFunc()}
            </ul>
        </>
    );
}

export default SpotPage;