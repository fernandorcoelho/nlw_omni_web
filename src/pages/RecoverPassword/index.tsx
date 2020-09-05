import React, { useState, FormEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';

import SplitScreen from '../../components/SplitScreen';
import FloatInput from '../../components/FloatInput';

import api from '../../components/services/api';

import './styles.css';

function RecoverPassword() {
  const history = useHistory();
  const [email, setEmail] = useState('');

  function handleRecoverSubmit(e: FormEvent) {
    e.preventDefault();

    api.post('classes', {
      email
    }).then(() => {
      alert('E-mail enviado com sucesso!');

      history.push('/');
    }).catch(() => {
      alert('E-mail incorreto');
    })
  }

  let recoverButton =
    <button
      className="inactive-button"
      type="submit">
      Enviar
    </button>

  if (email.length > 0) {
    recoverButton =
      <button
        className="active-button"
        type="submit">
        Enviar
      </button>
  }

  return (
    <SplitScreen>
      <div id="recover-field">
        <form onSubmit={handleRecoverSubmit}>
          <fieldset>
            <legend>Eita, esqueceu sua senha?</legend>
            <p>Não esquena, vamos dar um jeito nisso.</p>
            <div>
              <FloatInput
                style={{borderRadius: '0.8rem'}}
                name="email"
                label="E-mail"
                placeholder="E-mail"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
              />
            </div>
          </fieldset>

          <Link to="/success-recover">
            {recoverButton}
          </Link>
        </form>
      </div>
    </SplitScreen>
  );
}

export default RecoverPassword;