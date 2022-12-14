import { defineStore } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import { useAuthStore } from "./auth";
import { useSupabaseStore } from "./supabase";
import { useWsStore } from "./ws";

export const useChatStore = defineStore('chat', () => {
  const auth = useAuthStore();
  const { supabase, channel } = useSupabaseStore();

  const roomId = ref("room-id");
  const messageList = ref([]);
  const currentMessage = ref({});

  const owner = computed(() => auth.authUser.id/* ({
    id: auth.authUser.id,
    username: auth.authUser.username,
  }) */);

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
      room_id: roomId.value,
      user_id: auth.authUser.id,
      text: currentMessage.value.text,
    });
    console.log(res)
    if ( res.error ) return;

    currentMessage.value = getEmptyMessage();
  }

  async function getAllMessages()
  {
    const { data, error } = await supabase.from("messages").select("*").eq("room_id", roomId.value);
    console.log(data);
    messageList.value = data;
  }

  onMounted(async () => {
    getAllMessages();

    channel.on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `room_id=eq.${roomId.value}`,
      },
      (payload) => {
        // console.log("payload from channel on", payload)
        messageList.value.push(
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
    messageList, 
    currentMessage,
    getEmptyMessage,
    sendMessage
  }
})
