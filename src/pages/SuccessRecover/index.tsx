import React from 'react';
import { Link } from 'react-router-dom';

import successCheckIcon from '../../assets/images/icons/success-check-icon.svg';

import './styles.css';

function SuccessRecover() {
  return (
    <div className="success-recover-page">
      <div className="success-recover-background">
        <div className="success-recover-content">
          <img src={successCheckIcon} alt="CheckIcon" />
          <strong>Redefinição enviada!</strong>
          <p>
            Boa, agora é só checar o e-mail que foi enviado para você redefinir
            sua senha e aproveitar os estudos.
          </p>
        </div>
      </div>

      <Link to="/login">
        <button type="button">Voltar ao login</button>
      </Link>
    </div>
  );
}

export default SuccessRecover;