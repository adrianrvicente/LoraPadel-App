import React from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    className = '',
    id,
    ...props
}) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`input-wrapper ${className}`}>
            {label && (
                <label htmlFor={inputId} className="input__label">
                    {label}
                </label>
            )}
            <div className={`input__container ${error ? 'input__container--error' : ''}`}>
                {leftIcon && <span className="input__icon input__icon--left">{leftIcon}</span>}
                <input
                    id={inputId}
                    className={`input ${leftIcon ? 'input--has-left-icon' : ''} ${rightIcon ? 'input--has-right-icon' : ''}`}
                    {...props}
                />
                {rightIcon && <span className="input__icon input__icon--right">{rightIcon}</span>}
            </div>
            {error && <span className="input__error">{error}</span>}
            {hint && !error && <span className="input__hint">{hint}</span>}
        </div>
    );
};
