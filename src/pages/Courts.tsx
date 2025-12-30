import React, { useState } from 'react';
import { Layout } from '../components/layout';
import { Card, CardBody, Button } from '../components/ui';
import {
    LayoutGrid,
    Calendar,
    Clock,
    Users,
    Plus,
    ChevronLeft,
    ChevronRight,
    Upload,
    UserPlus,
    CheckCircle
} from 'lucide-react';
import './Courts.css';

// Demo data for courts
const courts = [
    { id: '1', name: 'Pista 1', isIndoor: true },
    { id: '2', name: 'Pista 2', isIndoor: true },
    { id: '3', name: 'Pista 3', isIndoor: true },
    { id: '4', name: 'Pista 4', isIndoor: true },
];

// Demo time slots
const timeSlots = [
    '09:30', '10:30', '11:30', '12:30', '13:30',
    '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
];

// Demo bookings
const demoBookings: Record<string, { courtId: string; time: string; user: string; isOpenMatch: boolean; players: number; maxPlayers: number; verified: boolean }[]> = {
    '2025-12-30': [
        { courtId: '1', time: '10:30', user: 'Juan García', isOpenMatch: true, players: 2, maxPlayers: 4, verified: true },
        { courtId: '2', time: '17:00', user: 'Ana López', isOpenMatch: false, players: 4, maxPlayers: 4, verified: true },
        { courtId: '3', time: '19:00', user: 'Pedro Ruiz', isOpenMatch: true, players: 3, maxPlayers: 4, verified: true },
    ],
    '2025-12-31': [
        { courtId: '1', time: '11:30', user: 'María Sanz', isOpenMatch: false, players: 4, maxPlayers: 4, verified: true },
        { courtId: '4', time: '18:00', user: 'Carlos Díaz', isOpenMatch: true, players: 1, maxPlayers: 4, verified: false },
    ],
};

// Demo open matches
const openMatches = [
    { id: '1', court: 'Pista 1', date: '2025-12-30', time: '10:30', organizer: 'Juan García', currentPlayers: 2, maxPlayers: 4, level: 'Intermedio' },
    { id: '2', court: 'Pista 3', date: '2025-12-30', time: '19:00', organizer: 'Pedro Ruiz', currentPlayers: 3, maxPlayers: 4, level: 'Avanzado' },
    { id: '3', court: 'Pista 4', date: '2025-12-31', time: '18:00', organizer: 'Carlos Díaz', currentPlayers: 1, maxPlayers: 4, level: 'Básico' },
];

