<template>
  <div>
    <Dialog ref="dialog" id="userForm" :show-secondary-btn="false" :show-primary-btn="false">
      <form @submit.prevent="" id="userForm" style="display: flex;flex-direction: column;">
        <input v-model="unAuthUser.email" placeholder="email" name="email" type="email">
        <input v-model="unAuthUser.password" placeholder="password" name="password" type="password">

        <div class="actions">
          <button type="button" @click="handleSignUp" > Cadastrar </button>
          <button type="button" @click="handleLogin" > Entrar </button>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import Dialog from './Dialog.vue';
import { useAuthStore } from "../stores/auth";

const dialog = ref(null);
const loading = ref(false);

const auth = useAuthStore();
const unAuthUser = ref({
  email: "fredmessias43@gmail.com",
  password: "password",
});

async function handleSignUp() {
  try {
    loading.value = true;
    await auth.signUp(unAuthUser.value);
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false;
  }
}

async function handleLogin() {
  try {
    loading.value = true;
    await auth.signIn(unAuthUser.value);
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false;
  }
}

async function getUser(session) {
  loading.value = true;
  try {
    await auth.getUser(session);
  }
  catch (error) 
  {
    alert(error.message)
  }
  finally 
  {
    loading.value = false;
  }
}

onMounted(async () => {
  const session = await auth.getSession();
  if ( !session )
  {
    dialog.value.open();
  }
  else
  {
    getUser(session);
  }

});

</script>
