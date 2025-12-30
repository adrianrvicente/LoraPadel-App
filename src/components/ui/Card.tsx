import React from 'react';
import './Card.css';

interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'glass';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: () => void;
    interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    padding = 'md',
    className = '',
    onClick,
    interactive = false,
}) => {
    const classes = [
        'card',
        `card--${variant}`,
        `card--padding-${padding}`,
        (interactive || onClick) && 'card--interactive',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} onClick={onClick}>
            {children}
        </div>
    );
};

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
    <div className={`card__header ${className}`}>{children}</div>
);

interface CardBodyProps {
    children: React.ReactNode;
    className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => (
    <div className={`card__body ${className}`}>{children}</div>
);

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
    <div className={`card__footer ${className}`}>{children}</div>
);
