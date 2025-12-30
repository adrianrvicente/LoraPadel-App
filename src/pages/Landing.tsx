import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import {
    Calendar,
    RefreshCw,
    LayoutGrid,
    Trophy,
    Bell,
    Shield,
    Smartphone,
    ArrowRight
} from 'lucide-react';
import './Landing.css';

const features = [
    {
        icon: Calendar,
        title: 'Gestión de Clases',
        description: 'Horarios personalizados, pasar lista digital y control de asistencia automático.'
    },
    {
        icon: RefreshCw,
        title: 'Sistema de Recuperaciones',
        description: 'Confirma asistencia, cancela con tiempo y recupera clases en huecos disponibles.'
    },
    {
        icon: LayoutGrid,
        title: 'Reserva de Pistas',
        description: '4 pistas disponibles. Reserva, verifica con IA y abre partidos para otros jugadores.'
    },
    {
        icon: Trophy,
        title: 'Torneos y Competiciones',
        description: 'Inscríbete, sigue los cuadros y consulta resultados en tiempo real.'
    },
    {
        icon: Bell,
        title: 'Notificaciones',
        description: 'WhatsApp y email automáticos para avisos, confirmaciones y huecos disponibles.'
    },
    {
        icon: Shield,
        title: 'Seguro y Fácil',
        description: 'Cumplimiento LOPIVI para menores. Sin instalaciones, accede desde cualquier dispositivo.'
    }
];

export const Landing: React.FC = () => {
    return (
        <div className="landing">
            {/* Header */}
            <header className="landing__header">
                <div className="landing__header-content">
                    <div className="landing__logo-container">
                        <img src="/logo.png" alt="Lora Pádel" className="landing__logo" />
                        <span className="landing__brand">Lora Pádel</span>
                    </div>
                    <nav className="landing__nav">
                        <Link to="/login" className="landing__nav-link">Iniciar Sesión</Link>
                        <Link to="/registro">
                            <Button variant="primary" size="sm">Crear Cuenta</Button>
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero */}
            <section className="landing__hero">
                <div className="landing__hero-content">
                    <h1 className="landing__title">
                        Tu academia de pádel,
                        <span className="text-gradient"> más fácil que nunca</span>
                    </h1>
                    <p className="landing__subtitle">
                        Gestiona clases, recuperaciones, reservas de pistas y torneos
                        desde una sola aplicación. Todo sincronizado, todo en tiempo real.
                    </p>
                    <div className="landing__hero-actions">
                        <Link to="/registro">
                            <Button variant="primary" size="lg" rightIcon={<ArrowRight size={20} />}>
                                Empezar ahora
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="outline" size="lg">
                                Ya tengo cuenta
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="landing__hero-image">
                    <div className="landing__hero-graphic">
                        <Smartphone size={200} strokeWidth={1} />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="landing__features">
                <div className="landing__section-header">
                    <h2 className="landing__section-title">Todo lo que necesitas</h2>
                    <p className="landing__section-subtitle">
                        Olvídate del Excel, WhatsApp y el caos. Una sola plataforma para todo.
                    </p>
                </div>
                <div className="landing__features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="landing__feature-card">
                            <div className="landing__feature-icon">
                                <feature.icon size={28} />
                            </div>
                            <h3 className="landing__feature-title">{feature.title}</h3>
                            <p className="landing__feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="landing__cta">
                <div className="landing__cta-content">
                    <h2 className="landing__cta-title">¿Listo para empezar?</h2>
                    <p className="landing__cta-subtitle">
                        Únete a la comunidad de Lora Pádel y lleva tu entrenamiento al siguiente nivel.
                    </p>
                    <Link to="/registro">
                        <Button variant="secondary" size="lg" rightIcon={<ArrowRight size={20} />}>
                            Crear cuenta gratis
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing__footer">
                <div className="landing__footer-content">
                    <div className="landing__footer-info">
                        <img src="/logo.png" alt="Lora Pádel" className="landing__footer-logo" />
                        <p>Escuela de Pádel Fran Ruiz</p>
                        <p>Lora del Río, Sevilla</p>
                    </div>
                    <div className="landing__footer-hours">
                        <h4>Horario</h4>
                        <p>Lunes a Domingo</p>
                        <p>9:30 - 14:00 | 16:00 - 22:00</p>
                    </div>
                    <div className="landing__footer-contact">
                        <h4>Contacto</h4>
                        <p>Carretera Alcolea del Río, 13</p>
                        <p>41440 Lora del Río (Sevilla)</p>
                    </div>
                </div>
                <div className="landing__footer-bottom">
                    <p>© 2025 Lora Pádel. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};
