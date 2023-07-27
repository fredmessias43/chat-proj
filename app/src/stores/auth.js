import { defineStore } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useSupabaseStore } from './supabase';

export const useAuthStore = defineStore('auth', () => {
  const { supabase, channel } = useSupabaseStore();

  const user = ref({
    id: "",
    username: "",
    accessToken: "",
    profilePhoto: {},
  });
  const session = ref({});

  const isAuthenticated = computed(() => Boolean(user.value.id) );

  async function signUp({email, password})
  {
    const { error, data } = await supabase.auth.signUp({email, password});
    if (error) throw error;

    user.value = data.user;
    return data;
  }

  async function signIn({ email, password })
  {
    const { error, data } = await supabase.auth.signInWithPassword({email, password})
    if (error) throw error;

    user.value = data.user;
    return data;
  }

  async function getUser(session)
  {
    const { user } = session

    let { data, error, status } = await supabase
      .from('profiles')
      .select()
      .eq('id', user.id)
      .single()

    if (error && status !== 406) throw error

    auth.user = data;
    return data;
  }

  async function getSession()
  {
    const { data } = await supabase.auth.getSession()/* .then(({ data }) => {}) */;
    session.value = data.session;
    return session.value;
  }

  onMounted(() => {
    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session
    })
  });
  
  return { user, session, isAuthenticated, signUp, signIn, getUser, getSession}
})
