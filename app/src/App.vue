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

    <LoginComponent />
    
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useChatStore } from "./stores/chat"
import { useAuthStore } from "./stores/auth"
import Message from './components/chat/Message.vue';
import UsersConnectedList from './components/UsersConnectedList.vue';
import LoginComponent from './components/Login.vue';

const messageWrapper = ref(null);
const dialog = ref(null);
const chat = useChatStore();
const auth = useAuthStore();

function sendMessage() {
  if ( !chat.currentMessage?.text ) return;
  chat.currentMessage = chat.getEmptyMessage();
}

//chat.messageList.push(event);
//messageWrapper.value.scrollTo(0, messageWrapper.value.scrollHeight );

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