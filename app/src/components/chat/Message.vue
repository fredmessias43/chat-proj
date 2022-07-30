<template>
  <div 
    :class="[
      'message',
      resolveMessageClass()
    ]"
  >
    <span class="username">
      {{ message.owner.username }}
    </span>
    <span class="text">
      {{ message.text }}
    </span>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth';

const props = defineProps({
  message: Object
});
const auth = useAuthStore();

function resolveMessageClass() {
  if ( props.message.owner.username === auth.authUser.username ) {
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
    margin-bottom: .5rem;
    font-weight: bold;
  }


}
</style>