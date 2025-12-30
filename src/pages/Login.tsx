import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input } from '../components/ui';
import { Mail, Lock, ArrowLeft, Shield, User } from 'lucide-react';
import './Auth.css';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [demoLoading, setDemoLoading] = useState<'admin' | 'adulto' | null>(null);
    const { signIn, signInDemo, isDemo } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const { error } = await signIn(email, password);

        if (error) {
            setError(error.message);
            setIsLoading(false);
        } else {
            navigate('/dashboard');
        }
    };

    const handleDemoLogin = async (role: 'admin' | 'adulto') => {
        setDemoLoading(role);
        await signInDemo(role);
        navigate('/dashboard');
    };

    return (
        <div className="auth">
            <div className="auth__container">
                <Link to="/" className="auth__back">
                    <ArrowLeft size={20} />
                    Volver al inicio
                </Link>

                <div className="auth__header">
                    <img src="/logo.png" alt="Lora Pádel" className="auth__logo" />
                    <h1 className="auth__title">Iniciar Sesión</h1>
                    <p className="auth__subtitle">Accede a tu cuenta de Lora Pádel</p>
                </div>

                {isDemo && (
                    <div className="auth__demo-notice">
                        <p>🎾 <strong>Modo Demo:</strong> Elige un perfil para probar la app.</p>
                    </div>
                )}

                <form className="auth__form" onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        leftIcon={<Mail size={18} />}
                        required
                    />

                    <Input
                        label="Contraseña"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        leftIcon={<Lock size={18} />}
                        required
                    />

                    {error && <div className="auth__error">{error}</div>}

                    <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
                        Iniciar Sesión
                    </Button>

                    {isDemo && (
                        <div className="auth__demo-buttons">
                            <Button
                                type="button"
                                variant="secondary"
                                fullWidth
                                onClick={() => handleDemoLogin('admin')}
                                isLoading={demoLoading === 'admin'}
                                disabled={demoLoading !== null}
                            >
                                <Shield size={18} />
                                Entrar como Admin
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                fullWidth
                                onClick={() => handleDemoLogin('adulto')}
                                isLoading={demoLoading === 'adulto'}
                                disabled={demoLoading !== null}
                            >
                                <User size={18} />
                                Entrar como Usuario
                            </Button>
                        </div>
                    )}
                </form>

                <div className="auth__footer">
                    <p>
                        ¿No tienes cuenta?{' '}
                        <Link to="/registro" className="auth__link">Crear cuenta</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