export const Courts: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<{ courtId: string; time: string } | null>(null);
    const [activeTab, setActiveTab] = useState<'calendar' | 'open'>('calendar');

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const formatDisplayDate = (date: Date) => {
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        });
    };

    const navigateDate = (direction: 'prev' | 'next') => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 1 : -1));
        setSelectedDate(newDate);
    };

    const dateKey = formatDate(selectedDate);
    const bookingsForDate = demoBookings[dateKey] || [];

    const getSlotStatus = (courtId: string, time: string) => {
        const booking = bookingsForDate.find(b => b.courtId === courtId && b.time === time);
        if (!booking) return 'available';
        if (booking.isOpenMatch && booking.players < booking.maxPlayers) return 'open';
        return 'booked';
    };

    const getSlotBooking = (courtId: string, time: string) => {
        return bookingsForDate.find(b => b.courtId === courtId && b.time === time);
    };

    const handleSlotClick = (courtId: string, time: string) => {
        const status = getSlotStatus(courtId, time);
        if (status === 'available') {
            setSelectedSlot({ courtId, time });
            setShowBookingModal(true);
        }
    };

    return (
        <Layout>
            <div className="courts">
                <header className="courts__header">
                    <div>
                        <h1 className="courts__title">Reserva de Pistas</h1>
                        <p className="courts__subtitle">4 pistas indoor disponibles</p>
                    </div>
                </header>

                {/* Tabs */}
                <div className="courts__tabs">
                    <button
                        className={`courts__tab ${activeTab === 'calendar' ? 'courts__tab--active' : ''}`}
                        onClick={() => setActiveTab('calendar')}
                    >
                        <Calendar size={18} />
                        Calendario
                    </button>
                    <button
                        className={`courts__tab ${activeTab === 'open' ? 'courts__tab--active' : ''}`}
                        onClick={() => setActiveTab('open')}
                    >
                        <Users size={18} />
                        Partidos Abiertos
                        {openMatches.length > 0 && (
                            <span className="courts__tab-badge">{openMatches.length}</span>
                        )}
                    </button>
                </div>

                {activeTab === 'calendar' && (
                    <>
                        {/* Date Navigation */}
                        <div className="courts__date-nav">
                            <button className="courts__nav-btn" onClick={() => navigateDate('prev')}>
                                <ChevronLeft size={20} />
                            </button>
                            <div className="courts__current-date">
                                <Calendar size={20} />
                                <span>{formatDisplayDate(selectedDate)}</span>
                            </div>
                            <button className="courts__nav-btn" onClick={() => navigateDate('next')}>
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Legend */}
                        <div className="courts__legend">
                            <span className="courts__legend-item">
                                <span className="courts__legend-dot courts__legend-dot--available" />
                                Disponible
                            </span>
                            <span className="courts__legend-item">
                                <span className="courts__legend-dot courts__legend-dot--open" />
                                Partido Abierto
                            </span>
                            <span className="courts__legend-item">
                                <span className="courts__legend-dot courts__legend-dot--booked" />
                                Reservado
                            </span>
                        </div>

                        {/* Calendar Grid */}
                        <div className="courts__calendar">
                            <div className="courts__calendar-header">
                                <div className="courts__time-header">Hora</div>
                                {courts.map(court => (
                                    <div key={court.id} className="courts__court-header">
                                        <LayoutGrid size={16} />
                                        {court.name}
                                    </div>
                                ))}
                            </div>

                            <div className="courts__calendar-body">
                                {timeSlots.map(time => (
                                    <div key={time} className="courts__row">
                                        <div className="courts__time-cell">{time}</div>
                                        {courts.map(court => {
                                            const status = getSlotStatus(court.id, time);
                                            const booking = getSlotBooking(court.id, time);

                                            return (
                                                <div
                                                    key={`${court.id}-${time}`}
                                                    className={`courts__slot courts__slot--${status}`}
                                                    onClick={() => handleSlotClick(court.id, time)}
                                                >
                                                    {status === 'available' && (
                                                        <span className="courts__slot-text">
                                                            <Plus size={16} />
                                                            Reservar
                                                        </span>
                                                    )}
                                                    {status === 'open' && booking && (
                                                        <div className="courts__slot-open">
                                                            <span className="courts__slot-players">
                                                                <Users size={14} />
                                                                {booking.players}/{booking.maxPlayers}
                                                            </span>
                                                            <span className="courts__slot-join">Unirse</span>
                                                        </div>
                                                    )}
                                                    {status === 'booked' && booking && (
                                                        <div className="courts__slot-booked">
                                                            <span>{booking.user.split(' ')[0]}</span>
                                                            {booking.verified && <CheckCircle size={12} />}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'open' && (
                    <div className="courts__open-matches">
                        <div className="courts__open-header">
                            <h2>Partidos buscando jugadores</h2>
                            <p>Únete a un partido que necesite completar equipo</p>
                        </div>

                        <div className="courts__open-grid">
                            {openMatches.map(match => (
                                <Card key={match.id} variant="glass" padding="lg" className="courts__match-card">
                                    <CardBody>
                                        <div className="courts__match-header">
                                            <span className="courts__match-court">{match.court}</span>
                                            <span className="courts__match-level">{match.level}</span>
                                        </div>

                                        <div className="courts__match-datetime">
                                            <span><Calendar size={14} /> {new Date(match.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                                            <span><Clock size={14} /> {match.time}</span>
                                        </div>

                                        <div className="courts__match-organizer">
                                            Organiza: {match.organizer}
                                        </div>

                                        <div className="courts__match-players">
                                            <div className="courts__match-avatars">
                                                {Array.from({ length: match.currentPlayers }).map((_, i) => (
                                                    <div key={i} className="courts__match-avatar">
                                                        <Users size={14} />
                                                    </div>
                                                ))}
                                                {Array.from({ length: match.maxPlayers - match.currentPlayers }).map((_, i) => (
                                                    <div key={i} className="courts__match-avatar courts__match-avatar--empty">
                                                        ?
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="courts__match-spots">
                                                {match.maxPlayers - match.currentPlayers} plaza{match.maxPlayers - match.currentPlayers > 1 ? 's' : ''} libre{match.maxPlayers - match.currentPlayers > 1 ? 's' : ''}
                                            </span>
                                        </div>

                                        <Button variant="primary" fullWidth leftIcon={<UserPlus size={18} />}>
                                            Unirme al partido
                                        </Button>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Booking Modal (simplified) */}
                {showBookingModal && selectedSlot && (
                    <div className="courts__modal-overlay" onClick={() => setShowBookingModal(false)}>
                        <div className="courts__modal" onClick={e => e.stopPropagation()}>
                            <h2>Reservar {courts.find(c => c.id === selectedSlot.courtId)?.name}</h2>
                            <p className="courts__modal-time">
                                <Clock size={16} />
                                {selectedSlot.time} - {formatDisplayDate(selectedDate)}
                            </p>

                            <div className="courts__modal-section">
                                <label>Pantallazo de confirmación</label>
                                <div className="courts__upload-area">
                                    <Upload size={32} />
                                    <span>Sube el pantallazo de tu reserva</span>
                                    <span className="courts__upload-hint">Gemini verificará la pista, fecha y hora</span>
                                </div>
                            </div>

                            <div className="courts__modal-checkbox">
                                <input type="checkbox" id="openMatch" />
                                <label htmlFor="openMatch">Abrir plazas para otros jugadores</label>
                            </div>

                            <div className="courts__modal-actions">
                                <Button variant="ghost" onClick={() => setShowBookingModal(false)}>
                                    Cancelar
                                </Button>
                                <Button variant="primary">
                                    Confirmar Reserva
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};
