import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';
import DemoUser from "./DemoUser";



function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };


    // router.get('/demo-login', asyncHandler(async (req, res) => {

    //     const user = await db.User.findOne({ where: { email: 'demo@demo.com' } });

    //     userLogin(req, res, user);
    //     return req.session.save(() => res.redirect('/'))
    // }));
    const demoLogin = () => {
        
        setCredential('Demo-lition');
        setPassword('password');
        // history.push(path)
    }

    return (
        
        <form className='loginform'onSubmit={handleSubmit}>
            {errors?.length ? <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul> : <></>}
            <div className="title">
                Welcome to PopPilgrim
            </div>
            <div className='sindiv'>
                <label className="sinlab"> USERNAME or EMAIL </label>
                <input
                    className="inloc"
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
            </div>
            <div className='sindiv'>
                <label className="sinlab"> PASSWORD </label>
                    <input
                        className="inloc"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
            </div>
            <button className="sbtn" type="submit">Log In</button>
            
        </form>

    );
}

export default LoginForm;