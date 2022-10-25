import './UserPage.css';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams} from "react-router-dom";
import * as sessionActions from "../../store/session";
import * as spotActions from '../../store/spot';
import { getSpot } from '../../store/spot';
import { getImage } from '../../store/image';



function UserPage() {
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

    const { userId } = useParams();

    const history = useHistory();

    

   

    const spots = useSelector(state => {
       
        return state.spot;
    });

    const images = useSelector(state => {
       
        return state.image;
    });
  

    const imgArr = Object.values(images)
    const spotsArr = Object.values(spots);

    
    const spotMapFunc = () => spotsArr.map((spot) => {
        if (spot !== null && parseInt(userId) === spot.userId){
            const thisSpot = spot




            let allImages = () => imgArr.map((image) => {
                if (image !== null && parseInt(thisSpot.id) === image.spotId) {



                    return (

                        <div key={image.id}>
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
            <div key={spot.id} className='spotbtndiv'>

                <button className="spotbtn" onClick={handleClick} key={thisSpot.id}>
                    
                    <div className='imgdiv'>
                        {allImages()}
                    </div>
                    
                    <div className='pricediv'>
                        <div className='price'> ${spot.price} </div>
                         night
                    </div>
                    <div className='citydiv'>
                        {spot.city}, {spot.state}
                    </div>

                </button >
            </div >
        )}

    })

 

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    return (
        <>
            {/* <h2 className = "title">My Listings</h2> */}
            {!spotsArr.length && <span>No listings.</span>}
            <ul className="spot-list">
                {spotMapFunc()}
            </ul>
        </>
    );
}

export default UserPage;