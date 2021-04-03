import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import { sanitizationVectorRe, logoCleanIsGood } from '../../resources/resources'
import './login.css';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const [formLoginValues, handleLoginInputChange] = useForm({
        lUsername: "",
        lPassword: ""
    })
    const { lUsername, lPassword } = formLoginValues;
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(lUsername, lPassword))
    }

    return (
        <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
            <div className="card card0 border-0">
                <div className="row d-flex">
                    <div className="col-lg-6">
                        <div className="card1 pb-5">
                            <div className="row"> <img src={logoCleanIsGood.image} className="logo" /> </div>
                            <div className="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src={sanitizationVectorRe.svg} className="image" /> </div>
                        </div>
                    </div>
                    <div className="col-lg-6 align-self-center text-center">
                        <div className="card2 card border-0 px-4 py-5 ">

                            <div className="row px-3 mb-4">
                                <div className="line"></div>
                                <div className="line"></div>
                            </div>
                            <div className="row px-3"> <label className="mb-1">
                                <h6 className="mb-0 text-sm">Usuario</h6>
                            </label>
                                <input className="mb-4" type="text" name="lUsername" value={lUsername} placeholder="Ingrese un nombre de usuario valido..." onChange={handleLoginInputChange} /> </div>
                            <div className="row px-3"> <label className="mb-1">
                                <h6 className="mb-0 text-sm">Contraseña</h6>
                            </label>
                                <input type="password" name="lPassword" value={lPassword} placeholder="Ingrese su contraseña..." onChange={handleLoginInputChange} /> </div>
                            <div className="row mt-3 mb-3 px-3">
                                <button
                                    type="submit"
                                    className="btn btn-blue text-center"
                                    onClick={handleLogin}
                                >
                                    Ingresar
                                </button>
                            </div>
                            <div className="row px-3 mb-4">
                                <div className="line"></div>
                                <div className="line"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-blue py-4">
                    <div className="row px-3"> <small className="ml-4 ml-sm-5 mb-2">Copyright &copy; 2021. JPG Todos los derechos reservados.</small>
                        <div className="social-contact ml-4 ml-sm-auto"> <span className="fa fa-facebook mr-4 text-sm"></span> <span className="fa fa-google-plus mr-4 text-sm"></span> <span className="fa fa-linkedin mr-4 text-sm"></span> <span className="fa fa-twitter mr-4 mr-sm-5 text-sm"></span> </div>
                    </div>
                </div>
            </div>
        </div>
    )
}