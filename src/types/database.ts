// Supabase Database Types (placeholder - will be generated from Supabase)
export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    full_name: string
                    role: 'admin' | 'profesor' | 'tutor' | 'adulto'
                    phone: string | null
                    avatar_url: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    full_name: string
                    role?: 'admin' | 'profesor' | 'tutor' | 'adulto'
                    phone?: string | null
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    full_name?: string
                    role?: 'admin' | 'profesor' | 'tutor' | 'adulto'
                    phone?: string | null
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            students: {
                Row: {
                    id: string
                    user_id: string
                    full_name: string
                    level: 'iniciacion' | 'basico' | 'intermedio' | 'avanzado' | 'competicion'
                    is_minor: boolean
                    birth_date: string | null
                    notes: string | null
                    pending_recoveries: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    full_name: string
                    level?: 'iniciacion' | 'basico' | 'intermedio' | 'avanzado' | 'competicion'
                    is_minor?: boolean
                    birth_date?: string | null
                    notes?: string | null
                    pending_recoveries?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    full_name?: string
                    level?: 'iniciacion' | 'basico' | 'intermedio' | 'avanzado' | 'competicion'
                    is_minor?: boolean
                    birth_date?: string | null
                    notes?: string | null
                    pending_recoveries?: number
                    created_at?: string
                }
            }
            classes: {
                Row: {
                    id: string
                    name: string
                    professor_id: string
                    court_id: string
                    level: 'iniciacion' | 'basico' | 'intermedio' | 'avanzado' | 'competicion'
                    day_of_week: number
                    start_time: string
                    end_time: string
                    max_students: number
                    is_active: boolean
                }
                Insert: {
                    id?: string
                    name: string
                    professor_id: string
                    court_id: string
                    level?: 'iniciacion' | 'basico' | 'intermedio' | 'avanzado' | 'competicion'
                    day_of_week: number
                    start_time: string
                    end_time: string
                    max_students?: number
                    is_active?: boolean
                }
                Update: {
                    id?: string
                    name?: string
                    professor_id?: string
                    court_id?: string
                    level?: 'iniciacion' | 'basico' | 'intermedio' | 'avanzado' | 'competicion'
                    day_of_week?: number
                    start_time?: string
                    end_time?: string
                    max_students?: number
                    is_active?: boolean
                }
            }
            courts: {
                Row: {
                    id: string
                    name: string
                    description: string | null
                    is_indoor: boolean
                    is_active: boolean
                }
                Insert: {
                    id?: string
                    name: string
                    description?: string | null
                    is_indoor?: boolean
                    is_active?: boolean
                }
                Update: {
                    id?: string
                    name?: string
                    description?: string | null
                    is_indoor?: boolean
                    is_active?: boolean
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            user_role: 'admin' | 'profesor' | 'tutor' | 'adulto'
            player_level: 'iniciacion' | 'basico' | 'intermedio' | 'avanzado' | 'competicion'
        }
    }
}
