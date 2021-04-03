import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdated, eventUpdated, } from '../../actions/events';
import Select from 'react-select'
import { CloseModalButton } from '../ui/CloseModalButton';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const now = moment().minutes(0).second(0).add(1, 'hours');
const noNow = now.clone().add(1, 'h');
Modal.setAppElement('#root')
const initEvent = {
    adress: '',
    start: now.toDate(),
    serviceType: 'Casa 1 planta ',
    end: noNow.toDate(),
}

export const CalendarModal = () => {
    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.ui)
    const { activeEvent } = useSelector(state => state.calendar)
    const [dateStart, setDateStart] = useState(now.toDate())
    const [titleValid, setTitleValid] = useState(true)
    const [formValues, setFormValues] = useState(initEvent)
    const { adress, start, serviceType } = formValues;
    const optionsServiceTypes = [
        { value: 'Automóvil', label: 'Automóvil' },
        { value: 'Casa 1 planta ', label: 'Casa 1 planta ' },
        { value: 'Casa 2 plantas', label: 'Casa 2 plantas' },
        { value: 'Negocio', label: 'Negocio' },
        { value: 'Especial', label: 'Especial' },
    ]
    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent)
        } else {
            setFormValues(initEvent)
        }
    }, [activeEvent, setFormValues])

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    const handleSelectChange = ({ value }) => {
        setFormValues({
            ...formValues,
            serviceType: value,
        })
    }

    const closeModal = () => {
        setFormValues(initEvent)
        dispatch(eventClearActiveEvent());
        dispatch(uiCloseModal());
    }

    const handleStartDateChange = (e) => {
        setFormValues({
            ...formValues,
            start: e
        })
        setDateStart(e)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (adress.trim().length < 2) {
            return setTitleValid(false);
        }
        formValues.end = moment(start).add(1, 'h').toDate();
        if (activeEvent) {
            dispatch(eventStartUpdated(formValues))
        } else {
            dispatch(eventStartAddNew(formValues))
        }
        // TODO: Realizar grabación. 
        setTitleValid(true);
        closeModal();

    }


    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <CloseModalButton title={(activeEvent) ? 'Editar evento' : 'Nuevo evento'} />
            <h6> {(activeEvent) ? `${activeEvent.user.name}` : ''}  </h6>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                    />
                </div>
                <hr />
                <div className="form-group">
                    <label>Tipo de servicio</label>
                    <Select name='serviceType' defaultValue={{ value: serviceType, label: serviceType }} onChange={handleSelectChange} options={optionsServiceTypes} />
                </div>

                <hr />
                <div className="form-group">
                    <label>Dirección</label>
                    <textarea
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Domicilio del servicio..."
                        rows="5"
                        name="adress"
                        value={adress}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
