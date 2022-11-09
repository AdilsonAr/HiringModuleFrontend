import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Redirect } from "react-router-dom";
import Procesos from "../procesos";
import { rmUser, getUser } from '../../store/UserProvider';
import { useState } from 'react';
const Nav = () => {
    const [logOut, setLogOut] = useState(false);

    function handleLogout() {
        rmUser();
        setLogOut(true);
    }

    return (
        <>
            <div style={{
                display: "flex",
                background: '#7cfffb',
                padding: '5px 0 5px 5px',
                fontSize: '20px'
            }}>
                <div className='m-4' style={{ display: 'inline-block', width: '75%' }}>
                    <NavLink to="/procesos" >
                        Procesos de contrataciones
                    </NavLink>
                </div>

                {getUser() != null ? <div className='m-4' style={{ display: 'inline-block', width: '25%' }}>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <p className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    {getUser().token.username}
                                </p>
                                <ul className="dropdown-menu">
                                    <li><p className="dropdown-item">{getUser().role}</p></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button type="button" className="dropdown-item btn btn-secondary" onClick={() => { handleLogout() }}>LogOut</button></li>
                                </ul>
                            </li>
                        </ul>
                </div> : null}

            </div>
            {logOut ? <Redirect to={"/login"} /> : null}
        </>
    )
}

export default Nav;