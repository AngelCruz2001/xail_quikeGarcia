import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startChangePassword, startLogout } from '../../actions/auth'
import { uiUsersOpenModal } from '../../actions/ui';
export const Navbar = () => {
    const dispatch = useDispatch();
    const { name, rol } = useSelector(state => state.auth)
    const handleLogout = () => {
        dispatch(startLogout())
    }
    const handleConfig = () => {
        dispatch(uiUsersOpenModal())
    }
    const handleChangePasword = () => {
        dispatch(startChangePassword())
    }

    return (
        <div className="navbar navbar-dark mb-4">
            <span className="navbar-brand">
                {name}
            </span>


            <div>
                {
                    rol !== 2 &&
                    <button
                        className="btn btn-logout"
                        onClick={handleConfig}
                    >
                        <i className="fas fa-users"></i>
                    </button>
                }
                <button
                    className="btn btn-password ml-3"
                    onClick={handleChangePasword}
                >
                    <i className=" fas fa-cog"></i>
                </button>
                <button
                    className="btn btn-logout ml-3"
                    onClick={handleLogout}
                >

                    <i className=" fas fa-sign-out-alt"></i>
                    <span> Salir</span>
                </button>
            </div>
        </div>
    )
}
