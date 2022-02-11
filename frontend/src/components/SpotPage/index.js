import './SpotPage.css';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import * as spotActions from '../../store/spot';
import { getSpot } from '../../store/spot';


function SpotPage() {
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

    const { spotId } = useParams();

    const history = useHistory();

    

    


    const spots = useSelector(state => {
        console.log("STATE", state)
        return state.spot;
    });
    console.log("SPOTTTSSS", spots)

    const spotsArr = Object.values(spots);
    const spotMapFunc = () => spotsArr.map((spot) => {
        if (spot !== null && parseInt(spotId) === spot.id) {
            const thisSpot = spot

        const deleteButton = (e) => {
            e.preventDefault();
            let path = `/users/${thisSpot.userId}`

            console.log("PAYLOAD!!!!!!!!", thisSpot)


            // setErrors([]);
            return dispatch(spotActions.deleteSpot(thisSpot))
                .then(() => {
                    history.push(path)
                },
                    async (res) => {
                        const data = await res.json()
                        if (data && data.errors) setErrors(data.errors);
                    }
                );

        };


        
            return (
                <div key={thisSpot.id}>
                    <div>
                        Name is {spot.name}
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
                    <button onClick={deleteButton}>
                        Delete Spot
                    </button>
                </div >
            )
        }

    })

    

    // console.log("SPOTTTS ARRRR", spotsArr)








    // if (sessionUser) return <Redirect to="/" />;

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    // };

    return (
        <>
            <h2>Particular Spot</h2>
            {!spotsArr.length && <span>No produce available right now.</span>}
            <ul className="spot">
                {spotMapFunc()}
            </ul>
        </>
    );
}

export default SpotPage;