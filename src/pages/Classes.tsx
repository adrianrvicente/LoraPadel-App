import React, { useState } from 'react';
import { Layout } from '../components/layout';
import { Card, CardBody, Button } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';
import {
    Calendar as CalendarIcon,
    Clock,
    Users,
    MapPin,
    Plus,
    ChevronLeft,
    ChevronRight,
    Filter
} from 'lucide-react';
import type { PlayerLevel } from '../types';
import './Classes.css';

// Demo data for classes
const demoClasses = [
    {
        id: '1',
        name: 'Iniciación Infantil',
        professor: 'Fran Ruiz',
        court: 'Pista 1',
        level: 'iniciacion' as PlayerLevel,
        dayOfWeek: 1, // Monday
        startTime: '16:00',
        endTime: '17:00',
        students: ['María', 'Pablo', 'Lucía', 'Carlos'],
        maxStudents: 4
    },
    {
        id: '2',
        name: 'Básico Adultos',
        professor: 'Fran Ruiz',
        court: 'Pista 2',
        level: 'basico' as PlayerLevel,
        dayOfWeek: 1,
        startTime: '17:00',
        endTime: '18:00',
        students: ['Ana', 'Pedro', 'Laura'],
        maxStudents: 4
    },
    {
        id: '3',
        name: 'Intermedio Tarde',
        professor: 'Fran Ruiz',
        court: 'Pista 1',
        level: 'intermedio' as PlayerLevel,
        dayOfWeek: 1,
        startTime: '18:00',
        endTime: '19:00',
        students: ['Juan', 'Sara', 'Miguel', 'Elena'],
        maxStudents: 4
    },
    {
        id: '4',
        name: 'Avanzado',
        professor: 'Fran Ruiz',
        court: 'Pista 3',
        level: 'avanzado' as PlayerLevel,
        dayOfWeek: 1,
        startTime: '19:00',
        endTime: '20:00',
        students: ['David', 'Carmen'],
        maxStudents: 4
    },
    {
        id: '5',
        name: 'Competición',
        professor: 'Fran Ruiz',
        court: 'Pista 4',
        level: 'competicion' as PlayerLevel,
        dayOfWeek: 1,
        startTime: '20:00',
        endTime: '21:00',
        students: ['Roberto', 'Marta', 'Andrés', 'Paula'],
        maxStudents: 4
    },
    {
        id: '6',
        name: 'Iniciación Mañana',
        professor: 'Fran Ruiz',
        court: 'Pista 1',
        level: 'iniciacion' as PlayerLevel,
        dayOfWeek: 2, // Tuesday
        startTime: '10:00',
        endTime: '11:00',
        students: ['Luis', 'Rosa'],
        maxStudents: 4
    },
    {
        id: '7',
        name: 'Intermedio Mañana',
        professor: 'Fran Ruiz',
        court: 'Pista 2',
        level: 'intermedio' as PlayerLevel,
        dayOfWeek: 3, // Wednesday
        startTime: '11:00',
        endTime: '12:00',
        students: ['Fernando', 'Silvia', 'Javier'],
        maxStudents: 4
    },
];

const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const fullDayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

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

