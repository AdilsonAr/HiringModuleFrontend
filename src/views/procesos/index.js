import React, { useEffect, useState } from 'react';
import { getUser } from '../../store/UserProvider';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
import Detalle from '../../components/procesos/detalle';
import Opciones from '../../components/procesos/opciones';
import LinkProps from '../../components/redireccionar/linkProps';
import Nav from '../layout';

const Procesos = () => {
  const [procesos, setProcesos] = useState("");
  const [load, setLoad] = useState(false);
  const [toDetalle, setToDetalle] = useState(false);
  const [toCreate, setToCreate] = useState(false);
  const [toEdit, setToEdit] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    loadProcesos();
  }, []);

  const loadProcesos=()=>{
    axios.get("http://localhost:8080/proceso", { auth: getUser().token }).then(function (response) {

      if (response.status === 200) {
        setProcesos(response.data);
        setLoad(true);
      } else {
        swal({
          title: "Tenemos problemas",
          text: "Hubo un error inesperado al solicitar los datos",
          icon: "error",
          button: "Ok",
        });
      }
    }).catch(() => {
      swal({
        title: "Tenemos problemas",
        text: "Hubo un error inesperado al solicitar los datos",
        icon: "error",
        button: "Ok",
      });
    })
  }

  const handleDetalle = (id, procesos) => {
    let proceso = procesos.filter((x) => { return x.idProceso == id })
    setToDetalle(true);
    setCurrentItem(proceso)
  }

  const handleEdit = (id, procesos) => {
    let proceso = procesos.filter((x) => { return x.idProceso == id })
    setToEdit(true);
    setCurrentItem(proceso)
  }

  function handleCreate() {
    setToCreate(true);
  }

  function canEdit() {
    let role = getUser().role;
    if (role == "ROLE_ADMIN" || role == "ROLE_ADMINISTRADORRRHH" || role == "ROLE_GERENTERRHH")
      return true;
  }

  function canDelete() {
    let role = getUser().role;
    if (role == "ROLE_ADMIN" || role == "ROLE_ADMINISTRADORRRHH" || role == "ROLE_GERENTERRHH")
      return true;
  }

  function deleteProceso(id) {
    let urlRe="http://localhost:8080/proceso?id="+(id*1);
    console.log(urlRe);
    swal({
      title: "Estás seguro de borrarlo?",
      text: "Esta acción no se puede deshacer!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios({ url: urlRe, method: 'delete', auth: getUser().token }).then(function (response) {
            if (response.status == 200) {
              swal({
                title: "Registro eliminado",
                text: "La operación fue completada con éxito",
                icon: "success",
                button: "Ok",
              }).then(()=>{loadProcesos()});
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
          swal("No se eliminó ningun recurso");
        }
      });
  }

  return (
    <div className='container'>
      <Nav />
      <div className='my-4'>
        <button type="button" className='btn' style={{ backgroundColor: '#afffba' }} onClick={() => handleCreate()}>Nuevo proceso</button>
      </div>
      <hr />
      <h2 className='my-4'>Lista de procesos</h2>
      <table>
        <tbody>
          {load ? procesos.map((x) => {
            return (
              <tr key={x.idProceso} id={x.idProceso} >
                <td>
                  <table style={{ width: '100%' }}>
                    <tbody>
                      <tr>
                        <td>
                          <div style={{ width: '100%', height: '100%', backgroundColor: '#4dff4d', borderRadius: '15px' }}>
                            <table style={{ width: '100%', height: '100%' }}>
                              <tbody>
                                <tr>
                                  <td style={{ justifyContent: 'right' }} >
                                    <Detalle text={x.closed == "N" ? "Abierto" : "Cerrado"} /> <Detalle text={"fecha de apertura: " + x.apertura} color={'#e6add8'} />
                                  </td>
                                  <td style={{ justifyContent: 'left' }} >
                                    <button className='mx-2' onClick={() => handleDetalle(x.idProceso, procesos)} style={{ backgroundColor: '#7cedff', border: "0" }}>Detalle</button>
                                    {canEdit() ? <button className='mx-2' onClick={() => handleEdit(x.idProceso, procesos)} style={{ backgroundColor: 'orange', border: "0" }}>Editar</button> : null}
                                    {canDelete() ? <button className='mx-2' onClick={() => deleteProceso(x.idProceso)} style={{ backgroundColor: 'red', border: "0" }}>Eliminar</button> : null}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ paddingLeft: '5%' }}>
                          <h6>{x.titulo}</h6>
                          <p>funciones: </p>
                          <p>{x.funciones}</p>
                          <p>requerimientos: </p>
                          <p>{x.requerimientos}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            )
          }) : <tr></tr>
          }
        </tbody>
      </table>

      {toDetalle ? <Redirect to={{
        pathname: "/detalle-procesos",
        state: { item: currentItem }
      }}
      /> : null}

      {toEdit ? <Redirect to={{
        pathname: "/procesos-save",
        state: { item: currentItem, accion: "update" }
      }}
      /> : null}

      {toCreate ? <Redirect to={{
        pathname: "/procesos-save",
        state: { accion: "create" }
      }}
      /> : null}

    </div>
  )
}

export default Procesos;