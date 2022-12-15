import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {

  const user = ref({
    id: "",
    username: "",
    accessToken: "",
    profilePhoto: {},
  });
  const session = ref({});

  const isAuthenticated = computed(() => Boolean(user.value.id) );
  
  return { user, session, isAuthenticated }
})
