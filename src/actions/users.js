import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import generator from 'generate-password'
import Swal from "sweetalert2";
import { uiUsersShowAdd } from "./ui";

export const userStartGet = () => {
    return async (dispatch, getState) => {
        try {
            const resp = await fetchConToken('users');
            const body = await resp.json();
            if (body.ok) {
                dispatch(userSet(body.users.filter(e => e.id !== getState().auth.uid)));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const userStartDelete = (id) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`users/${id}`, {}, 'DELETE');
            const body = await resp.json();
            if (body.ok) {
                dispatch(userDelete(id))
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
    }
}

export const userStartCreate = (user) => {
    return async (dispatch) => {
        try {
            const newPassword = generator.generate({ length: 6, numbers: true })
            user.password = newPassword;
            const resp = await fetchConToken(`users/new`, user, 'POST');
            const body = await resp.json();
            if (body.ok) {
                dispatch(uiUsersShowAdd());
                dispatch(userCreate(user))
                Swal.fire({
                    title: 'Usuario creado exitosamente',
                    icon: 'success',
                    showCloseButton: true,
                    html: `<p>Esta es la contraseña de: ${user.username} <br/>Contraseña: ${newPassword}</p>`
                })

            } else {
                console.log(body)
                Swal.fire('Error', body.msg, 'error')

            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
    }
}
export const userStartUpdate = (user) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`users/${user.id}`, user, 'PUT');
            const body = await resp.json();
            if (body.ok) {
                dispatch(uiUsersShowAdd());
                dispatch(userUpdate(user))
                dispatch(userClearActiveUser())
                Swal.fire({
                    title: 'Usuario actualizado exitosamente',
                    icon: 'success',
                    showCloseButton: true,
                })

            } else {
                console.log(body)
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
            dispatch(uiUsersShowAdd())
            Swal.fire('Error', 'Hablar con el administrador', 'error')
        }
    }
}

export const userSetActive = (user) => ({
    type: types.userSetActive,
    payload: user,
});

export const userClearActiveUser = () => ({ type: types.userClearActive });

const userCreate = (user) => ({
    type: types.userCreate,
    payload: user,
});
const userUpdate = (user) => ({
    type: types.userUpdate,
    payload: user,
});
const userSet = (users) => ({
    type: types.userSet,
    payload: users,
});

export const userDelete = (id) => ({
    type: types.userDelete,
    payload: id,
});