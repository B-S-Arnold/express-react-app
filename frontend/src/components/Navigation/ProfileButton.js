import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useNavigate, Redirect, NavLink } from 'react-router-dom';
import DemoUser from "../auth/DemoUser";
import LoginFormModal from "../../modals/LoginFormModal";
import LoginForm from "../auth/LoginForm";
import './Dropdown.css'
import { Modal } from "../../context/Modal";
import SignupFormPage from "../SignupFormPage";


function ProfileButton() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    const navigate = useNavigate();

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
        navigate('/')
        // window.location.reload()
    };

    const createListing = () => {
        let path = '/createListing'
        navigate(path)
    }

    const myListings = () => {
        let path = `/users/${user.id}`
        navigate(path)
    }

    const addImage = () => {
        let path = '/addImage'
        navigate(path)
    }


    if (user) {
        return (
            <>
                <div className='navbtn' id='focus' tabIndex="1" >
                    <div className="icondiv1">
                        <i className="fas fa-bars" />
                    </div>
                    <div className="icondiv2">
                        <div className="userbtn"></div>
                    </div>


                </div>
                {/* {showMenu && ( */}
                    <div className="dropdown">


                        <div className="dropdiv">
                            <button className="dropbtn topdrop" onClick={createListing}>Create listing</button>
                        </div>
                        <div className="dropdiv">
                            <button className="dropbtn topdrop" onClick={addImage}>Add Image Form</button>
                        </div>
                        <div className="dropdiv">
                            <button className="dropbtn middrop" onClick={myListings}>My listings</button>
                        </div>
                        <div className="dropdiv">
                            <button className="dropbtn btmdrop" onClick={logout}>Log out</button>
                        </div>
                    </div>
                {/* )} */}
            </>
        )
    } else {
        return (
            <>
                <div className='navbtn' id='focus' tabIndex="1" >
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

                </div>
                {/* {showMenu && ( */}
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

                {/* )} */}
            </>
        )

    }
}

export default ProfileButton;