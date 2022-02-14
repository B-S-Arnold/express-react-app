import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

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
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <label>
                Username or Email
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button className="btn" type="submit">Log In</button>
            <button className="btn" onClick={demoLogin}> Demo User</button>
        </form>
    );
}

export default LoginForm;