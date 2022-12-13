import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'

export const useSupabaseStore = defineStore('supabase', () => {

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const supabase = ref(
    createClient(supabaseUrl, supabaseAnonKey)
  );

  return { supabase }
})
