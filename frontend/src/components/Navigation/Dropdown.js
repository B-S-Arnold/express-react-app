import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../store/session";

const Dropdown = () => {

    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()

    const LogoutButton = () => {
        const dispatch = useDispatch()
        const onLogout = async (e) => {
            await dispatch(logout());
            // navigate(`/`)
        };
        // navigate(`/`)

        return <div className='dropdownbtn logoutbtn' onClick={onLogout}>Logout</div>;
    };

    const ProfileButton = () => {

        const toProfile = () => {
            navigate(`/${user.username}`);
        }

        return <div className='dropdownbtn profbtn' onClick={toProfile}>Profile</div>
        // return <NavLink to={`/${user.username}`} exact={true} activeClassName='active'>
        //     Profile
        // </NavLink>
    };

    const SettingsButton = () => {
        const toSettings = () => {
            navigate(`/accounts/edit/`)
        }

        return <div className='dropdownbtn' onClick={toSettings}>Settings</div>
    }

    // const GameButton = () => {
    //     const toGame = () => {
    //         navigate(`/game`)
    //     }

    //     return <div className='dropdownbtn' onClick={toGame}>Game</div>
    // }


    return (
        <>
            <div className='triangle' />
            <div className="dropdown">


                {/* <div> */}
                <ProfileButton />

                {/* <NavLink className='dropdownbtn' to={`/${user.username}`} exact={true} activeClassName='active'>
                    Profile
                </NavLink> */}
                {/* </div> */}
                {/* <div>
                    <SettingsButton />
                </div> */}
                {/* <div> */}
                {/* <SettingsButton /> */}
                {/* <GameButton /> */}
                <LogoutButton />
                {/* <GameButton /> */}
                {/* </div> */}
            </div>
        </>
    )
}

export default Dropdown;