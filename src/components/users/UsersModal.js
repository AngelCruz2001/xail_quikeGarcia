import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { uiUserCloseModal, uiUsersShowAdd } from '../../actions/ui';
import { userClearActiveUser, userSet, userSetActive, userStartGet } from '../../actions/users';
import { useForm } from '../../hooks/useForm';
import { CloseModalButton } from '../ui/CloseModalButton';
import { UserCard } from './UserCard';
import { UserCardCreateAndUpdate } from './UserCardCreateAndUpdate';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '90vh'
    }
};
Modal.setAppElement('#root')
export const UsersModal = () => {
    const { modalUserOpen } = useSelector(state => state.ui);
    const { users, activeUser } = useSelector(state => state.users);
    const { rol } = useSelector(state => state.auth);
    const { show } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch(uiUserCloseModal());
    }

    const [formValues, handleInputChange] = useForm({ searchUser: '' })
    const { searchUser } = formValues;
    const regex = new RegExp(searchUser, 'gi');
    useEffect(() => {
        if (rol !== 2 && modalUserOpen) {
            dispatch(userStartGet())
        }
    }, [dispatch, rol, modalUserOpen])
    const [addUser, setAddUser] = useState(false)
    const handleAddUser = () => {
        setAddUser(true);
        dispatch(uiUsersShowAdd());
        dispatch(userClearActiveUser())



    }

    return (
        <Modal
            isOpen={modalUserOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal user__modal"
            overlayClassName="modal-fondo"
        >
            <CloseModalButton title='Usuarios' />
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Buscar usuarios..." name="searchUser" value={searchUser} onChange={handleInputChange} />
            </div>
            <div className="user__cards">
                <div className="user__cards-container">
                    {(show) && <UserCardCreateAndUpdate addUser={addUser} />}
                    {(activeUser) ?
                        users.filter(({ name, cellphone, username }) => (name.match(regex) || cellphone.match(regex) || username.match(regex))).map((user, i) => (
                            <div key={i} >
                                <hr />
                                {(activeUser.username !== user.username) && <UserCard user={user} setAddUser={setAddUser} />}
                            </div>
                        ))

                        :

                        users.filter(({ name, cellphone, username }) => (name.match(regex) || cellphone.match(regex) || username.match(regex))).map((user, i) => (
                            <div key={i} >
                                <hr />
                                <UserCard user={user} setAddUser={setAddUser} />
                            </div>
                        ))
                    }


                </div>
            </div>
            <button className={`btn user__btn ${(show) ? 'user__btnCancel' : 'user__btnAdd'}`} onClick={handleAddUser}>
                <i className="fa fa-plus-circle"></i>
                {(show) ? ` Cancelar` : ` Agregar usuario`}
            </button>
        </Modal>
    )
}
