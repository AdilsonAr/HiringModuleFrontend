import * as React from 'react'

function setUser(user){
  localStorage.setItem("auth",JSON.stringify(user));
}

function rmUser(){
  localStorage.clear();
}

function getUser(){
  if(localStorage.getItem("auth")!=undefined){
    return JSON.parse(localStorage.getItem("auth"));
  }
  else return null;
}

export {setUser,getUser,rmUser};