import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardBody } from '../components/ui';
import { Layout } from '../components/layout';
import {
    Calendar,
    Users,
    RefreshCw,
    LayoutGrid,
    Trophy,
    TrendingUp,
    Clock,
    AlertCircle
} from 'lucide-react';
import './Dashboard.css';

// Demo data for stats
const stats = [
    { icon: Calendar, label: 'Clases esta semana', value: '12', trend: '+2' },
    { icon: Users, label: 'Alumnos activos', value: '48', trend: '+5' },
    { icon: RefreshCw, label: 'Recuperaciones pendientes', value: '3', trend: '-1' },
    { icon: LayoutGrid, label: 'Ocupación pistas hoy', value: '75%', trend: '+10%' },
];

// Demo data for upcoming classes
const upcomingClasses = [
    { id: 1, name: 'Iniciación Lunes', time: '10:00', students: 4, court: 'Pista 1', professor: 'Fran' },
    { id: 2, name: 'Intermedio Tarde', time: '17:00', students: 4, court: 'Pista 2', professor: 'Fran' },
    { id: 3, name: 'Avanzado Adultos', time: '19:00', students: 4, court: 'Pista 3', professor: 'Fran' },
];

// Demo data for pending confirmations
const pendingConfirmations = [
    { id: 1, student: 'María García', class: 'Iniciación Lunes', date: 'Lunes 10:00', deadline: '2h' },
    { id: 2, student: 'Pablo López', class: 'Intermedio Tarde', date: 'Lunes 17:00', deadline: '5h' },
];

// Demo data for available recovery slots
const recoverySlots = [
    { id: 1, class: 'Básico Miércoles', date: 'Mié 16:00', level: 'básico', spots: 1 },
    { id: 2, class: 'Intermedio Viernes', date: 'Vie 18:00', level: 'intermedio', spots: 2 },
];

