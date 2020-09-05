import React, { useState, FormEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import SplitScreen from '../../components/SplitScreen';
import FloatInput from '../../components/FloatInput';

import api from '../../components/services/api';

import './styles.css';

function Register() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  function togglePasswordHandler() {
    setHidePassword(!hidePassword);
  }

  let inputType = "password";
  if (!hidePassword) {
    inputType = "text";
  }

  function handleRegisterSubmit(e: FormEvent) {
    e.preventDefault();

    api.post('classes', {
      name,
      email,
      password,
    }).then(() => {
      alert('Cadastro realizado com sucesso!');

      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro!');
    })
  }

  return (
    <SplitScreen>
      <div id="register-field">
        <form onSubmit={handleRegisterSubmit}>
          <fieldset>
            <legend>Cadastro</legend>
            <p>Preencha os dados abaixo<br />para começar</p>
            <div>
              <FloatInput
                style={{ borderRadius: '0.8rem 0.8rem 0 0' }}
                name="nome"
                label="Nome"
                placeholder="Nome"
                required
                value={name}
                onChange={(e) => { setName(e.target.value) }}
              />
            </div>
            <div>
              <FloatInput
                name="surname"
                label="Sobrenome"
                placeholder="Sobrenome"
                required
                value={surname}
                onChange={(e) => { setSurname(e.target.value) }}
              />
            </div>
            <div>
              <FloatInput
                name="email"
                label="E-mail"
                placeholder="E-mail"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
              />
            </div>
            <div>
              <FloatInput
                style={{ borderRadius: '0 0 0.8rem 0.8rem' }}
                name="password"
                label="Senha"
                placeholder="Senha"
                required
                type={inputType}
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
              />
              {hidePassword ?
                <FontAwesomeIcon
                  icon={faEye}
                  className="eyeIcon"
                  onClick={togglePasswordHandler}
                  color="#9C98A6"
                />
                : <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="eyeOffIcon"
                  onClick={togglePasswordHandler}
                  color="#9C98A6"
                />}
            </div>
          </fieldset>
          
          <Link to="/success-register">
            <button type="submit">Concluir cadastro</button>
          </Link>
        </form>
      </div>
    </SplitScreen>
  );
}

export default Register;