import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory, Redirect, NavLink } from 'react-router-dom';
import DemoUser from "../auth/DemoUser";
import LoginFormModal from "../../modals/LoginFormModal";
import LoginForm from "../auth/LoginForm";
import './Dropdown.css'
import { Modal } from "../../context/Modal";
import SignupFormPage from "../SignupFormPage";


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
        history.push('/')
        // window.location.reload()
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
            <button className ='navbtn' onClick={openMenu}>
                <div className="icondiv1">
                    <i className="fas fa-bars" />
                </div>
                <div className="icondiv2">
                    <div className="userbtn"></div>
                </div>
                
                
            </button>
            {showMenu && (
                <div className="dropdown">
                    
                    
                    <div className="dropdiv">
                        <button className = "dropbtn topdrop" onClick={createListing}>Create listing</button>
                    </div>
                    <div className="dropdiv">
                        <button className="dropbtn middrop" onClick={myListings}>My listings</button>
                    </div>
                    <div className="dropdiv">
                        <button className="dropbtn btmdrop" onClick={logout}>Log out</button>
                    </div>
                </div>
             )} 
        </>
    )
    } else {
        return(
            <>
                <button className='navbtn' onClick={openMenu}>
                    <div className="icondiv1">
                        <i className="fas fa-bars" />
                    </div>
                    <div className="icondiv2">
                        <div className="userbtn"></div>
                    </div>
                    
                {renderModal && (
                    <Modal onClose={() => setRenderModal(false)}>
                        <LoginForm />
                    </Modal>
                )}
                {renderModalTwo && (
                    <Modal onClose={() => setRenderModalTwo(false)}>
                        <SignupFormPage />
                    </Modal>
                )}
                  
                </button>
                {showMenu && (
                    <div className="dropdown">
                        {/* <div className="dropdiv">
                            <LoginFormModal  />
                        </div> */}
                        <div className="dropdiv">
                            <button className='dropbtn topdrop' onClick={() => {
                                // e.preventDefault()
                                setRenderModal(true)
                                
                            }}>Log in</button>
                        </div>
                        <div className='dropdiv'>
                            <button className='dropbtn middrop' onClick={() => {
                                // e.preventDefault()
                                setRenderModalTwo(true)

                            }}>Sign up</button>
                        </div>
                        
                        
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