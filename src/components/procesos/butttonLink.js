import React, { useState } from "react";
import {getUser} from '../../store/UserProvider';
import LinkProps from "../redireccionar/linkProps";
import Redireccionar from "../redireccionar";

const ButtonLink=(props)=>{
    const [go,setGo]=useState(false);
    function handleClick(){
        setGo(true);
    }
    return(<div style={{display:'inline-block'}}>
        <button type="button" onClick={handleClick()} class="btn" style={{display:'inline-block', backgroundColor:props.color}}>{props.text}</button>
        <LinkProps url={props.link} estado={go}/>
        </div>);

}

export default ButtonLink;