export const Dashboard: React.FC = () => {
    const { profile } = useAuth();
    const isAdmin = profile?.role === 'admin' || profile?.role === 'profesor';

    return (
        <Layout>
            <div className="dashboard">
                <header className="dashboard__header">
                    <div>
                        <h1 className="dashboard__title">
                            ¡Hola, {profile?.full_name?.split(' ')[0] || 'Usuario'}!
                        </h1>
                        <p className="dashboard__subtitle">
                            Bienvenido a Lora Pádel. Aquí tienes un resumen de hoy.
                        </p>
                    </div>
                </header>

                {/* Stats Grid */}
                <section className="dashboard__stats">
                    {isAdmin ? (
                        stats.map((stat, index) => (
                            <Card key={index} variant="default" padding="md" className="dashboard__stat-card">
                                <CardBody>
                                    <div className="dashboard__stat-icon">
                                        <stat.icon size={24} />
                                    </div>
                                    <div className="dashboard__stat-value">{stat.value}</div>
                                    <div className="dashboard__stat-label">{stat.label}</div>
                                    <div className={`dashboard__stat-trend ${stat.trend.startsWith('+') ? 'dashboard__stat-trend--up' : 'dashboard__stat-trend--down'}`}>
                                        <TrendingUp size={14} />
                                        {stat.trend}
                                    </div>
                                </CardBody>
                            </Card>
                        ))
                    ) : (
                        <>
                            <Card variant="default" padding="md" className="dashboard__stat-card">
                                <CardBody>
                                    <div className="dashboard__stat-icon">
                                        <Calendar size={24} />
                                    </div>
                                    <div className="dashboard__stat-value">2</div>
                                    <div className="dashboard__stat-label">Clases esta semana</div>
                                </CardBody>
                            </Card>
                            <Card variant="default" padding="md" className="dashboard__stat-card">
                                <CardBody>
                                    <div className="dashboard__stat-icon">
                                        <RefreshCw size={24} />
                                    </div>
                                    <div className="dashboard__stat-value">1</div>
                                    <div className="dashboard__stat-label">Recuperaciones pendientes</div>
                                </CardBody>
                            </Card>
                            <Card variant="default" padding="md" className="dashboard__stat-card">
                                <CardBody>
                                    <div className="dashboard__stat-icon">
                                        <Trophy size={24} />
                                    </div>
                                    <div className="dashboard__stat-value">1</div>
                                    <div className="dashboard__stat-label">Torneos inscritos</div>
                                </CardBody>
                            </Card>
                        </>
                    )}
                </section>

                <div className="dashboard__content">
                    {/* Upcoming Classes */}
                    <section className="dashboard__section">
                        <div className="dashboard__section-header">
                            <h2 className="dashboard__section-title">
                                <Calendar size={20} />
                                {isAdmin ? 'Próximas Clases' : 'Mis Próximas Clases'}
                            </h2>
                        </div>
                        <div className="dashboard__classes">
                            {(isAdmin ? upcomingClasses : upcomingClasses.slice(0, 1)).map((cls) => (
                                <Card key={cls.id} variant="default" padding="md" interactive className="dashboard__class-card">
                                    <CardBody>
                                        <div className="dashboard__class-time">
                                            <Clock size={16} />
                                            {cls.time}
                                        </div>
                                        <h3 className="dashboard__class-name">{cls.name}</h3>
                                        <div className="dashboard__class-details">
                                            <span>{cls.court}</span>
                                            {isAdmin && (
                                                <>
                                                    <span>•</span>
                                                    <span>{cls.students} alumnos</span>
                                                </>
                                            )}
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Pending Confirmations */}
                    <section className="dashboard__section">
                        <div className="dashboard__section-header">
                            <h2 className="dashboard__section-title">
                                <AlertCircle size={20} />
                                {isAdmin ? 'Pendiente de Confirmar' : 'Confirma tu Asistencia'}
                            </h2>
                        </div>
                        <div className="dashboard__pending">
                            {(isAdmin ? pendingConfirmations : pendingConfirmations.slice(0, 1)).length > 0 ? (
                                (isAdmin ? pendingConfirmations : pendingConfirmations.slice(0, 1)).map((item) => (
                                    <Card key={item.id} variant="default" padding="md" className="dashboard__pending-card">
                                        <CardBody>
                                            <div className="dashboard__pending-info">
                                                {isAdmin && <span className="dashboard__pending-student">{item.student}</span>}
                                                <span className="dashboard__pending-class">{item.class}</span>
                                                <span className="dashboard__pending-date">{item.date}</span>
                                            </div>
                                            <div className="dashboard__pending-deadline">
                                                <Clock size={14} />
                                                Límite: {item.deadline}
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))
                            ) : (
                                <p className="dashboard__empty">No hay confirmaciones pendientes</p>
                            )}
                        </div>
                    </section>

                    {/* Recovery Slots */}
                    <section className="dashboard__section">
                        <div className="dashboard__section-header">
                            <h2 className="dashboard__section-title">
                                <RefreshCw size={20} />
                                {isAdmin ? 'Huecos para Recuperar' : 'Recupera tus Clases'}
                            </h2>
                        </div>
                        <div className="dashboard__recovery">
                            {recoverySlots.length > 0 ? (
                                recoverySlots.map((slot) => (
                                    <Card key={slot.id} variant="glass" padding="md" interactive className="dashboard__recovery-card">
                                        <CardBody>
                                            <div className="dashboard__recovery-info">
                                                <span className="dashboard__recovery-class">{slot.class}</span>
                                                <span className="dashboard__recovery-date">{slot.date}</span>
                                            </div>
                                            <div className="dashboard__recovery-meta">
                                                <span className="dashboard__recovery-level">{slot.level}</span>
                                                {isAdmin && <span className="dashboard__recovery-spots">{slot.spots} plaza{slot.spots > 1 ? 's' : ''}</span>}
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))
                            ) : (
                                <p className="dashboard__empty">No hay huecos disponibles</p>
                            )}
                        </div>
                    </section>

                    {/* Quick Actions */}
                    <section className="dashboard__section">
                        <div className="dashboard__section-header">
                            <h2 className="dashboard__section-title">
                                <Trophy size={20} />
                                Torneos Activos
                            </h2>
                        </div>
                        <Card variant="elevated" padding="lg" className="dashboard__tournament-card">
                            <CardBody>
                                <h3 className="dashboard__tournament-name">Torneo de Navidad 🎄</h3>
                                <p className="dashboard__tournament-dates">28-30 Diciembre 2025</p>
                                <p className="dashboard__tournament-status">Inscripciones abiertas</p>
                            </CardBody>
                        </Card>
                    </section>
                </div>
            </div>
        </Layout>
    );
};
