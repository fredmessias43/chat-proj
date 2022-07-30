<template>
  <div class="app">

    <div class="chat-container">
      
      <UsersConnectedList />

      <div class="message-wrapper" ref="messageWrapper" >
        <Message 
          v-for="m, i in chat.messageList" 
          :key="i"
          :message="m"
        />
      </div>

      <div class="message-input" >
        <form @submit.prevent="sendMessage">
          <input v-model="chat.currentMessage.text" />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>

    <Dialog ref="dialog" id="userForm" :show-secondary-btn="false">
      <form @submit.prevent="handleSubmit" id="userForm" style="display: flex;flex-direction: column;">
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
import Message from './components/chat/Message.vue';
import UsersConnectedList from './components/UsersConnectedList.vue';

const messageWrapper = ref(null);
const dialog = ref(null);
const user = ref({
  username: "fred_ghost",
  email: "fredmessias43@gmail.com"
});

const chat = useChatStore();
const auth = useAuthStore();
const ws = useWsStore();

ws.socket = new io("http://localhost:8000")
.on("open", function (event) {
  console.log("connected ws server on ", event)
});

function handleSubmit() {
  auth.authUser = {
    ...auth.authUser,
    ...user.value
  };
  dialog.value.close();

  ws.socket.emit("user connected", auth.authUser);
}

function sendMessage() {
  if ( !chat.currentMessage?.text ) return;
  ws.socket.emit("chat message", chat.currentMessage);
  chat.currentMessage = chat.getEmptyMessage();
}

ws.socket.on("chat message", function (event) {
  chat.messageList.push(event);
  messageWrapper.value.scrollTo(0, messageWrapper.value.scrollHeight );
});

onMounted(() => {
  dialog.value.open();
});

</script>

<style scoped lang="scss" >
.app {
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
}
.chat-container {
  margin: 5rem auto;
  padding: 1rem;
  max-width: 50vw;
  height: 50vw;
  display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.message-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}
.message-input {
  margin-top: 1rem;
  form {
    display: flex;
    input {
      width: 100%;
    }
  }
}


</style>