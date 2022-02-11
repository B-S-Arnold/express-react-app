import './UserPage.css';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams} from "react-router-dom";
import * as sessionActions from "../../store/session";
import * as spotActions from '../../store/spot';
import { getSpot } from '../../store/spot';



function UserPage() {
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

    const { userId } = useParams();

    const history = useHistory();

    // const linkToPage = (e) => {
    //     e.preventDefault();
    //     let path = `/spots/${spot.id}`
    //             history.push(path)
            
    // }

   

    const spots = useSelector(state => {
        // console.log("STATE",state)
        return state.spot;
    });
    // console.log("SPOTTTSSS", spots)

    const spotsArr = Object.values(spots);
    const spotMapFunc = () => spotsArr.map((spot) => {
        if (spot !== null && parseInt(userId) === spot.userId){
        return (
            <div key={spot.id}>

                <button onClick={(e) => {
                    e.preventDefault()
                    history.push(`/spots/${spot.id}`)}}>
                        {spot.name}
                </button>
                    
                
                <div>
                    Id is {spot.id}
                </div>
                <div>
                    userId is {spot.userId}
                </div>
                <div>
                    {spot.description ? `Description is ${spot.description}` : ``}
                </div>
                <div>
                    Param userid is {userId}
                </div>
            </div >
        )}

    })

    // console.log("SPOTTTS ARRRR", spotsArr)

    
    
    


    

    // if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    return (
        <>
            <h2>All spots</h2>
            {!spotsArr.length && <span>No produce available right now.</span>}
            <ul className="spot">
                {spotMapFunc()}
            </ul>
        </>
    );
}

export default UserPage;