import React from 'react'
import { useDispatch } from 'react-redux'
import { uiCloseModal, uiUserCloseModal } from '../../actions/ui'

export const CloseModalButton = ({ title }) => {
    const dispatch = useDispatch()
    const handleClickClose = () => {
        dispatch(uiCloseModal())
        dispatch(uiUserCloseModal())
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '95%',
        }}>
            <h1>{title}</h1>
            <i className="ui__closeButton fas fa-times" onClick={handleClickClose}></i>
        </div>
    )
}
