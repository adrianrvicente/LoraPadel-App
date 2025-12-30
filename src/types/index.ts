// User Roles
export type UserRole = 'admin' | 'profesor' | 'tutor' | 'adulto';

// Player Levels
export type PlayerLevel =
    | 'iniciacion'
    | 'basico'
    | 'intermedio'
    | 'avanzado'
    | 'competicion';

// User Profile
export interface UserProfile {
    id: string;
    email: string;
    full_name: string;
    role: UserRole;
    phone?: string;
    avatar_url?: string;
    created_at: string;
    updated_at: string;
}

// Student (can be minor or adult player)
export interface Student {
    id: string;
    user_id: string; // Parent/tutor or self if adult
    full_name: string;
    level: PlayerLevel;
    is_minor: boolean;
    birth_date?: string;
    notes?: string;
    pending_recoveries: number;
    created_at: string;
}

// Professor/Coach
export interface Professor {
    id: string;
    user_id: string;
    full_name: string;
    specialization?: string;
    bio?: string;
    avatar_url?: string;
    is_active: boolean;
}

// Class
export interface Class {
    id: string;
    name: string;
    professor_id: string;
    court_id: string;
    level: PlayerLevel;
    day_of_week: number; // 0-6 (Sunday-Saturday)
    start_time: string; // HH:MM
    end_time: string; // HH:MM
    max_students: number;
    is_active: boolean;
}

// Class Session (specific date)
export interface ClassSession {
    id: string;
    class_id: string;
    date: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    notes?: string;
}

// Attendance
export interface Attendance {
    id: string;
    session_id: string;
    student_id: string;
    status: 'confirmed' | 'cancelled' | 'pending' | 'attended' | 'no_show';
    confirmed_at?: string;
    cancelled_at?: string;
    cancellation_penalty: boolean;
}

// Recovery Slot (available slot from cancellation)
export interface RecoverySlot {
    id: string;
    session_id: string;
    original_student_id: string;
    claimed_by_student_id?: string;
    level: PlayerLevel;
    status: 'available' | 'claimed' | 'expired';
    created_at: string;
    expires_at: string;
}

// Court
export interface Court {
    id: string;
    name: string;
    description?: string;
    is_indoor: boolean;
    is_active: boolean;
}

// Court Booking
export interface CourtBooking {
    id: string;
    court_id: string;
    user_id: string;
    date: string;
    start_time: string;
    end_time: string;
    screenshot_url?: string;
    verification_status: 'pending' | 'verified' | 'rejected';
    verification_data?: {
        detected_court?: string;
        detected_date?: string;
        detected_time?: string;
    };
    is_open_match: boolean;
    current_players: number;
    max_players: number;
    created_at: string;
}

// Tournament
export interface Tournament {
    id: string;
    name: string;
    description?: string;
    start_date: string;
    end_date: string;
    registration_deadline: string;
    max_teams: number;
    level: PlayerLevel;
    status: 'draft' | 'registration' | 'in_progress' | 'completed';
    prize?: string;
}

// App Configuration (Admin settings)
export interface AppConfig {
    cancellation_hours: number;
    max_pending_recoveries: number;
    levels: PlayerLevel[];
    courts_count: number;
    class_duration_minutes: number;
    whatsapp_enabled: boolean;
    email_enabled: boolean;
}

// Notification
export interface Notification {
    id: string;
    user_id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'recovery_available';
    is_read: boolean;
    created_at: string;
    action_url?: string;
}
