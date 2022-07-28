import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {

  const authUser = ref({
    id: "",
    username: "",
    accessToken: "",
    profilePhoto: {},
  });
  
  return { authUser }
})
