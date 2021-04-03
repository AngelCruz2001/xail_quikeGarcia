import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userStartCreate, userStartUpdate, userDelete } from '../../actions/users';

export const UserCardCreateAndUpdate = ({ addUser }) => {
    const dispatch = useDispatch();
    const { rol: authRol } = useSelector(state => state.auth)
    const { activeUser } = useSelector(state => state.users)
    const [formValues, setFormValues] = useState(addUser ? { name: '', username: '', cellphone: '', rol: '2', id: '' } : activeUser)
    const { name, username, cellphone, rol, id } = formValues;
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (addUser) {
            dispatch(userStartCreate(formValues))
        } else {
            dispatch(userStartUpdate(formValues))
        }
    }
    return (
        <div className="user__cardCreate user__card ">
            <form onSubmit={handleSubmitForm}>
                <div className="user__inputsContainer">
                    <input name="name" value={name} onChange={handleInputChange} className="user__name" placeholder="Nombre completo" />
                    <input name="username" value={username} onChange={handleInputChange} className="user__username" placeholder="Nombre de usuario" />
                </div>
                <div className="user__card-content">
                    <div className="user__data">
                        <div className="user__dataLabels">
                            <div className="user__inputsContainer">
                                <p className="user__label" style={{ width: '90%' }}>Numero de télefono: </p>
                                <input name="cellphone" value={cellphone} onChange={handleInputChange} className="user__datadata" placeholder="0000000000" />
                            </div>
                            <div className="user__inputsContainer">
                                <p className="user__label">Rol: </p>
                                <select name="rol" id="" className="user__selectRol" value={rol} onChange={handleInputChange}>
                                    {(authRol === 0) && <option value="1">Administrador</option>}
                                    <option value="2">Usuario</option>
                                </select>

                            </div>
                        </div>
                    </div>
                    <div className="user__buttons">
                        <button type="submit" className={`btn btn-sm btn-outline${addUser ? '-success' : '-primary'} `}>{`${addUser ? 'Crear' : 'Actualizar'}`}</button>
                    </div>
                </div>
            </form>
        </div >
    )
}