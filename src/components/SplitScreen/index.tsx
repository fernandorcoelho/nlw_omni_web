import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

function SplitScreen(props: { children: React.ReactNode; }) {
  const { pathname } = useLocation();
  const notLoginPath = !pathname.endsWith('/');

  let splitPageClassName = "split-page-container";
  if (!notLoginPath) {
    splitPageClassName = "login-split-page-container";
  }

  return (
    <span className={splitPageClassName}>
      <div className="right-side">
        {notLoginPath &&
          <Link
            className="back-arrow"
            to="/">
            <img src={backIcon} alt="Voltar" />
          </Link>
        }
        <div className="proffy">
          <div className="proffy-fundo">
            <img src={logoImg} alt="Proffy Logo" />
            <h2>Sua plataforma de <br /> estudos online.</h2>
          </div>
        </div>
      </div>

      <div className="left-side">
        <div className="content-box">
          {props.children}
        </div>
      </div>
    </span>
  );
}

export default SplitScreen;
