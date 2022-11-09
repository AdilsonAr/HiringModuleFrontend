import React from "react";
import {getUser} from '../../store/UserProvider';
import ButtonLink from "./butttonLink";

const Opciones=(props)=>{
    let role = getUser().role;

    function Editar(props){
        if(role=="ROLE_ADMIN" || role=="ROLE_ADMINISTRADORRRHH" || role=="ROLE_GERENTERRHH")
            return(<ButtonLink text={"editar"} link={"/procesos-save/"} accion={"editar"} color={"#7cedff"} id={props.id} data={props.data}/>)
    }

    function Eliminar(props){
        if(role=="ROLE_ADMIN" || role=="ROLE_ADMINISTRADORRRHH" || role=="ROLE_GERENTERRHH")
            return(<ButtonLink text={"eliminar"} link={"/procesos-save/"} accion={"eliminar"} color={"#ff0000"} id={props.id} />)
    }

    function Ver(props){
        if(role=="ROLE_ADMIN" || role=="ROLE_ADMINISTRADORRRHH" || role=="ROLE_GERENTERRHH")
            return(<ButtonLink text={"eliminar"} link={"/procesos-save/"} accion={"eliminar"} color={"#ff0000"} />)
    }

    return(
        <div></div>
    )
}

export default Opciones;