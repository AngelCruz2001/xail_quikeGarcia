import React from 'react'

export const CalendarEvent = ({ event }) => {
    const { serviceType, user } = event;
    return (
        <div>
            <strong>{serviceType}</strong>
            <span> - {user.name}</span>
        </div>

    )
}
