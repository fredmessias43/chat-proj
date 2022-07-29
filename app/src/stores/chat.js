import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useAuthStore } from "./auth";
import { useWsStore } from "./ws";

export const useChatStore = defineStore('chat', () => {
  const auth = useAuthStore();
  const ws = useWsStore();

  const messageList = ref([]);
  const currentMessage = ref({});

  const owner = computed(() => ({
    id: auth.authUser.id,
    username: auth.authUser.username,
  }));

  function getEmptyMessage() {
    return {
      owner: owner.value,
      text: ""
    };
  }

  watch(
    () => owner.value,
    (value) => {
      currentMessage.value.owner = value;
    }
  );

  return {
    messageList, 
    currentMessage,
    getEmptyMessage
  }
})
