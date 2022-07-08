import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWsStore = defineStore('ws',() => {

  const conn = ref(null);

  return { conn }
})
