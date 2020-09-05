import React, { useState, FormEvent } from 'react';
import { useHistory, Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faHeart } from '@fortawesome/free-solid-svg-icons';

import SplitScreen from '../../components/SplitScreen';
import FloatInput from '../../components/FloatInput';

import api from '../../components/services/api';

import './styles.css';
import Checkbox from '../../components/Checkbox';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [checked, setChecked] = useState(false);

  function handleLoginSubmit(e: FormEvent) {
    e.preventDefault();

    api.post('classes', {
      email,
      password,
      checked
    }).then(() => {
      alert('Cadastro realizado com sucesso!');

      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro!');
    })
  }

  function handleCheckedBox() {
    setChecked(true);
  }

  function togglePasswordHandler() {
    setHidePassword(!hidePassword);
  }

  let inputType = "password";
  if (!hidePassword) {
    inputType = "text";
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
      <div id="login-field">
        <form onSubmit={handleLoginSubmit}>
          <fieldset>
            <legend>Fazer login</legend>
            <div>
              <FloatInput
                style={{ borderRadius: '0.8rem 0.8rem 0 0' }}
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

          <div className="login-options">
            <Checkbox
              className="login-checkbox"
              name="checkbox"
              label="Lembrar-me"
              onChange={handleCheckedBox}
            />
            <NavLink
              to="/recover">
              Esqueci minha senha
          </NavLink>
          </div>

          <Link to="/home">
            {recoverButton}
          </Link>
        </form>

        <footer id="login-footer">
          <div className="login-footer-redirect">
            <p>Não tem conta? <br /></p>
            <NavLink to="/register" className="register">Cadastre-se</NavLink>
          </div>
          <div className="login-footer-heart">
            É de graça <FontAwesomeIcon icon={faHeart} className="faHeart" />
          </div>
        </footer>

      </div>
    </SplitScreen>
  );
}

export default Login;