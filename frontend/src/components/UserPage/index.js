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
    const [email, setEmail] = useState("kjl");

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
            <div key={spot.id}>

                <button onClick={handleClick} key={thisSpot.id}>
                    <h2>
                        {spot.name}
                    </h2>

                    <div>
                        {allImages()}
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
            <h2>All spots</h2>
            {!spotsArr.length && <span>No listings.</span>}
            <ul className="spot">
                {spotMapFunc()}
            </ul>
        </>
    );
}

export default UserPage;