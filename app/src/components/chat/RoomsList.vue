<template>
  <div class="rooms-container" >
    <div
      class="room"
      v-for="room,index in chat.rooms"
      :key="index"
    >
      {{  room.title  }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useChatStore } from "../../stores/chat";

const props = defineProps({});
const emit = defineEmits([]);

const chat = useChatStore();

onMounted(() => {
  chat.getAllRooms();
});

</script>

<style lang="scss" scoped>

</style>