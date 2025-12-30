import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input } from '../components/ui';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';
import type { UserRole } from '../types';
import './Auth.css';

const roles: { value: UserRole; label: string; description: string }[] = [
    { value: 'tutor', label: 'Padre/Madre/Tutor', description: 'Gestiona las clases de tus hijos' },
    { value: 'adulto', label: 'Jugador Adulto', description: 'Gestiona tu propia cuenta' },
];

export const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState<UserRole>('adulto');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setIsLoading(true);

        const { error } = await signUp(email, password, fullName, role);

        if (error) {
            setError(error.message);
            setIsLoading(false);
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div className="auth">
            <div className="auth__container auth__container--wide">
                <Link to="/" className="auth__back">
                    <ArrowLeft size={20} />
                    Volver al inicio
                </Link>

                <div className="auth__header">
                    <img src="/logo.png" alt="Lora Pádel" className="auth__logo" />
                    <h1 className="auth__title">Crear Cuenta</h1>
                    <p className="auth__subtitle">Únete a la comunidad de Lora Pádel</p>
                </div>

                <form className="auth__form" onSubmit={handleSubmit}>
                    <Input
                        label="Nombre completo"
                        type="text"
                        placeholder="Tu nombre"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        leftIcon={<User size={18} />}
                        required
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        leftIcon={<Mail size={18} />}
                        required
                    />

                    <div className="auth__row">
                        <Input
                            label="Contraseña"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            leftIcon={<Lock size={18} />}
                            required
                        />

                        <Input
                            label="Confirmar contraseña"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            leftIcon={<Lock size={18} />}
                            required
                        />
                    </div>

                    <div className="auth__role-selector">
                        <label className="input__label">Tipo de cuenta</label>
                        <div className="auth__roles">
                            {roles.map((r) => (
                                <button
                                    key={r.value}
                                    type="button"
                                    className={`auth__role-option ${role === r.value ? 'auth__role-option--active' : ''}`}
                                    onClick={() => setRole(r.value)}
                                >
                                    <span className="auth__role-label">{r.label}</span>
                                    <span className="auth__role-description">{r.description}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {error && <div className="auth__error">{error}</div>}

                    <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
                        Crear Cuenta
                    </Button>
                </form>

                <div className="auth__footer">
                    <p>
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="auth__link">Iniciar sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
