import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router} from "react-router-dom";
import Login from "./views/login"
import Procesos from "./views/procesos"
import DetalleProcesos from "./views/procesos/detalle"
import Save from "./views/procesos/save"

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/procesos" component={Procesos}/>
      <Route path="/procesos-save" component={Save}/>
      <Route path="/detalle-procesos" component={DetalleProcesos} />
      </Switch>
    </Router>
  );
}

export default App;
