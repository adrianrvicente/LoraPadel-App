import React, { useState } from 'react';
import { Layout } from '../components/layout';
import { Card, CardBody, Button } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';
import {
    RefreshCw,
    Clock,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Calendar,
    ArrowRight,
    Bell
} from 'lucide-react';
import type { PlayerLevel } from '../types';
import './Recoveries.css';

// Demo data for pending confirmations
const pendingConfirmations = [
    {
        id: '1',
        className: 'Intermedio Tarde',
        date: '2025-12-31',
        time: '17:00',
        court: 'Pista 1',
        professor: 'Fran Ruiz',
        level: 'intermedio' as PlayerLevel,
        deadline: new Date(Date.now() + 3600000 * 5), // 5 hours from now
        studentName: 'Pablo García'
    },
    {
        id: '2',
        className: 'Avanzado',
        date: '2025-01-02',
        time: '19:00',
        court: 'Pista 3',
        professor: 'Fran Ruiz',
        level: 'avanzado' as PlayerLevel,
        deadline: new Date(Date.now() + 3600000 * 28), // 28 hours from now
        studentName: 'María López'
    },
];

// Demo data for recovery slots
const availableSlots = [
    {
        id: '1',
        className: 'Básico Mañana',
        date: '2025-12-31',
        time: '10:00',
        court: 'Pista 2',
        level: 'basico' as PlayerLevel,
        spotsAvailable: 1,
        originalStudent: 'Juan'
    },
    {
        id: '2',
        className: 'Intermedio Miércoles',
        date: '2026-01-01',
        time: '16:00',
        court: 'Pista 1',
        level: 'intermedio' as PlayerLevel,
        spotsAvailable: 2,
        originalStudent: 'Ana'
    },
    {
        id: '3',
        className: 'Avanzado Jueves',
        date: '2026-01-02',
        time: '18:00',
        court: 'Pista 3',
        level: 'avanzado' as PlayerLevel,
        spotsAvailable: 1,
        originalStudent: 'Pedro'
    },
];

// Demo data for pending recoveries (classes user needs to recover)
const pendingRecoveries = [
    {
        id: '1',
        className: 'Intermedio Lunes',
        missedDate: '2025-12-23',
        level: 'intermedio' as PlayerLevel,
        reason: 'Cancelación a tiempo',
        expiresAt: new Date('2026-01-23')
    },
];

const levelColors: Record<PlayerLevel, string> = {
    iniciacion: '#10B981',
    basico: '#3B82F6',
    intermedio: '#F59E0B',
    avanzado: '#EF4444',
    competicion: '#8B5CF6',
};

const levelLabels: Record<PlayerLevel, string> = {
    iniciacion: 'Iniciación',
    basico: 'Básico',
    intermedio: 'Intermedio',
    avanzado: 'Avanzado',
    competicion: 'Competición',
};

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
};

const getTimeRemaining = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
        const days = Math.floor(hours / 24);
        return `${days}d ${hours % 24}h`;
    }
    return `${hours}h ${minutes}m`;
};

const isUrgent = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    return diff < 1000 * 60 * 60 * 6; // Less than 6 hours
};

