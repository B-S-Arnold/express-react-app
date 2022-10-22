import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
// import '../LoginSignup.css'

const DemoUser = () => {
    const credential = 'Demo-lition';
    const password = 'password'
    const dispatch = useDispatch()
    const onClick = async (e) => {
        await dispatch(login({credential, password}));
    };

    return <button className='dropbtn btmdrop' onClick={onClick}>Log in as Demo User</button>;
};

export default DemoUser;