<template>
  <div id="app">
    <h2>Vue.js WebSocket Tutorial</h2>
    <button @click="sendMessage('hello')">Send Message</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useWsStore } from "./stores/ws"
import { io } from "socket.io-client";

const ws = useWsStore();

function sendMessage(message) {
  ws.conn.send(message);
}

ws.conn = new io("http://localhost:8000")

ws.conn.onmessage = function (event) {
  console.log(event.data);
}

ws.conn.onopen = function (event) {
  console.log("connected ws server on ", event.target.url)
}

</script>

