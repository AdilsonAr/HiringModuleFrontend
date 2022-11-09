import React, {useState} from "react";
import Usuario from "../../images/Usuario.png";
import Redireccionar from '../redireccionar';
import {setUser} from '../../store/UserProvider';
import axios from 'axios';
import swal from 'sweetalert';

const Login = () => {
  //declarando los estados
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleLogin = () =>{
      var token = {
        username: usuario,
        password:contrasenia
      }
      if (usuario=="" || contrasenia==""){
        swal({
          title: "Tenemos problemas",
          text: "Completa los campos requeridos",
          icon: "error",
          button: "Ok",
        });
      }else{
        axios.get("http://localhost:8080/login",{ auth:token }).then(function (response){
          if(response.status === 200){
            var auth = {
              token: token,
              role: response.data.val
            }
            console.log(JSON.stringify(auth));
            setUser(auth);
            setIsValid(true);
          }else{
            swal({
              title: "Tenemos problemas",
              text: "Credenciales invalidas",
              icon: "error",
              button: "Ok",
            });
          }

       }).catch(error => {
        swal({
          title: "Tenemos problemas",
          text: "Credenciales invalidas",
          icon: "error",
          button: "Ok",
        });
      })
      }
       
  }

  const handleChageUsuario = (e) => {
    setUsuario(e.target.value);
  }

  const handleChageContrasenia = (e) => {
    setContrasenia(e.target.value);
  }

  return (
  <div style={{display:'flex',justifyContent:'center',paddingTop:'10%',width:'100%',height:'100%'}}>
   <div style={{width:'30%',height:'30%',backgroundColor:"lightblue",padding:"5%"}} >
              <input style={{display:'block',width:'100%'}}
                type="text"
                className="mt-4"
                name="usuario"
                id="usuario"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => handleChageUsuario(e)}
              />
              <input style={{display:'block',width:'100%'}}
                id="contrasenia"
                className="mt-4"
                type="password"
                placeholder="Clave"
                value={contrasenia}
                name="constrasenia"
                onChange={ (e) => handleChageContrasenia(e)}/>
                <br />
                <button color="primary" onClick={handleLogin} style={{display:'block',width:'100%'}} className="mt-4" >
                  Entrar
                </button>
            
      <Redireccionar url="/procesos" estado={isValid}/>
    </div>
    </div>
  );
};

export default Login;
