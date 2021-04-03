import React, { useEffect, useState } from 'react'
import { Navbar } from '../ui/Navbar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment";
import { messages } from '../../helpers/calendar-messages-es';
import 'moment/locale/es-mx'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoaded } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { UsersModal } from '../users/UsersModal.js';
moment.locale('es-mx')
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector(state => state.calendar)
    const { uid, rol } = useSelector(state => state.auth)
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    useEffect(() => {
        dispatch(eventStartLoaded())
    }, [dispatch])

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal())
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));

    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }
    const onSelectSlot = () => {
        dispatch(eventClearActiveEvent())
    }
    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }
        return {
            style
        }
    }
    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccesor='start'
                endAccesor='start'
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onSelectSlot={onSelectSlot}
                selectable={true}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                view={lastView}
                onView={onViewChange}
            />
            <AddNewFab />


            {(activeEvent) && (rol !== 2) && <DeleteEventFab />}
            <CalendarModal />
            <UsersModal />

        </div>
    )
}
