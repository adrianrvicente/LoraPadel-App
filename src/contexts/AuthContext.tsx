import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { UserProfile, UserRole } from '../types';

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    session: Session | null;
    isLoading: boolean;
    isDemo: boolean;
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
    signInDemo: (role: UserRole) => Promise<{ error: Error | null }>;
    signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<{ error: Error | null }>;
    signOut: () => Promise<void>;
    updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo profiles for development
const DEMO_PROFILES: Record<UserRole, UserProfile> = {
    admin: {
        id: 'demo-admin-id',
        email: 'admin@lorapadel.com',
        full_name: 'Admin Demo',
        role: 'admin',
        phone: '+34 600 000 001',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    profesor: {
        id: 'demo-profesor-id',
        email: 'profesor@lorapadel.com',
        full_name: 'Fran Ruiz',
        role: 'profesor',
        phone: '+34 600 000 002',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    tutor: {
        id: 'demo-tutor-id',
        email: 'tutor@lorapadel.com',
        full_name: 'Padre Demo',
        role: 'tutor',
        phone: '+34 600 000 003',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    adulto: {
        id: 'demo-adulto-id',
        email: 'usuario@lorapadel.com',
        full_name: 'María García',
        role: 'adulto',
        phone: '+34 600 000 004',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDemo, setIsDemo] = useState(false);

    useEffect(() => {
        // Check if running in demo mode (no Supabase credentials)
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co') {
            setIsDemo(true);
            // Don't auto-login, let user click "Entrar como Demo"
            setIsLoading(false);
            return;
        }

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setIsLoading(false);
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                if (session?.user) {
                    await fetchProfile(session.user.id);
                } else {
                    setProfile(null);
                }
                setIsLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching profile:', error);
        } else {
            setProfile(data as unknown as UserProfile);
        }
        setIsLoading(false);
    };

    const signIn = async (email: string, password: string) => {
        if (isDemo) {
            // En modo demo, usar perfil admin por defecto
            setProfile(DEMO_PROFILES.admin);
            return { error: null };
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error: error as Error | null };
    };

    const signInDemo = async (role: UserRole) => {
        setProfile(DEMO_PROFILES[role]);
        return { error: null };
    };

    const signUp = async (email: string, password: string, fullName: string, role: UserRole) => {
        if (isDemo) {
            setProfile({ ...DEMO_PROFILES[role], email, full_name: fullName });
            return { error: null };
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) return { error: error as Error };

        // Create profile - using type assertion since DB types are generated
        if (data.user) {
            const { error: profileError } = await supabase.from('profiles').insert({
                id: data.user.id,
                email,
                full_name: fullName,
                role,
            } as never);

            if (profileError) return { error: profileError as unknown as Error };
        }

        return { error: null };
    };

    const signOut = async () => {
        if (isDemo) {
            setProfile(null);
            return;
        }
        await supabase.auth.signOut();
    };

    const updateProfile = async (updates: Partial<UserProfile>) => {
        if (!profile) return { error: new Error('No profile') };

        if (isDemo) {
            setProfile({ ...profile, ...updates });
            return { error: null };
        }

        const { error } = await supabase
            .from('profiles')
            .update(updates as never)
            .eq('id', profile.id);

        if (!error) {
            setProfile({ ...profile, ...updates });
        }

        return { error: error as Error | null };
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                session,
                isLoading,
                isDemo,
                signIn,
                signInDemo,
                signUp,
                signOut,
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
