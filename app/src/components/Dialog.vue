<template>
  <dialog ref="dialog">
    <div class="dialog-container">
      <div class="dialog-content">
        <div class="header">
          <slot name="header">
            <h1>{{ title }}</h1>
          </slot>
        </div>
        <div class="body">
          <slot></slot>
        </div>

        <div class="footer">
          <slot name="footer">
            <button @click="handleCancel" v-if="showSecondaryBtn">
              {{ secondaryButtonText }}
            </button>
            <button ref="confirmBtn" @click="handleConfirm" v-if="showPrimaryBtn" :form="id">
              {{ primaryButtonText }}
            </button>
          </slot>
        </div>

      </div>

    </div>
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
defineExpose({ open, close });

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
dialog {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  padding: 0;
  left: 0;
  margin: 0;
  border: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog-container {
  margin: 2rem auto;
  max-width: 500px;
}

.dialog-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 8px;
  outline: 0;

  .header,
  .body,
  .footer {
    padding: 1rem;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>