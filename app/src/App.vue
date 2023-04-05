<template>
  <div class="app">

    <Auth 
      v-if="!auth.isAuthenticated"
    />
    
    <div
      class=""
      v-if="auth.isAuthenticated"
    >
      <RoomsList />
  
      <Chat />
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Chat from './components/chat/Chat.vue';
import Auth from './components/Auth.vue';
import RoomsList from './components/chat/RoomsList.vue';
import { useAuthStore } from './stores/auth';

const auth = useAuthStore();

</script>

<style scoped lang="scss" >
.app {
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
}
</style>