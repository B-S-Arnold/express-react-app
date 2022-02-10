import './UserPage.css';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams} from "react-router-dom";
import * as sessionActions from "../../store/session";
import * as spotActions from '../../store/spot';
import { getSpot } from '../../store/spot';


function UserPage() {

    

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpot())
    }, [dispatch])

    const {userId} = useParams();
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
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                
                This is user page of number: {`${userId}`}

                
            </label>
            
        </form>
    );
}

export default UserPage;