export const Recoveries: React.FC = () => {
    const { profile } = useAuth();
    const isAdmin = profile?.role === 'admin' || profile?.role === 'profesor';
    const [activeTab, setActiveTab] = useState<'confirm' | 'slots' | 'pending'>('confirm');

    const handleConfirm = (id: string, attending: boolean) => {
        console.log(`Confirmed ${id}: ${attending ? 'attending' : 'not attending'}`);
        // In real app, this would call Supabase
    };

    const handleClaimSlot = (slotId: string) => {
        console.log(`Claimed slot ${slotId}`);
        // In real app, this would call Supabase
    };

    return (
        <Layout>
            <div className="recoveries">
                <header className="recoveries__header">
                    <div>
                        <h1 className="recoveries__title">Recuperaciones</h1>
                        <p className="recoveries__subtitle">Confirma asistencia y recupera clases perdidas</p>
                    </div>
                </header>

                {/* Stats */}
                <div className="recoveries__stats">
                    <Card variant="default" padding="md" className="recoveries__stat">
                        <CardBody>
                            <div className="recoveries__stat-icon recoveries__stat-icon--warning">
                                <AlertTriangle size={24} />
                            </div>
                            <div className="recoveries__stat-value">{pendingConfirmations.length}</div>
                            <div className="recoveries__stat-label">Por confirmar</div>
                        </CardBody>
                    </Card>
                    <Card variant="default" padding="md" className="recoveries__stat">
                        <CardBody>
                            <div className="recoveries__stat-icon recoveries__stat-icon--success">
                                <RefreshCw size={24} />
                            </div>
                            <div className="recoveries__stat-value">{pendingRecoveries.length}</div>
                            <div className="recoveries__stat-label">Clases pendientes</div>
                        </CardBody>
                    </Card>
                    <Card variant="default" padding="md" className="recoveries__stat">
                        <CardBody>
                            <div className="recoveries__stat-icon recoveries__stat-icon--info">
                                <Calendar size={24} />
                            </div>
                            <div className="recoveries__stat-value">{availableSlots.length}</div>
                            <div className="recoveries__stat-label">Huecos disponibles</div>
                        </CardBody>
                    </Card>
                </div>

                {/* Tabs */}
                <div className="recoveries__tabs">
                    <button
                        className={`recoveries__tab ${activeTab === 'confirm' ? 'recoveries__tab--active' : ''}`}
                        onClick={() => setActiveTab('confirm')}
                    >
                        <Clock size={18} />
                        Confirmar Asistencia
                        {pendingConfirmations.length > 0 && (
                            <span className="recoveries__tab-badge">{pendingConfirmations.length}</span>
                        )}
                    </button>
                    <button
                        className={`recoveries__tab ${activeTab === 'slots' ? 'recoveries__tab--active' : ''}`}
                        onClick={() => setActiveTab('slots')}
                    >
                        <RefreshCw size={18} />
                        Huecos Disponibles
                        {availableSlots.length > 0 && (
                            <span className="recoveries__tab-badge recoveries__tab-badge--success">{availableSlots.length}</span>
                        )}
                    </button>
                    <button
                        className={`recoveries__tab ${activeTab === 'pending' ? 'recoveries__tab--active' : ''}`}
                        onClick={() => setActiveTab('pending')}
                    >
                        <Bell size={18} />
                        Mis Recuperaciones
                        {pendingRecoveries.length > 0 && (
                            <span className="recoveries__tab-badge">{pendingRecoveries.length}</span>
                        )}
                    </button>
                </div>

                {/* Content */}
                <div className="recoveries__content">
                    {/* Confirm Attendance Tab */}
                    {activeTab === 'confirm' && (
                        <div className="recoveries__list">
                            {pendingConfirmations.length > 0 ? (
                                pendingConfirmations.map((item) => (
                                    <Card key={item.id} variant="default" padding="lg" className="recoveries__confirm-card">
                                        <CardBody>
                                            <div className="recoveries__confirm-header">
                                                <div>
                                                    <span
                                                        className="recoveries__level-badge"
                                                        style={{
                                                            backgroundColor: `${levelColors[item.level]}20`,
                                                            color: levelColors[item.level]
                                                        }}
                                                    >
                                                        {levelLabels[item.level]}
                                                    </span>
                                                    <h3 className="recoveries__confirm-title">{item.className}</h3>
                                                    {isAdmin && <p className="recoveries__confirm-student">Alumno: {item.studentName}</p>}
                                                </div>
                                                <div className={`recoveries__deadline ${isUrgent(item.deadline) ? 'recoveries__deadline--urgent' : ''}`}>
                                                    <Clock size={16} />
                                                    <span>{isAdmin ? 'Confirmar en' : 'Confirma en'}</span>
                                                    <strong>{getTimeRemaining(item.deadline)}</strong>
                                                </div>
                                            </div>

                                            <div className="recoveries__confirm-details">
                                                <span><Calendar size={14} /> {formatDate(item.date)}</span>
                                                <span><Clock size={14} /> {item.time}</span>
                                                <span>{item.court}</span>
                                            </div>

                                            <div className="recoveries__confirm-actions">
                                                <Button
                                                    variant="primary"
                                                    leftIcon={<CheckCircle size={18} />}
                                                    onClick={() => handleConfirm(item.id, true)}
                                                >
                                                    Confirmo Asistencia
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    leftIcon={<XCircle size={18} />}
                                                    onClick={() => handleConfirm(item.id, false)}
                                                >
                                                    No Podré Asistir
                                                </Button>
                                            </div>

                                            <p className="recoveries__confirm-warning">
                                                <AlertTriangle size={14} />
                                                Si no confirmas con 24h de antelación, perderás la clase sin posibilidad de recuperar.
                                            </p>
                                        </CardBody>
                                    </Card>
                                ))
                            ) : (
                                <div className="recoveries__empty">
                                    <CheckCircle size={48} />
                                    <h3>¡Todo confirmado!</h3>
                                    <p>No tienes clases pendientes de confirmar</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Available Slots Tab */}
                    {activeTab === 'slots' && (
                        <div className="recoveries__slots">
                            {availableSlots.length > 0 ? (
                                availableSlots.map((slot) => (
                                    <Card key={slot.id} variant="glass" padding="md" className="recoveries__slot-card">
                                        <CardBody>
                                            <div className="recoveries__slot-header">
                                                <span
                                                    className="recoveries__level-badge"
                                                    style={{
                                                        backgroundColor: `${levelColors[slot.level]}20`,
                                                        color: levelColors[slot.level]
                                                    }}
                                                >
                                                    {levelLabels[slot.level]}
                                                </span>
                                                <span className="recoveries__slot-spots">
                                                    {slot.spotsAvailable} plaza{slot.spotsAvailable > 1 ? 's' : ''}
                                                </span>
                                            </div>

                                            <h3 className="recoveries__slot-title">{slot.className}</h3>

                                            <div className="recoveries__slot-details">
                                                <span><Calendar size={14} /> {formatDate(slot.date)}</span>
                                                <span><Clock size={14} /> {slot.time}</span>
                                                <span>{slot.court}</span>
                                            </div>

                                            <Button
                                                variant="primary"
                                                size="sm"
                                                fullWidth
                                                rightIcon={<ArrowRight size={16} />}
                                                onClick={() => handleClaimSlot(slot.id)}
                                            >
                                                Reservar Hueco
                                            </Button>
                                        </CardBody>
                                    </Card>
                                ))
                            ) : (
                                <div className="recoveries__empty">
                                    <Calendar size={48} />
                                    <h3>Sin huecos disponibles</h3>
                                    <p>No hay huecos para tu nivel en este momento</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Pending Recoveries Tab */}
                    {activeTab === 'pending' && (
                        <div className="recoveries__pending">
                            {pendingRecoveries.length > 0 ? (
                                pendingRecoveries.map((recovery) => (
                                    <Card key={recovery.id} variant="default" padding="md" className="recoveries__pending-card">
                                        <CardBody>
                                            <div className="recoveries__pending-header">
                                                <span
                                                    className="recoveries__level-badge"
                                                    style={{
                                                        backgroundColor: `${levelColors[recovery.level]}20`,
                                                        color: levelColors[recovery.level]
                                                    }}
                                                >
                                                    {levelLabels[recovery.level]}
                                                </span>
                                                <span className="recoveries__pending-expires">
                                                    Expira: {recovery.expiresAt.toLocaleDateString('es-ES')}
                                                </span>
                                            </div>

                                            <h3 className="recoveries__pending-title">{recovery.className}</h3>
                                            <p className="recoveries__pending-missed">
                                                Clase perdida: {formatDate(recovery.missedDate)}
                                            </p>
                                            <p className="recoveries__pending-reason">{recovery.reason}</p>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setActiveTab('slots')}
                                                rightIcon={<ArrowRight size={16} />}
                                            >
                                                Ver huecos disponibles
                                            </Button>
                                        </CardBody>
                                    </Card>
                                ))
                            ) : (
                                <div className="recoveries__empty">
                                    <CheckCircle size={48} />
                                    <h3>No tienes clases pendientes</h3>
                                    <p>Cuando pierdas una clase, aparecerá aquí para que puedas recuperarla</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};
