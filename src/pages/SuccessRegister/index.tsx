import React from 'react';
import { Link } from 'react-router-dom';

import successCheckIcon from '../../assets/images/icons/success-check-icon.svg';

import './styles.css';

function SuccessRegister() {
  return (
    <div className="success-register-page">
      <div className="success-register-background">
        <div className="success-register-content">
          <img src={successCheckIcon} alt="CheckIcon" />
          <strong>Cadastro concluído!</strong>
          <p>Agora você faz parte da plataforma da Proffy</p>
        </div>
      </div>

      <Link to="/">
        <button type="button">Fazer login</button>
      </Link>
    </div>
  );
}

export default SuccessRegister;