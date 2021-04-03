import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uiUsersShowAdd } from '../../actions/ui';
import { userStartCreate, userStartDelete, userSetActive, userDelete } from '../../actions/users';

export const UserCard = ({ user, addUser = false, setAddUser }) => {
    const dispatch = useDispatch();
    const { activeUser } = useSelector(state => state.users)
    const { name, username, cellphone, rol, id } = user;

    const handleDeleteClick = () => {
        dispatch(userStartDelete(user.id))
    }

    const handleUpdateClick = () => {
        dispatch(userSetActive(user))
        dispatch(uiUsersShowAdd())
        setAddUser(false);
    }
    return (
        <div className="user__card " >
            <h5>{name} <span className="user__username"> &#8212; {username}</span></h5>
            <div className="user__card-content">
                <div className="user__data">
                    <div className="user__dataLabels">
                        <p className="user__label">Numero de télefono: <span className="user__datadata">{cellphone}</span></p>
                        <p className="user__label">Rol: <span className="user__datadata">{`${(rol == 1) ? 'Administrador' : 'Usuario'}`}</span></p>
                    </div>
                </div>
                <div className="user__buttons">
                    <button className="btn btn-outline-danger  btn-sm mb-2" onClick={handleDeleteClick} >Borrar</button>
                    <button className="btn btn-outline-primary btn-sm" onClick={handleUpdateClick} >Actualizar</button>
                </div>
            </div>
        </div >
    )
}
