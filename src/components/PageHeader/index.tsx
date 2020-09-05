import React from 'react';

import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface PageHeaderProps {
    icon?: React.ReactNode;
    headerTitle?: string;
    title?: string;
    subtitle?: string;
    description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props, ...rest) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/home" >
                    <img src={backIcon} alt="Voltar" />
                </Link>
                {props.headerTitle}
                <img src={logoImg} alt="Proffy" />
            </div>
            <div className="header-content">
                <div className="header-content-title">
                    <strong>{props.title}</strong>
                    <h2>{props.subtitle}</h2>
                </div>

                {props.description && <p>{props.icon} {props.description}</p>}

                {props.children}
            </div>
        </header>
    );
}

export default PageHeader;