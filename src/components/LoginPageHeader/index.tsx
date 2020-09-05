import React from 'react';

import { Link } from 'react-router-dom';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function LoginPageHeader() {
    return (
        <header className="login-page-header">
            <div className="login-top-bar-container">
                <Link className="profile-link" to="/profile">
                    <div className="user-header">
                        <img src="https://avatars2.githubusercontent.com/u/63662083?s=460&u=13c4f318194a9c353656bb2967fca1dedd2ebd01&v=4" alt="Foto de Perfil" />
                        <p>Fernando Coelho</p>
                    </div>
                </Link>

                <Link className="power-off" to="/" >
                    <FontAwesomeIcon
                        icon={faPowerOff}
                        color="var(--color-text-in-primary)"
                    />
                </Link>
            </div>
        </header>
    );
}

export default LoginPageHeader;