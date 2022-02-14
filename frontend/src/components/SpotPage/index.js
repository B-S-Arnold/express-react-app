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
import * as reviewActions from "../../store/review"


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
                                height = "500px"
                                width = "500px"
                                src={image.url}
                                alt="new"
                            />


                        </div>

                    )
                }
            })

            let allReviews = () => rvwArr.map((review) => {
                if (review !== null && parseInt(spotId) === review.spotId) {


                const deleteReviewButton = (e) => {
                    e.preventDefault();

                    // let path = `/users/${thisSpot.userId}`
                    // history.push(path)
                    // setErrors([]);
                    return dispatch(reviewActions.deleteReview(review))
                        .then(() => {
                            window.location.reload()
                        },
                            async (res) => {
                                // const data = await res.json
                                // if (data && data.errors) setErrors(data.errors);
                            }
                        );

                };


                let deleteReview
                if (sessionUser && sessionUser.id === review.userId) {
                    deleteReview =
                        <>
                            
                            < button className ="btn" onClick={deleteReviewButton} >
                                Delete
                            </button >
                        </>
                } else {
                    deleteReview =
                        <>
                        </>
                }

                
                        return (
                        
                                <div key={review.id}>
                                        <div className = "indrev">
                                            {review.content} {deleteReview}
                                        </div>
                                </div>
                                
                            
                            
                        )
                    }
                })
                

            let links
            
            if (sessionUser && sessionUser.id === spot.userId){
                links =
                    <>
                    < button className="revbtn" onClick={(e) => {
                        e.preventDefault()
                        history.push(`${spot.id}/edit`)
                    }}>
                            Edit Listing
                        </button>
                        < button className='revbtn' onClick={deleteButton} >
                            Delete Listing
                        </button >
                    </>
            }
            if (sessionUser && sessionUser.id !== spot.userId){
                links = (<ReviewFormModal />)
            }
                    
            return (
                
                <div key={thisSpot.id}>
                    
                    <div className = "imgandinfo">
                        <div className = "imgdiv">
                            {allImages()}
                        </div>
                        <div className = "infodiv">
                            <h2>
                                {spot.name}
                            </h2>
                            <p>
                                {spot.description}
                            </p>
                            <h3>
                                ${spot.price} per Night
                            </h3>
                            <h3>
                                Address:
                            </h3>
                            <h3>
                                {spot.address}, {spot.city}
                            </h3>
                            <h3>
                                 {spot.state}, {spot.country}
                            </h3>
                            
                        </div>
                    </div>

                    <div className = "revtotaldiv">
                        <div className = "revbtndiv">
                            {links}
                        </div>
                        <div className="revdiv">
                            <div className="revtitle">
                                Reviews
                            </div>
                            <div className="reviews">
                            
                                {allReviews()}
                            </div>
                        </div>
                        
                    </div>
                    
                </div >
            )
        }

    })


    return (
        <>
            
            {!spotsArr.length && <span>No spots available right now.</span>}
            <ul className="spot">
                {spotMapFunc()}
            </ul>
        </>
    );
}

export default SpotPage;