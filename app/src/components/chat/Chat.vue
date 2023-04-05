<template>
  <div class="chat-container">
  
    <div class="message-wrapper" ref="messageWrapperRef">
      <Message v-for="m, i in messages" :key="i" :message="m" />
    </div>
  
    <div class="message-input">
      <form @submit.prevent="chat.sendMessage">
        <input v-model="currentMessage.text" />
        <button type="submit">Send Message</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, watch, onMounted, computed, nextTick } from "vue";
import { useChatStore } from "../../stores/chat"
import Message from './Message.vue';

const props = defineProps({});
const emit = defineEmits([]);

const messageWrapperRef = ref(null);
const chat = useChatStore();
const { messages, currentMessage } = storeToRefs(chat);

watch(
  () => messages.value,
  async () => {
    await nextTick();
    messageWrapperRef.value.scrollTo(0, messageWrapperRef.value.scrollHeight );
  },
  { deep: true }
);

</script>

<style lang="scss" scoped>
.chat-container {
  margin: 0 auto;
  padding: 1rem;
  width: 80vw;
  height: 80vh;
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