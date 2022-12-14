<template>
  <div 
    :class="[
      'message',
      resolveMessageClass()
    ]"
  >
    <div class="header">
      <span class="username">
        {{ message.user_id }}
      </span>
    </div>
    <div class="body">
      <span class="text">
        {{ message.text }}
      </span>

      <span class="date">
        {{ lightFormat( new Date(message.created_at), 'HH:mm' ) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth';
import { lightFormat } from "date-fns"

const props = defineProps({
  message: Object
});
const auth = useAuthStore();

function resolveMessageClass() {
  if ( props.message.user_id === auth.authUser.id ) {
    return "own-message";
  }
  else {
    return "other-message";
  }
}
</script>

<style lang="scss" scoped>
.message {
  max-width: 60%;
  width: fit-content;
  display: flex;
  flex-direction: column;
  padding: 0.375rem 1rem;
  background-color: #e1e1e1;
  border-radius: 8px;
  position: relative;
  margin-bottom: 1rem;
  word-break: break-word;
}
.message::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: #e1e1e1;
  top: 0;
}
.own-message {
  margin-right: 1rem; 
  margin-left: auto;
  &::after {
    right: 0;
    transform: translateX(50%);
  }
}
.other-message {
  margin-right: auto; 
  margin-left: 1rem ;
  &::after {
    left: 0;
    transform: translateX(-50%);
  }
}
</style>

<style lang="scss" scoped>
.message {
  .username {
    font-weight: bold;
    font-size: 0.9rem;
  }
}
</style>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .5rem;
}
.body {
  display: flex;
  justify-content: space-between;
  align-items: center;


  .date {
    font-size: 0.8rem;
  }
}
</style>