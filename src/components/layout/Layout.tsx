import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    Home,
    Calendar,
    RefreshCw,
    LayoutGrid,
    Trophy,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Bell
} from 'lucide-react';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
}

const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/clases', icon: Calendar, label: 'Clases' },
    { path: '/recuperaciones', icon: RefreshCw, label: 'Recuperaciones' },
    { path: '/pistas', icon: LayoutGrid, label: 'Pistas' },
    { path: '/torneos', icon: Trophy, label: 'Torneos' },
];

const adminItems = [
    { path: '/admin/usuarios', icon: Users, label: 'Usuarios' },
    { path: '/admin/configuracion', icon: Settings, label: 'Configuración' },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { profile, signOut, isDemo } = useAuth();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;
    const isAdmin = profile?.role === 'admin';

    return (
        <div className="layout">
            {/* Mobile Header */}
            <header className="layout__mobile-header">
                <button
                    className="layout__menu-btn"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-label="Toggle menu"
                >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <img src="/logo.png" alt="Lora Pádel" className="layout__mobile-logo" />
                <button className="layout__notification-btn" aria-label="Notifications">
                    <Bell size={24} />
                </button>
            </header>

            {/* Sidebar */}
            <aside className={`layout__sidebar ${sidebarOpen ? 'layout__sidebar--open' : ''}`}>
                <div className="layout__sidebar-header">
                    <img src="/logo.png" alt="Lora Pádel" className="layout__logo" />
                    <span className="layout__brand">Lora Pádel</span>
                </div>

                {isDemo && (
                    <div className={`layout__demo-banner ${isAdmin ? 'layout__demo-banner--admin' : 'layout__demo-banner--user'}`}>
                        {isAdmin ? '🛡️ Vista Admin' : '👤 Vista Usuario'}
                    </div>
                )}

                <nav className="layout__nav">
                    <ul className="layout__nav-list">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`layout__nav-item ${isActive(item.path) ? 'layout__nav-item--active' : ''}`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon size={20} />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {isAdmin && (
                        <>
                            <div className="layout__nav-divider">
                                <span>Administración</span>
                            </div>
                            <ul className="layout__nav-list">
                                {adminItems.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            className={`layout__nav-item ${isActive(item.path) ? 'layout__nav-item--active' : ''}`}
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <item.icon size={20} />
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </nav>

                <div className="layout__sidebar-footer">
                    <div className="layout__user">
                        <div className="layout__user-avatar">
                            {profile?.full_name?.charAt(0) || 'U'}
                        </div>
                        <div className="layout__user-info">
                            <span className="layout__user-name">{profile?.full_name || 'Usuario'}</span>
                            <span className="layout__user-role">{profile?.role || 'Rol'}</span>
                        </div>
                    </div>
                    <button className="layout__logout-btn" onClick={signOut} aria-label="Cerrar sesión">
                        <LogOut size={20} />
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="layout__overlay"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Main Content */}
            <main className="layout__main">
                {children}
            </main>
        </div>
    );
};
