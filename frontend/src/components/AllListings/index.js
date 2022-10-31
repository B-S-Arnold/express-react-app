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

    const [xVal, setxVal] = useState('')
    const [yVal, setyVal] = useState('')

    const { spotId } = useParams();

    const history = useHistory();
    // const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {

        const changeXY = (e) => {
            
            let pointerX = e.pageX;
            let pointerY = e.pageY;
            setxVal(pointerX)
            setyVal(pointerY)

        }

        document.addEventListener('click', changeXY);

        return () => document.removeEventListener("click", changeXY);
    }, []);




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
    let imgArr = Object.values(images)



    const spotMapFunc = () => spotsArr.map((spot) => {
        if (spot !== null) {
            const thisSpot = spot

            
            
            

            let allImages = () => imgArr.map((image) => {

                // const first = users?.filter(usr => usr?.id === thisSpot.userId)[0]

                // function clickToNext() {
                //     // document.getElementsByTagName('img')[0].scrollIntoView();
                //     imgArr.push(imgArr.shift())

                // }

                // function clickToPrev() {
                //     // document.getElementsByTagName('img')[2].scrollIntoView();
                //     imgArr.unshift(imgArr.pop())
                // }

                if (image !== null && parseInt(thisSpot.id) === image.spotId) {
                
                    
                    return (
                        
                        <div className ='fotodiv' key={image.id}>
                            {/* <button onClick={clickToPrev} >To Prev</button>
                            <button onClick={clickToNext} >To Next</button> */}
                            <img
                                className='foto'
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
                <div className='spotbtndiv' key={thisSpot.id}>
                    
                    <button className= "spotbtn" onClick={handleClick} key={thisSpot.id}>
                        
                        <div className='imgdiv'>
                            {allImages()}
                        </div>

                        <div className='citydiv'>
                            {spot.city}, {spot.state}
                        </div>
                        <div className='pricediv'>
                            <div className='price'>${spot.price} </div>
                            night
                        </div>

                    </button >
                </div>
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