<template>
  <div class="users-wrapper">
    <div v-for="user,i in users" class="user" :key="i" :title="user.username">
      <img :src="'https://via.placeholder.com/100?text=' + user.username" :alt="user.username" />
      <div class="online"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const users = ref([]);

//   users.value.push(value);

</script>

<style lang="scss" scoped>
.users-wrapper {
  display: flex;
  justify-content: baseline;
  align-items: center;
  margin-bottom: 1rem;
}
.user {
  position: relative;
  width: fit-content;
  margin-left: -10px;

  &:first-child {
    margin: 0;
  }

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  .online {
    background-color: green;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    position: absolute;
    bottom: 5px;
    right: 5px;
    border: 2px solid white;
  }
}
</style>