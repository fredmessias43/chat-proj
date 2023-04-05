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

  async function signUp()
  {
    const { error, data } = await supabase.auth.signUp({
      email: user.value.email,
      password: user.value.password,
    })
    if (error) throw error;
    return data;
  }

  async function signIn()
  {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: user.value.email,
      password: user.value.password,
    })
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
