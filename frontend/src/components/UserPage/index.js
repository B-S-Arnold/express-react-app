import './UserPage.css';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams} from "react-router-dom";
import * as sessionActions from "../../store/session";
import * as spotActions from '../../store/spot';
import { getSpot } from '../../store/spot';


function UserPage() {

    const { userId } = useParams();

   

    const spots = useSelector(state => {
        console.log("STATE",state)
        return state.spot;
    });
    console.log("SPOTTTSSS", spots)

    const spotsArr = Object.values(spots);
    const spotMapFunc = () => spotsArr.map((spot) => {
        if (spot !== null && parseInt(userId) === spot.userId){
        return (
            <>
                <div>
                    Name is {spot.name}
                </div>
                <div>
                    Id is {spot.id}
                </div>
                <div>
                    userId is {spot.userId}
                </div>
                <div>
                    Param userid is {userId}
                </div>
            </>
        )}

    })

    // console.log("SPOTTTS ARRRR", spotsArr)

    
    
    

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpot())
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
    

    // if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    return (
        <>
            <h2>All spots</h2>
            {!spotsArr.length && <span>No produce available right now.</span>}
            <ul className="produce-list">
                {spotMapFunc()}
            </ul>
        </>
    );
}

export default UserPage;