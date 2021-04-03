import { types } from "../types/types";

const initialState = {
    users: [],
    activeUser: null,
}
export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.userSetActive:
            return {
                ...state,
                activeUser: action.payload,
            }
        case types.userClearActive:
            return {
                ...state,
                activeUser: null,
            }
        case types.userCreate:
            return {
                ...state,
                users: [action.payload, ...state.users]
            }
        case types.userUpdate:
            const usersState = state.users.filter(e => (e.id !== action.payload.id))
            return {
                ...state,
                users: [action.payload, ...usersState]
            }
        case types.userSet:
            return {
                ...state,
                users: action.payload
            }
        case types.userDelete:
            return {
                ...state,
                users: state.users.filter(e => (e.id !== action.payload)),
            }
        default:
            return state;
    }
}
