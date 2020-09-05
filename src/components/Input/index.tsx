import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    placeholder?: string;
    maxlenght?: string;
    name: string;
}

const Input: React.FC<InputProps> = ({ label, name, placeholder, ...rest }) => {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" placeholder={placeholder} id={name} {...rest} />
        </div>
    );
}

export default Input;