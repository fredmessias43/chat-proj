import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWsStore = defineStore('ws',() => {

  const socket = ref(null);

  return { socket }
})
