import React, { useContext } from 'react';
import { LoginComp } from './LoginComp';
import { RegisterComp } from './RegisterComp';
import { AuthContext } from '../../context/AuthContext';
import logoImg from '../../assets/logo1.png';

export const NavComp = () => {
    const { currentUser, logout } = useContext(AuthContext);
    return (
        <nav className="navbar sticky-top navbar-light custom-navbar">
            <div className="container-fluid">
                <div className="navbar-brand custom-navbar-brand">
                    <img src={logoImg} alt="logo" className="custom-logo" />
                    <span className="custom-text">L'Enchere Royale</span>
                </div>
                <div className="d-flex">
                    <div className="col">
                        {currentUser ? (
                            <>
                                <div className="btn btn-outline-secondary mx-2 disabled">
                                    {currentUser.email}
                                </div>
                                <div
                                    onClick={() => logout()}
                                    className="btn btn-outline-secondary mx-2">
                                    Logout
                                </div>
                            </>
                        ) : (
                            <>
                                <LoginComp />
                                <RegisterComp />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

const styles = `
.custom-navbar {
    background-color: #d69496;
    border: 1px solid #dddddd;
    height: 100px;
    width: 100%;
}

.custom-navbar-brand {
    display: flex;
    align-items: center;
}

.custom-logo {
    height: 80px;
    filter: brightness(0) invert(1); 
}

.custom-text {
    color: #ffffff;
    margin-left: 10px;
    font-size: 1.5em;
    font-weight: bold;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
