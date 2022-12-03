import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import DemoUser from "../auth/DemoUser";
import { logout } from "../store/session";
import * as sessionActions from '../../store/session';
import { useState } from "react";


const Dropdown = () => {

    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [renderModal, setRenderModal] = useState(false);
    const [renderModalTwo, setRenderModalTwo] = useState(false);

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

    if (user){
        return(
            <><div className="dropdown">


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
            </div></>
        )
    } else {
        return(
            <>
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
            </>
        )
    }

    
}

export default Dropdown;