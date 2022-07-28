<template>
  <dialog ref="dialog">
    <slot name="header" >
      <header >
        <h1>{{title}}</h1>
      </header>
    </slot>
    <slot ></slot>

    <slot name="footer">
      <div>
        <button @click="handleCancel" v-if="showSecondaryBtn" >
          {{secondaryButtonText}}
        </button>
        <button ref="confirmBtn" @click="handleConfirm" v-if="showPrimaryBtn" :form="id" >
          {{primaryButtonText}}
        </button>
      </div>
    </slot>

  </dialog>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

const props = defineProps({
  id: String,
  secondaryButtonText: {
    type: String,
    default: "Fechar",
  },
  showSecondaryBtn: {
    type: Boolean,
    default: true,
  },
  primaryButtonText: {
    type: String,
    default: "Salvar",
  },
  showPrimaryBtn: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "Título",
  },
  showCloseBtn: {
    type: Boolean,
    default: true,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  showFooter: {
    type: Boolean,
    default: true,
  }
});
defineExpose({open, close});

const dialog = ref(null);
const isOpen = computed(() => Boolean(dialog.value?.open));

function open() {
  dialog.value.show();
}
function close() {
  dialog.value.close();
}

function handleCancel() {
  close();
}
function handleConfirm() {
  // close();
}
</script>

<style lang="scss" scoped>
</style>