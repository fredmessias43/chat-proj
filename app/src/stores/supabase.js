import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { createClient } from '@supabase/supabase-js'

export const useSupabaseStore = defineStore('supabase', () => {

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  
  const supabase = ref(
    createClient(supabaseUrl, supabaseAnonKey)
  );
    
  const channelStatus = ref("");
  const channel = ref(
    supabase.value.channel('chat-messages')
  );

  async function storeMessage(text, room_id, user_id)
  {
    return await supabase.value.from('messages').insert({ room_id, user_id, text });  
  }

  async function indexRoom(room_id)
  {
    return await supabase.value.from("rooms").select("*");
  }

  async function indexMessage(room_id)
  {
    return await supabase.value.from("messages").select("*, user (*)").eq("room_id", room_id);
  }

  function listenStoreMessageInRoom(room_id, callback)
  {
    channel.value.on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `room_id=eq.${room_id}`,
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();
  }

  function sendMessage()
  {
    // if (channelStatus.value === "SUBSCRIBED")
    channel.value.send({
      type: 'broadcast',
      event: 'supa',
      payload: { org: 'supabase' },
    });
  }

  onMounted(() => {
    // channel.value.subscribe(async (status, error) => { channelStatus.value = status; });
  });

  return {
    supabase, channel, storeMessage, indexMessage, indexRoom, listenStoreMessageInRoom, sendMessage
  }
})
