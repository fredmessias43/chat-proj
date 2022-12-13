<template>
  <div>
    <Dialog ref="dialog" id="userForm" :show-secondary-btn="false">
      <form @submit.prevent="handleSubmit" id="userForm" style="display: flex;flex-direction: column;">
        <input v-model="user.email" placeholder="email" name="email" type="email">
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import Dialog from './Dialog.vue';
import { useSupabaseStore } from "../stores/supabase";
import { useAuthStore } from "../stores/auth";

const dialog = ref(null);

const { supabase } = useSupabaseStore();
const auth = useAuthStore();
const session = ref({});
const user = ref({
  email: "fredmessias43@gmail.com"
});

async function handleSubmit() {
  try {
    // loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: user.value.email,
    })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    // dialog.value.close();
    // loading.value = false
  }
}

async function getProfile(session) {
  try {
    const { user } = session

    let { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()

    if (error && status !== 406) throw error

    if (data) 
    {
      console.log(data)
    }
  }
  catch (error) 
  {
    alert(error.message)
  }
  finally 
  {
    // loading.value = false
  }
}

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
    if ( !session.value )
    {
      dialog.value.open();
    }
    else
    {
      getProfile(session.value);
    }
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
});

</script>
