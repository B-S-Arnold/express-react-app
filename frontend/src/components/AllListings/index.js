import './AllListings.css';

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpot } from '../../store/spot';
import { getImage } from '../../store/image';
import ListingButton from '../ListingButton/ListingButton';


function AllListingsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpot())
        dispatch(getImage())
    }, [dispatch])

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

            let spotImageArr = imgArr?.filter(img => img?.spotId === spot.id)

            return (
                
                <ListingButton key={spot.id} spot={spot} spotImageArr={spotImageArr} />
                
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