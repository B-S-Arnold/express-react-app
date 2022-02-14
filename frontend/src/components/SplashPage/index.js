import './SplashPage.css';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import * as spotActions from '../../store/spot';
import { getSpot } from '../../store/spot';
import ReviewFormModal from '../ReviewModal';
import { getReview } from '../../store/review';
import { getImage } from '../../store/image';


function SplashPage() {
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

    const { spotId } = useParams();

    const history = useHistory();
    // const sessionUser = useSelector(state => state.session.user);




    return (
        <div className="blurb">
            <h1 className ="title">
                Welcome to PopPilgrim
            </h1>
            <div className ="par">
                <h2>
                    PopPilgrim is a site to book your next
                </h2>
                <h2>
                    dream trip. You can even list your own
                </h2>
                <h2>
                    property to rent. PopPilgrim is a great
                </h2>
                <h2>
                    way to travel the world, and also a great
                </h2>
                <h2>
                    way to make some extra income. So set sail
                </h2>
                <h2>
                    to you next destination, or host your own
                </h2>
                <h2>
                    property to be someone elses.
                </h2>
            </div>


        </div>
    );
}

export default SplashPage;