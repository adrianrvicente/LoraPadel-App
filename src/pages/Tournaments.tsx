import React from 'react';
import { Layout } from '../components/layout';
import { Card, CardBody, Button } from '../components/ui';
import {
    Trophy,
    Calendar,
    Users,
    Clock,
    Medal,
    ArrowRight
} from 'lucide-react';
import './Tournaments.css';

// Demo tournaments
const tournaments = [
    {
        id: '1',
        name: 'Torneo de Navidad 🎄',
        description: 'Torneo especial de fin de año para todos los niveles',
        startDate: '2025-12-28',
        endDate: '2025-12-30',
        registrationDeadline: '2025-12-26',
        level: 'Todos los niveles',
        maxTeams: 16,
        currentTeams: 12,
        prize: 'Trofeo + Material deportivo',
        status: 'registration',
        courts: ['Pista 1', 'Pista 2', 'Pista 3', 'Pista 4']
    },
    {
        id: '2',
        name: 'Liga Invierno 2026',
        description: 'Liga mensual de enero a marzo',
        startDate: '2026-01-15',
        endDate: '2026-03-15',
        registrationDeadline: '2026-01-10',
        level: 'Intermedio y Avanzado',
        maxTeams: 24,
        currentTeams: 8,
        prize: '500€ en premios',
        status: 'registration',
        courts: ['Pista 1', 'Pista 2']
    },
    {
        id: '3',
        name: 'Torneo Halloween 2025',
        description: 'Torneo temático con disfraces',
        startDate: '2025-10-31',
        endDate: '2025-11-01',
        registrationDeadline: '2025-10-28',
        level: 'Todos los niveles',
        maxTeams: 12,
        currentTeams: 12,
        prize: 'Trofeo + Cena para ganadores',
        status: 'completed',
        winner: 'Juan & María',
        courts: ['Pista 1', 'Pista 2']
    },
];

const getStatusLabel = (status: string) => {
    switch (status) {
        case 'registration': return 'Inscripciones abiertas';
        case 'in_progress': return 'En curso';
        case 'completed': return 'Finalizado';
        default: return status;
    }
};

const getStatusClass = (status: string) => {
    switch (status) {
        case 'registration': return 'tournaments__status--registration';
        case 'in_progress': return 'tournaments__status--progress';
        case 'completed': return 'tournaments__status--completed';
        default: return '';
    }
};

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
};

export const Tournaments: React.FC = () => {
    const activeTournaments = tournaments.filter(t => t.status !== 'completed');
    const completedTournaments = tournaments.filter(t => t.status === 'completed');

    return (
        <Layout>
            <div className="tournaments">
                <header className="tournaments__header">
                    <div>
                        <h1 className="tournaments__title">Torneos y Competiciones</h1>
                        <p className="tournaments__subtitle">Participa en nuestros torneos y demuestra tu nivel</p>
                    </div>
                </header>

                {/* Active Tournaments */}
                <section className="tournaments__section">
                    <h2 className="tournaments__section-title">
                        <Trophy size={20} />
                        Torneos Activos
                    </h2>

                    <div className="tournaments__grid">
                        {activeTournaments.map(tournament => (
                            <Card key={tournament.id} variant="default" padding="none" className="tournaments__card">
                                <div className="tournaments__card-header">
                                    <span className={`tournaments__status ${getStatusClass(tournament.status)}`}>
                                        {getStatusLabel(tournament.status)}
                                    </span>
                                </div>
                                <CardBody className="tournaments__card-body">
                                    <h3 className="tournaments__card-title">{tournament.name}</h3>
                                    <p className="tournaments__card-description">{tournament.description}</p>

                                    <div className="tournaments__card-details">
                                        <span>
                                            <Calendar size={14} />
                                            {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
                                        </span>
                                        <span>
                                            <Users size={14} />
                                            {tournament.currentTeams}/{tournament.maxTeams} equipos
                                        </span>
                                        <span>
                                            <Medal size={14} />
                                            {tournament.level}
                                        </span>
                                    </div>

                                    <div className="tournaments__card-prize">
                                        <Trophy size={16} />
                                        {tournament.prize}
                                    </div>

                                    <div className="tournaments__card-deadline">
                                        <Clock size={14} />
                                        Inscripción hasta: {formatDate(tournament.registrationDeadline)}
                                    </div>

                                    <div className="tournaments__card-progress">
                                        <div className="tournaments__progress-bar">
                                            <div
                                                className="tournaments__progress-fill"
                                                style={{ width: `${(tournament.currentTeams / tournament.maxTeams) * 100}%` }}
                                            />
                                        </div>
                                        <span className="tournaments__progress-text">
                                            {tournament.maxTeams - tournament.currentTeams} plazas disponibles
                                        </span>
                                    </div>

                                    <Button
                                        variant="primary"
                                        fullWidth
                                        rightIcon={<ArrowRight size={18} />}
                                        disabled={tournament.currentTeams >= tournament.maxTeams}
                                    >
                                        {tournament.currentTeams >= tournament.maxTeams ? 'Completo' : 'Inscribirse'}
                                    </Button>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Completed Tournaments */}
                {completedTournaments.length > 0 && (
                    <section className="tournaments__section">
                        <h2 className="tournaments__section-title">
                            <Medal size={20} />
                            Torneos Finalizados
                        </h2>

                        <div className="tournaments__completed">
                            {completedTournaments.map(tournament => (
                                <Card key={tournament.id} variant="default" padding="md" className="tournaments__completed-card">
                                    <CardBody>
                                        <div className="tournaments__completed-header">
                                            <h3 className="tournaments__completed-title">{tournament.name}</h3>
                                            <span className={`tournaments__status ${getStatusClass(tournament.status)}`}>
                                                {getStatusLabel(tournament.status)}
                                            </span>
                                        </div>
                                        <div className="tournaments__completed-details">
                                            <span>
                                                <Calendar size={14} />
                                                {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
                                            </span>
                                            <span>
                                                <Users size={14} />
                                                {tournament.currentTeams} equipos
                                            </span>
                                        </div>
                                        {tournament.winner && (
                                            <div className="tournaments__winner">
                                                <Trophy size={16} />
                                                Ganador: <strong>{tournament.winner}</strong>
                                            </div>
                                        )}
                                        <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={16} />}>
                                            Ver resultados
                                        </Button>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </Layout>
    );
};
