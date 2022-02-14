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
        <>
            <h1>
                Welcome to PopPilgrim
            </h1>
        </>
    );
}

export default SplashPage;