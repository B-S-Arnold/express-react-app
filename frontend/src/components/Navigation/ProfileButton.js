import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory, Redirect } from 'react-router-dom';


function ProfileButton({ user }) {
    const dispatch = useDispatch();

    const history = useHistory();
    
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };
    

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    const createListing = () => {
        let path = '/createListing'
        history.push(path)
    }

    const myListings = () => {
        let path = `/users/${user.id}`
        history.push(path)
    }

    return (
        <>
            <button className = 'link' onClick={openMenu}>
                <i className="fas fa-hiking" >  ~ {user.username} ~ </i>
            </button>
            {showMenu && (
                <div className="profile-dropdown">
                    
                    
                    <div className="dropdiv">
                        <button className = "dropbtn" onClick={createListing}>Create Listing</button>
                    </div>
                    <div className="dropdiv">
                        <button className="dropbtn" onClick={myListings}>My Listings</button>
                    </div>
                    <div className="dropdiv">
                        <button className="dropbtn" onClick={logout}>Log Out</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProfileButton;