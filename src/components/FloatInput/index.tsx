import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
    return (
        <div className="float-input-block">
            <input className="float-input" type="text" id={name} {...rest} />
            <label className="float-label" htmlFor={name}>{label}</label>
        </div>
    );
}

export default Input;