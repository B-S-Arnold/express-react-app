import './UserPage.css';

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams} from "react-router-dom";
import * as sessionActions from "../../store/session";


function UserPage() {
    const dispatch = useDispatch();
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
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
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