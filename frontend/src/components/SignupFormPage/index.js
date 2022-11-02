import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);


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
        <form className = "signupform" onSubmit={handleSubmit}>
            {errors?.length ? <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul> : <></>}

            <div className="title">
                Welcome to PopPilgrim
            </div>
            <div className='sindiv'>
                <label className='sinlab'> EMAIL </label>
                <input
                    className='inloc'
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            
            </div>
            <div className='sindiv'>
            <label className='sinlab'> USERNAME </label>
                <input
                    className='inloc'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className='sindiv'>
            <label className='sinlab'> PASSWORD </label>
                <input
                    className='inloc'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className='sindiv'>
            <label className='sinlab'> COMFIRM PASSWORD </label>
                <input
                    className='inloc'
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button className = "sbtn" type="submit">Sign Up</button>
        </form>
    );
}

export default SignupFormPage;