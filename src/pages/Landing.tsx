import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import {
    RefreshCw,
    LayoutGrid,
    Trophy,
    Bell,
    ArrowRight,
    Users,
    Zap,
    MapPin,
    Clock,
    Phone
} from 'lucide-react';
import './Landing.css';

const features = [
    {
        icon: LayoutGrid,
        title: '4 Pistas Indoor',
        description: 'Instalaciones de primer nivel con iluminación LED profesional y césped de última generación para el mejor juego.'
    },
    {
        icon: Users,
        title: 'Escuela Fran Ruiz',
        description: 'Aprende con metodología profesional. Clases adaptadas a todos los niveles, desde iniciación hasta competición.'
    },
    {
        icon: Zap,
        title: 'IA & Tecnología',
        description: 'Reserva pistas al instante y verifica tus pagos automáticamente gracias a nuestra integración con Gemini Flash.'
    },
    {
        icon: RefreshCw,
        title: 'Gestión de Recuperaciones',
        description: '¿No puedes asistir? Cancela con antelación y recupera tu clase fácilmente en otros horarios disponibles.'
    },
    {
        icon: Trophy,
        title: 'Torneos y Rankings',
        description: 'Únete a nuestra comunidad competitiva. Inscríbete en torneos, sigue los cuadros y sube en el ranking del club.'
    },
    {
        icon: Bell,
        title: 'Avisos por WhatsApp',
        description: 'Mantente siempre informado. Recibe confirmaciones de clases, avisos de huecos y noticias del club al instante.'
    }
];

export const Landing: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="landing">
            {/* Header */}
            <header className={`landing__header ${isScrolled ? 'landing__header--scrolled' : ''}`}>
                <div className="landing__header-content">
                    <div className="landing__logo-container">
                        <img src="/logo.png" alt="Lora Pádel" className="landing__logo" />
                        <span className="landing__brand">Lora Pádel</span>
                    </div>
                    <nav className="landing__nav">
                        <Link to="/login" className="landing__nav-link">Entrar</Link>
                        <Link to="/registro">
                            <Button variant="primary" size="sm">Unirse al Club</Button>
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero */}
            <section className="landing__hero">
                <div className="landing__hero-content">
                    <div className="landing__badge">
                        <span>✨ Nueva Era Lora Pádel 2026</span>
                    </div>
                    <h1 className="landing__title">
                        Tu Club. Tu Escuela.
                        <span className="text-gradient">Tu Comunidad.</span>
                    </h1>
                    <p className="landing__subtitle">
                        Vive la experiencia Lora Pádel. Gestiona tus clases, reserva pistas de última generación
                        y forma parte de la mayor comunidad de pádel de la zona.
                    </p>
                    <div className="landing__hero-actions">
                        <Link to="/registro">
                            <Button variant="primary" size="lg" rightIcon={<ArrowRight size={20} />}>
                                Empezar a jugar
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="outline" size="lg">
                                Acceso Alumnos
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="landing__hero-image">
                    <div className="landing__hero-graphic">
                        <img
                            src="/Users/adrianruizvicente/.gemini/antigravity/brain/f1266331-2b33-4074-bbf7-dcee5f4d2bec/lorapadel_hero_2026_1767088784101.png"
                            alt="Lora Pádel Club"
                            className="landing__hero-img"
                        />

                        {/* Floating Cards */}
                        <div className="landing__floating-card landing__floating-card--1">
                            <div className="landing__feature-icon" style={{ width: '40px', height: '40px', marginBottom: 0 }}>
                                <Trophy size={20} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '14px' }}>Ranking Club</div>
                                <div style={{ fontSize: '12px', opacity: 0.7 }}>+150 Jugadores activos</div>
                            </div>
                        </div>

                        <div className="landing__floating-card landing__floating-card--2">
                            <div className="landing__feature-icon" style={{ width: '40px', height: '40px', marginBottom: 0, background: 'var(--secondary)' }}>
                                <Zap size={20} style={{ color: '#fff' }} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '14px' }}>IA Check</div>
                                <div style={{ fontSize: '12px', opacity: 0.7 }}>Reserva verificada</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="landing__features">
                <div className="landing__section-header">
                    <h2 className="landing__section-title">Experiencia Premium</h2>
                    <p className="landing__section-subtitle">
                        Hemos diseñado cada detalle para que tú solo tengas que preocuparte de entrar a pista y disfrutar.
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
                    <h2 className="landing__cta-title">¿Listo para entrar a pista?</h2>
                    <p className="landing__cta-subtitle">
                        Únete hoy mismo y empieza a disfrutar de todas las ventajas de ser miembro de Lora Pádel.
                    </p>
                    <Link to="/registro">
                        <Button variant="secondary" size="lg" rightIcon={<ArrowRight size={20} />}>
                            Registrarme ahora
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing__footer">
                <div className="landing__footer-content">
                    <div className="landing__footer-info">
                        <img src="/logo.png" alt="Lora Pádel" className="landing__footer-logo" />
                        <p>
                            Lora Pádel es más que un club, es el punto de encuentro para todos los amantes del pádel en Lora del Río.
                        </p>
                    </div>
                    <div className="landing__footer-hours">
                        <h4>Horario Club</h4>
                        <p><Clock size={16} /> Lunes a Domingo</p>
                        <p>9:30 - 14:00</p>
                        <p>16:00 - 22:00</p>
                    </div>
                    <div className="landing__footer-contact">
                        <h4>Ubicación</h4>
                        <p><MapPin size={16} /> Ctra. Alcolea del Río, 13</p>
                        <p>41440 Lora del Río (Sevilla)</p>
                    </div>
                    <div className="landing__footer-contact">
                        <h4>Contacto</h4>
                        <p><Phone size={16} /> +34 600 000 000</p>
                        <p><Zap size={16} /> info@lorapadel.com</p>
                    </div>
                </div>
                <div className="landing__footer-bottom">
                    <p>© 2025 Lora Pádel Club. Todos los derechos reservados.</p>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <span>Aviso Legal</span>
                        <span>Privacidad</span>
                        <span>Cookies</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};
