import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory, Redirect, NavLink } from 'react-router-dom';
import DemoUser from "../auth/DemoUser";
import LoginFormModal from "../../modals/LoginFormModal";
import LoginForm from "../auth/LoginForm";
import './Dropdown.css'
import { Modal } from "../../context/Modal";


function ProfileButton() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    const history = useHistory();
    
    const [showMenu, setShowMenu] = useState(false);
    const [renderModal, setRenderModal] = useState(false);
    const [renderModalTwo, setRenderModalTwo] = useState(false);

    

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
    

    if (user) {return (
        <>
            <button className ='link' onClick={openMenu}>
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
    )
    } else {
        return(
            <>
                <button className='userbtn' onClick={openMenu}>
                {renderModal && (
                    <Modal onClose={() => setRenderModal(false)}>
                        <LoginForm />
                    </Modal>
                )}
                  

                    {/* <i className="fas fa-hiking" ></i> */}
                </button>
                {showMenu && (
                    <div className="profile-dropdown">
                        {/* <div className="dropdiv">
                            <LoginFormModal  />
                        </div> */}
                        <button className='dropbtn btn' onClick={() => {
                            // e.preventDefault()
                            setRenderModal(true)
                            
                        }}>Log In</button>
                        
                        <div className='dropdiv'>
                            <NavLink className="dropbtn" to="/signup">Sign Up</NavLink>
                        </div >
                        <div className='dropdiv'>
                            <DemoUser />
                        </div>
                    </div>
                    
                 )} 
            </>
        )

    }
}

export default ProfileButton;