export const Classes: React.FC = () => {
    const { profile } = useAuth();
    const isAdmin = profile?.role === 'admin' || profile?.role === 'profesor';

    const [selectedDay, setSelectedDay] = useState(1); // Monday
    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        return new Date(today.setDate(diff));
    });

    const getWeekDates = () => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(currentWeekStart);
            date.setDate(currentWeekStart.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const weekDates = getWeekDates();

    const navigateWeek = (direction: 'prev' | 'next') => {
        const newStart = new Date(currentWeekStart);
        newStart.setDate(currentWeekStart.getDate() + (direction === 'next' ? 7 : -7));
        setCurrentWeekStart(newStart);
    };

    const classesForDay = demoClasses.filter(c => c.dayOfWeek === selectedDay);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
    };

    return (
        <Layout>
            <div className="classes">
                <header className="classes__header">
                    <div>
                        <h1 className="classes__title">
                            {isAdmin ? 'Gestión de Clases' : 'Mis Clases'}
                        </h1>
                        <p className="classes__subtitle">
                            {isAdmin
                                ? 'Horarios, asistencia y gestión de grupos'
                                : 'Consulta tus horarios y confirma tu asistencia'}
                        </p>
                    </div>
                    {isAdmin && (
                        <Button variant="primary" leftIcon={<Plus size={18} />}>
                            Nueva Clase
                        </Button>
                    )}
                </header>

                {/* Week Navigation */}
                <div className="classes__week-nav">
                    <button className="classes__nav-btn" onClick={() => navigateWeek('prev')}>
                        <ChevronLeft size={20} />
                    </button>
                    <div className="classes__week-days">
                        {weekDates.map((date, index) => {
                            const dayIndex = date.getDay();
                            const isSelected = dayIndex === selectedDay;
                            const isToday = date.toDateString() === new Date().toDateString();

                            return (
                                <button
                                    key={index}
                                    className={`classes__day-btn ${isSelected ? 'classes__day-btn--selected' : ''} ${isToday ? 'classes__day-btn--today' : ''}`}
                                    onClick={() => setSelectedDay(dayIndex)}
                                >
                                    <span className="classes__day-name">{dayNames[dayIndex]}</span>
                                    <span className="classes__day-date">{date.getDate()}</span>
                                </button>
                            );
                        })}
                    </div>
                    <button className="classes__nav-btn" onClick={() => navigateWeek('next')}>
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Filter */}
                <div className="classes__filters">
                    <div className="classes__selected-day">
                        <CalendarIcon size={18} />
                        <span>{fullDayNames[selectedDay]}, {formatDate(weekDates[selectedDay === 0 ? 6 : selectedDay - 1])}</span>
                    </div>
                    <Button variant="ghost" size="sm" leftIcon={<Filter size={16} />}>
                        Filtrar por nivel
                    </Button>
                </div>

                {/* Classes Grid */}
                <div className="classes__grid">
                    {classesForDay.length > 0 ? (
                        classesForDay.map((cls) => (
                            <Card key={cls.id} variant="default" padding="none" interactive className="classes__card">
                                <div
                                    className="classes__card-accent"
                                    style={{ backgroundColor: levelColors[cls.level] }}
                                />
                                <CardBody className="classes__card-body">
                                    <div className="classes__card-header">
                                        <span
                                            className="classes__card-level"
                                            style={{
                                                backgroundColor: `${levelColors[cls.level]}20`,
                                                color: levelColors[cls.level]
                                            }}
                                        >
                                            {levelLabels[cls.level]}
                                        </span>
                                        <span className="classes__card-time">
                                            <Clock size={14} />
                                            {cls.startTime} - {cls.endTime}
                                        </span>
                                    </div>

                                    <h3 className="classes__card-name">{cls.name}</h3>

                                    <div className="classes__card-details">
                                        <span className="classes__card-detail">
                                            <MapPin size={14} />
                                            {cls.court}
                                        </span>
                                        <span className="classes__card-detail">
                                            <Users size={14} />
                                            {cls.students.length}/{cls.maxStudents}
                                        </span>
                                    </div>

                                    <div className="classes__card-students">
                                        {cls.students.slice(0, 4).map((student, idx) => (
                                            <div key={idx} className="classes__student-avatar">
                                                {student.charAt(0)}
                                            </div>
                                        ))}
                                        {cls.students.length > 4 && (
                                            <div className="classes__student-more">
                                                +{cls.students.length - 4}
                                            </div>
                                        )}
                                    </div>

                                    {isAdmin && (
                                        <div className="classes__card-actions">
                                            <Button variant="outline" size="sm" fullWidth>
                                                Pasar Lista
                                            </Button>
                                        </div>
                                    )}
                                </CardBody>
                            </Card>
                        ))
                    ) : (
                        <div className="classes__empty">
                            <CalendarIcon size={48} />
                            <h3>Sin clases programadas</h3>
                            <p>No hay clases para {fullDayNames[selectedDay].toLowerCase()}</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};
