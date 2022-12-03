import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../../modals/LoginFormModal';
import './Navigation.css';
import DemoUser from '../auth/DemoUser';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    // let sessionLinks;
    // if (sessionUser) {
       let sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    // } else {
    //     sessionLinks = (
    //         <div className="profile-dropdown">
    //             <div className='dropdiv'>
    //                 <LoginFormModal />
    //             </div>
    //             <div className='dropdiv'>
    //                 <NavLink className="dropbtn" to="/signup">Sign Up</NavLink>
    //             </div >
    //             <div className='dropdiv'>
    //                 <DemoUser />
    //             </div>
    //         </div>
    //     );
    // }

    function changeCSS() {
        // var bodyElement = document.querySelector("body");
        var nav = document.querySelector("nav");
        this.scrollY > 0 ? nav.className= 'navScroll' : nav.className = 'nav';
    }

    window.addEventListener("scroll", changeCSS, false);

    return (
        <nav className = "nav">
            <div>
                <NavLink className="home" to="/"></NavLink>
            </div>
            <div>
                <NavLink className="link"  to="/allCurrentListings">available listings</NavLink>
            </div>
            <div>
                {isLoaded && sessionLinks}
            </div>
            
        </nav>
        
    );
}

export default Navigation;