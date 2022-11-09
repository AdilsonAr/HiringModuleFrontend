import React, { useState } from 'react';
import Nav from '../layout';
import { getUser } from '../../store/UserProvider';
import Redireccionar from '../../components/redireccionar';
import axios from 'axios';
import swal from 'sweetalert';

const Save = (props) => {
    const [accion, setAccion] = useState(props.location.state.accion);
    const [toProcesos, setToProcesos] = useState(false);

    const [duracionMeses, setDuracion] = useState(props.location.state.item != undefined ? props.location.state.item[0].duracionMeses : '');
    const [titulo, setTitulo] = useState(props.location.state.item != undefined ? props.location.state.item[0].titulo : '');
    const [funciones, setFunciones] = useState(props.location.state.item != undefined ? props.location.state.item[0].funciones : '');
    const [requerimientos, setRequerimientos] = useState(props.location.state.item != undefined ? props.location.state.item[0].requerimientos : '');
    const [idProceso, setIdProceso] = useState(props.location.state.item != undefined ? props.location.state.item[0].idProceso : '');

    function validate() {
        let resultado = true;
        if (duracionMeses <= 0 || duracionMeses%1!=0) {
            swal({
                title: "Error de validacion",
                text: "Meses de duracion es un numero invalido",
                icon: "error",
                button: "Ok",
            });
            resultado = false;
        }
        if (titulo == "" || funciones == "" || requerimientos == "") {
            swal({
                title: "Completa el formulario",
                text: "Todos los campos son requeridos",
                icon: "error",
                button: "Ok",
            });
            resultado = false;
        }
        return resultado
    }

    function handleCreate() {
        if (validate()) {
            var datos = {
                idProceso:idProceso,
                duracionMeses: duracionMeses,
                titulo: titulo,
                funciones: funciones,
                requerimientos: requerimientos
            }

            if (accion == 'create') {
                console.log(JSON.stringify(datos));
                axios({ url: "http://localhost:8080/proceso", method: 'post', data: datos, auth: getUser().token }).then(function (response) {
                    if (response.status == 201) {
                        swal({
                            title: "Registro guardado",
                            text: "La operación fue completada con éxito",
                            icon: "success",
                            button: "Ok",
                        }).then(() => {
                            setToProcesos(true);
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    swal({
                        title: "Tenemos problemas",
                        text: "Hubo un error inesperado",
                        icon: "error",
                        button: "Ok",
                    });
                })
            }

            if (accion == 'update') {
                axios({ url: "http://localhost:8080/proceso", method: 'put', data: datos, auth: getUser().token }).then(function (response) {
                    if (response.status == 200) {
                        swal({
                            title: "Registro modificado",
                            text: "La operación fue completada con éxito",
                            icon: "success",
                            button: "Ok",
                        }).then(() => {
                            setToProcesos(true);
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    swal({
                        title: "Tenemos problemas",
                        text: "Hubo un error inesperado",
                        icon: "error",
                        button: "Ok",
                    });
                })
            }
        }

    }

    function handleDuracion(e) {
        setDuracion(e.target.value);
    }

    function handleTitulo(e) {
        setTitulo(e.target.value);
    }

    function handleFunciones(e) {
        setFunciones(e.target.value);
    }

    function handleRequerimentos(e) {
        setRequerimientos(e.target.value);
    }
    return (
        <div className='container'>
            <Nav />
            {accion == 'create' ? <h5 className='my-4'>Nuevo proceso</h5> : <h5 className='my-4'>Editando proceso</h5>}
            <hr />
            <form>
                <div className="form-group">
                    <label >Duracion en meses</label>
                    <input onChange={(e) => { handleDuracion(e) }} type="number" step={"1"} className="form-control" name="duracionMeses" id="duracionMeses" value={duracionMeses} />
                </div>

                <div className="form-group">
                    <label >Titulo</label>
                    <input onChange={(e) => { handleTitulo(e) }} type="titulo" className="form-control" name="titulo" id="titulo" value={titulo} />
                </div>

                <div className="form-group">
                    <label >Funciones</label>
                    <textarea onChange={(e) => { handleFunciones(e) }} className="form-control" id="funciones" name="funciones" rows="3" value={funciones} ></textarea>
                </div>

                <div className="form-group">
                    <label >Requerimientos</label>
                    <textarea onChange={(e) => { handleRequerimentos(e) }} className="form-control" id="requerimientos" name="requerimientos" rows="3" value={requerimientos}></textarea>
                </div>

                <button type='button' className='btn btn-success my-4' onClick={() => { handleCreate() }}>Guardar</button>
            </form>
            <Redireccionar url="/procesos" estado={toProcesos} />
        </div>
    )
}

export default Save;