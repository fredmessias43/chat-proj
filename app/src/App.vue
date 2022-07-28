<template>
  <div id="app">
    <h2>Vue.js WebSocket Tutorial</h2>

    <div style="display: flex;flex-direction: column;">
      <span v-for="m in chat.messageList">
        {{m.owner.username}} - {{m.text}}
      </span>
    </div>

    <form @submit.prevent="sendMessage">
      <input v-model="chat.currentMessage.text" />
      <button type="submit">Send Message</button>
    </form>

    <Dialog ref="dialog" id="userForm" :show-secondary-btn="false">
      <form @submit.prevent="handleSubmit" id="userForm">
        <input v-model="user.username" placeholder="username" name="username">
        <input v-model="user.email" placeholder="email" name="email" type="email">
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useWsStore } from "./stores/ws"
import { useChatStore } from "./stores/chat"
import { useAuthStore } from "./stores/auth"
import { io } from "socket.io-client";
import Dialog from './components/Dialog.vue';

const dialog = ref(null);
const user = ref({
  username: "fred_ghost",
  email: "fredmessias43@gmail.com"
});

const chat = useChatStore();
const auth = useAuthStore();
const ws = useWsStore();

ws.socket = new io("http://localhost:8000");
ws.socket.on("open", function (event) {
  console.log("connected ws server on ", event)
});

function handleSubmit() {
  auth.authUser = {
    ...auth.authUser,
    ...user.value
  };
  dialog.value.close();
}

function sendMessage() {
  ws.socket.emit("chat message", chat.currentMessage);
  chat.currentMessage = chat.getEmptyMessage();
}

ws.socket.on("chat message", function (event) {
  chat.messageList.push(event);
})

onMounted(() => {
  dialog.value.open();
});

</script>

