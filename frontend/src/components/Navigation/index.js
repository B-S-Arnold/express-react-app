import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <div className = "sesh-wrapper">
                <div>
                    <LoginFormModal />
                </div>
                <div>
                    <NavLink className = "link" to="/signup">Sign Up</NavLink>
                </div >
            </div>
        );
    }

    return (
        <div className = "wrapper">
            <div>
                <NavLink className="link" exact to="/">Home</NavLink>
            </div>
            <div>
                <NavLink className="link" exact to="/allCurrentListings">Available Listings</NavLink>
            </div>
            <div>
                {isLoaded && sessionLinks}
            </div>
            
            
        </div>
        
    );
}

export default Navigation;