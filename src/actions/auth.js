import Swal from "sweetalert2"
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types"
import { eventLogout } from "./events"




export const startLogin = (username, password) => {
    return async (dispatch) => {
        const res = await fetchSinToken('auth', { username, password }, 'POST')
        const body = await res.json()
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name,
                rol: body.rol,
            }));
        } else {
            console.log(body)
            Swal.fire('error', body.msg, 'error')
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        const res = await fetchConToken('auth/renew')
        const body = await res.json()
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name,
                rol: body.rol,
            }));
        } else {
            dispatch(checkingFinish())
        }
    }
}

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear()
        dispatch(eventLogout())
        dispatch(logout())
    }

}

export const startChangePassword = () => {
    return async (dispatch, getState) => {
        const { value: password } = await Swal.fire({
            title: 'Ingresa tu nueva contraseña',
            input: 'password',
            inputLabel: 'Contraseña:',
            inputPlaceholder: 'Nueva contraseña...',
            inputAttributes: {
                autocapitalize: 'off',
                autocapitalize: 'off',
                autocorrect: 'off'
            },
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value.length <= 5) {
                        resolve('La contraseña debe debe 6 caracteres como mínimo)')
                    } else {
                        resolve()
                    }
                })
            }
        })

        if (password) {
            try {
                const newPassword = { password }
                const res = await fetchConToken(`users/pass/${getState().auth.uid}`, newPassword, 'PUT')
                const body = await res.json()
                if (body.ok) {
                    Swal.fire(`Contraseña cambiada a: ${password}`)
                } else {
                    Swal.fire('Error', body.msg, 'error')
                }
            } catch (error) {
                console.log(error)
                Swal.fire('Error', 'Hablar con el administrador', 'error')
            }
        }

    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish })

const login = (user) => ({
    type: types.authLogin,
    payload: user,
});

const logout = () => ({ type: types.authLogout });
