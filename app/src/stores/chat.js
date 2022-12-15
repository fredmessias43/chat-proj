import { defineStore } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import { useAuthStore } from "./auth";
import { useSupabaseStore } from "./supabase";

export const useChatStore = defineStore('chat', () => {
  const auth = useAuthStore();
  const { supabase, channel } = useSupabaseStore();

  const selectedRoomId = ref("room-id");
  const rooms = ref([]);
  const messages = ref([]);
  const currentMessage = ref({});

  const owner = computed(() => auth.user.id);

  function getEmptyMessage() {
    return {
      owner: owner.value,
      text: ""
    };
  }

  async function sendMessage() {
    if (!currentMessage.value?.text) return;
    
    // send message to backend
    const res = await supabase.from('messages').insert({
      room_id: selectedRoomId.value,
      user_id: auth.user.id,
      text: currentMessage.value.text,
    });
    if ( res.error ) return;

    currentMessage.value = getEmptyMessage();
  }

  async function getAllMessages(room_id)
  {
    const { data, error } = await supabase.from("messages").select("*").eq("room_id", room_id);
    messages.value = data;
  }

  async function getAllRooms()
  {
    const { data, error } = await supabase.from("rooms").select("*")/* .eq("room_id", selectedRoomId.value) */;
    rooms.value = data;
  }

  onMounted(async () => {
    getAllMessages(selectedRoomId.value);

    channel.on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `room_id=eq.${selectedRoomId.value}`,
      },
      (payload) => {
        // console.log("payload from channel on", payload)
        messages.value.push(
          payload.new
        )
      }
    )

    channel.subscribe(async (status, error) => {
      if (status === 'SUBSCRIBED') {}
    })

  });


  watch(
    () => owner.value,
    (value) => {
      currentMessage.value.owner = value;
    }
  );

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
