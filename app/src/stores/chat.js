import { defineStore } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import { useAuthStore } from "./auth";
import { useSupabaseStore } from "./supabase";

export const useChatStore = defineStore('chat', () => {
  const auth = useAuthStore();
  const { channel, storeMessage, indexMessage, indexRoom, listenStoreMessageInRoom } = useSupabaseStore();

  const selectedRoomId = ref("room-id");
  const rooms = ref([]);
  const messages = ref([]);
  const currentMessage = ref({});

  function getEmptyMessage() {
    return {
      text: "",
      user_id: auth.user.id,
      room_id: "room-id"
    };
  }

  async function sendMessage() {
    if (!currentMessage.value?.text) return;
    
    // send message to backend
    const { data, error } = await storeMessage(currentMessage.value.text, selectedRoomId.value, auth.user.id);
    if ( error ) return;

    currentMessage.value = getEmptyMessage();
  }

  async function getAllMessages(room_id)
  {
    const { data, error } = await indexMessage(room_id);
    messages.value = data;
  }

  async function getAllRooms()
  {
    const { data, error } = await indexRoom();
    rooms.value = data;
  }

  onMounted(() => {
    getAllMessages(selectedRoomId.value);

    listenStoreMessageInRoom(selectedRoomId.value, (data) => messages.value.push(data));
  });

  return {
    rooms,
    messages,
    selectedRoomId,
    currentMessage,
    getEmptyMessage,
    sendMessage,
    getAllMessages,
    getAllRooms,
  }
})
