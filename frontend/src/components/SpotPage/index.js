import './SpotPage.css';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useNavigate, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import * as spotActions from '../../store/spot';
import { getSpot } from '../../store/spot';
import ReviewFormModal from '../ReviewModal';
import { getReview } from '../../store/review';
import { getImage } from '../../store/image';
import * as reviewActions from "../../store/review"




function SpotPage() {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")

    


    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/users');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData()
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

    const navigate = useNavigate();

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


    const spotMapFunc = () => spotsArr.map((spot) => {
        if (spot !== null && parseInt(spotId) === spot.id) {
            const thisSpot = spot

            const deleteButton = (e) => {
                e.preventDefault();

                let path = `/users/${thisSpot.userId}`
                // navigate(path)
                // setErrors([]);
                return dispatch(spotActions.deleteSpot(spot))
                    .then(() => {
                        navigate(path)
                    },
                        async (res) => {
                            // const data = await res.json
                            // if (data && data.errors) setErrors(data.errors);
                        }
                    );

            };


            const displayImages = () => {
                const spotImgArr = imgArr?.filter(img => img?.spotId === thisSpot?.id)
                if (spotImgArr?.length) {
                    const firstImg = spotImgArr.shift()
                    const restImgArr = spotImgArr

                    if (restImgArr.length === 0) {

                        return (
                            <div className='spimgdiv'>
                                {/* <div className='oneimagediv' */}
                                {/* key={firstImg.id}> */}
                                <img
                                    className='spfoto'
                                    src={firstImg.url}
                                    alt="new"
                                />
                                {/* </div> */}
                            </div>

                        )
                    } else {

                        const gridImages = () => restImgArr.map((image) => {

                            return (
                                <div key={image.id} className='gridfotodiv'>
                                    <img
                                        className='gridfoto'
                                        src={image.url}
                                        alt="new"
                                    />
                                </div>
                            )


                        })

                        

                        return (
                            <div className='spimgdiv'>
                                <div className='firstimgdiv'
                                    key={firstImg.id}>
                                    <img
                                        className='spfoto'
                                        src={firstImg.url}
                                        alt="new"
                                    />
                                </div>
                                <div className='gridimgdiv'>
                                    {gridImages()}
                                </div>

                            </div>
                        )


                    }

                }


            }

            let allImages = () => imgArr.map((image) => {
                if (image !== null && parseInt(thisSpot.id) === image?.spotId) {



                    return (

                        <div key={image.id}>
                            <img
                                className='spfoto'
                                src={image.url}
                                alt="new"
                            />


                        </div>

                    )
                }
            })

            let allReviews = () => rvwArr.map((review) => {
                if (review !== null && parseInt(spotId) === review?.spotId) {
                    const commenter = users?.filter(user => user.id === review.userId)[0]

                    const deleteReviewButton = (e) => {
                        e.preventDefault();

                        // let path = `/users/${thisSpot.userId}`
                        // navigate(path)
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

                                < button className="btn" onClick={deleteReviewButton} >
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
                            <div className="indrev">
                                <div className='revname'>
                                    {commenter?.username}
                                </div>
                                <div className='review'>
                                    {review.content} {deleteReview}
                                </div>
                            </div>
                        </div>



                    )
                }
            })


            let links

            if (sessionUser && sessionUser.id === spot.userId) {
                links =
                    <div>
                        < button className="link eddel" onClick={(e) => {
                            e.preventDefault()
                            navigate(`${spot.id}/edit`)
                        }}>
                            Edit Listing
                        </button>
                        < button className='link eddel' onClick={deleteButton} >
                            Delete Listing
                        </button >
                    </div>
            }
            if (sessionUser && sessionUser.id !== spot.userId) {
                links = (<ReviewFormModal />)
            }

            const anyrevs = rvwArr?.filter(rvw => rvw?.spotId === thisSpot.id)

            const spotOwner = users?.filter(usr => usr?.id === thisSpot.userId)[0]

            return (

                <div key={thisSpot.id}>

                    {displayImages()}

                    <div className="infodiv">
                        
                        <div>
                            <div className='citydiv'>
                                {spot.name} by {spotOwner?.username}
                            </div>
                            <hr className='line' />
                            <div className='pricediv'>
                                <div className='spnum'>
                                    ${spot.price}</div> night
                            </div>
                            <div className='sploc'>
                                <div className='citydiv'>
                                    {spot.address}, {spot.city}
                                </div>
                                <div className='citydiv'>
                                    {spot.state}, {spot.country}
                                </div>
                            </div>
                            <div className='pricediv'>
                                {spot.description}
                            </div>
                        </div>
                        <div>

                        </div>



                    </div>

                    <div className="revtotaldiv">
                        <div className="revbtndiv">
                            {links}
                        </div>
                        {anyrevs.length ?
                            <div className="revdiv">


                                <div className="revtitle">
                                    Reviews
                                </div>

                                <div className="reviews">

                                    {allReviews()}
                                </div>
                            </div>
                            : <></>}

                    </div>

                </div >
            )
        }

    })


    return (
        <>

            {!spotsArr.length && <span>No spots available right now.</span>}
            <div className="spotpage">
                {spotMapFunc()}
            </div>
        </>
    );
}

export default SpotPage;