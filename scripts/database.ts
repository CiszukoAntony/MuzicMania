import { createClient } from '@supabase/supabase-js';

// Estos valores deben estar en tu archivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase credentials missing. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * MuzicMania Database Interface
 * Maneja la persistencia de scores, perfiles y datos del juego.
 */
export const DB = {
    /**
     * Obtener el perfil del usuario actual
     */
    async getProfile(userId: string) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Registrar un nuevo récord de canción
     */
    async saveScore(scoreData: { user_id: string; song_id: string; score: number; accuracy: number }) {
        const { data, error } = await supabase
            .from('leaderboards')
            .insert([scoreData]);

        if (error) throw error;
        return data;
    },

    /**
     * Monitor de estado de conexión
     */
    isReady(): boolean {
        return !!(supabaseUrl && supabaseAnonKey);
    }
};

console.log('🪐 MuzicMania DB: Initialized for production-ready backend.');
