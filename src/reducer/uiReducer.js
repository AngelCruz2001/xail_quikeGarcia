import { types } from "../types/types";


const initialState = {
    modalOpen: false,
    modalUserOpen: false,
    show: false,
}
export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true,
            }
        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false,
            }
        case types.uiUserOpenModal:
            return {
                ...state,
                modalUserOpen: true,
            }
        case types.uiUserCloseModal:
            return {
                ...state,
                modalUserOpen: false,
            }
        case types.uiUserShowAdd:
            return {
                ...state,
                show: !state.show,
            }

        default:
            return state;
    }
}
