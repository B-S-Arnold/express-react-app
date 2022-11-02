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
import ListingButton from '../LisingButton/ListingButton';


function AllListingsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpot())
        dispatch(getImage())
    }, [dispatch])


    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const [index, setIndex] = useState(0)
    // const [yVal, setyVal] = useState('')

    const { spotId } = useParams();

    const history = useHistory();

    const toPrev = document?.getElementsByClassName('toPrev')[0]
    const toNext = document?.getElementsByClassName('toNext')[0]

    const spots = useSelector(state => {

        return state.spot;
    });

    const images = useSelector(state => {

        return state.image;
    });

    const spotsArr = Object.values(spots);
    let imgArr = Object.values(images)



    const spotMapFunc = () => spotsArr.map((spot) => {
        if (spot !== null) {

            
            console.log(index)
            let spotImageArr = imgArr?.filter(img => img?.spotId === spot.id)


            return (
                
                    <ListingButton spot={spot} spotImageArr={spotImageArr} />
                
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