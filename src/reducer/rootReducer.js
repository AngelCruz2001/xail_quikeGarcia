import { combineReducers } from "redux"
import { uiReducer } from "./uiReducer"
import { calendarReducer } from "./calendarReducer"
import { authReducer } from "./authReducer"
import { usersReducer } from "./userReducer"

export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer,
    users: usersReducer,
})