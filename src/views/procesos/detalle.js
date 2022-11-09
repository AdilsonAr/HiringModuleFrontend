import React, { useState } from 'react';
import Nav from '../layout';
import axios from 'axios';
import swal from 'sweetalert';
import Detalle from '../../components/procesos/detalle';
import { getUser } from '../../store/UserProvider';

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // An function that increment 👆🏻 the previous state like here 
    // is better than directly setting `value + 1`
}

const Det = (props) => {
    const [item, setItem] = useState(props.location.state.item[0]);
    const forceUpdate = useForceUpdate();

    function canAcept() {
        let role = getUser().role;
        if (role == "ROLE_ADMIN" || role == "ROLE_GERENTERRHH")
            return true;
    }

    function handleAcept(x, i) {
        let urlRe = "http://localhost:8080/aplicacion/acept?id_aplicacion=" + (x.idAplicacion * 1);
        console.log(urlRe);
        swal({
            title: "Estás seguro de aceptar a " + x.nombre + "?",
            text: "Se guardará la aplicación como aceptada",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willAcept) => {
            if (willAcept) {
                axios({ url: urlRe, method: 'put', auth: getUser().token }).then(function (response) {
                    if (response.status == 200) {
                        swal({
                            title: "Candidato aceptado",
                            text: "La operación fue completada con éxito",
                            icon: "success",
                            button: "Ok",
                        }).then(() => {
                            var itemNew =Object.assign({}, item);
                            var xNew =Object.assign({}, x);
                            xNew.aceptada = 'S';
                            itemNew.candidatos[i] = xNew;
                            setItem(itemNew);
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
            } else {
                swal("No se aceptó a ningun candidato");
            }
        });
    }

    function aceptWrapper(x,i){
        handleAcept(x, i)
        forceUpdate();
    }

    return (
        <div className='container'>
            <Nav />
            <h5 className='my-4'>{item.titulo}</h5>
            <hr />
            <p>funciones: </p>
            <p>{item.funciones}</p>
            <hr />
            <p>requerimientos: </p>
            <p>{item.requerimientos}</p>

            <h6 className='my-4'>Aplicaciones recibidas</h6><hr />
            <table>
                <tbody>
                    {item.candidatos.map((x, i) => {
                        return (<tr key={x.idCandidato} id={x.idCandidato}>
                            <td>
                                <p><b>nombre: {x.nombre}</b></p><div style={{ display: 'inline-block', justifyContent: 'left' }}>{canAcept() && x.aceptada == 'N' ? <button className='mx-2' onClick={() => aceptWrapper(x, i)} style={{ backgroundColor: 'yellow', border: "0" }}>Aceptar candidato</button> : null}
                                    {x.aceptada == 'S' ? <Detalle text={"Aceptado"} color={'#e6add8'} /> : null}
                                </div>
                                <div style={{ paddingLeft: "5%" }}>
                                    <p>DUI: {x.dui}</p>
                                    <p>NIT: {x.nit}</p>
                                    <p>fecha de nacimiento: {x.fechaNacimiento}</p>
                                    <p>licencia de conducir: {x.licenciaConducir}</p>
                                    <p>estado civil: {x.estadoCivil}</p>
                                    <p>teléfono: {x.telefono}</p>
                                    <p>correo: {x.correo}</p>
                                    <p>habilidades: {x.habilidades}</p>
                                    <p>calificación de prueba psicológica: {x.calificacionPsicologica}</p>
                                </div>
                                <hr />
                            </td>
                        </tr>)
                    })}
                    {item.candidatos.length == 0 ?
                        <tr><td><p><b>No se han recibido aplicaciones todavia</b></p></td></tr>
                        : null
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Det;