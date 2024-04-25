<template>
  <div id="headlessui-dialog-overlay-16" aria-hidden="true" data-headlessui-state="open"
    class="fixed inset-0 bg-gray-500 opacity-30"></div>
  <div class="confirm-modal relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md mt-40">
    <div class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
      <div class="flex justify-between items-center py-3 px-4 border-b">
        <h3 class="font-bold text-gray-800">
          {{ getTranslation.title }}
        </h3>
        <button @click="closeModal" type="button"
          class="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
          <span class="sr-only">{{ getTranslation.close }}</span>
          <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
      <div class="p-4 overflow-y-auto">
        <p class="mt-1 text-gray-800">
          {{ getTranslation.desc }}
        </p>
      </div>
      <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
        <button @click="closeModal" type="button" data-cy="close-confirm"
          class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none btn-negative">
          {{ getTranslation.close }}
        </button>
        <button v-if="type === 'confirm'" @click="finish" type="button" data-cy="confirm-save"
          class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ml-2 btn-positive">
          {{ getTranslation.saveChanges }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    translations: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: "warning"
    }
  },
  computed: {
    getTranslation() {
      if (this.type === 'warning') {
        return {
          title: this.translations.warningTitle,
          desc: this.translations.warningDesc,
          close: this.translations.warningClose,
        }
      } else {
        return {
          title: this.translations.confirmBoxTitle,
          desc: this.translations.confirmBoxDesc,
          close: this.translations.confirmBoxClose,
          saveChanges: this.translations.confirmBoxSaveChanges,
        }
      }
    }
  },
  emits: ["finish", "cancel"],
  setup(props: Readonly<{ [key: string]: any }>, { emit }: { emit: (event: string, ...args: any[]) => void }) {

    const closeModal = () => {
      emit('cancel');
    }
    const finish = () => {
      emit('finish');
    }
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        closeModal();
      }
    }

    return {
      finish,
      closeModal
    };
  },
};
</script>

<style scoped>
body.modal-active {
  overflow-x: hidden;
  overflow-y: visible !important;
}
</style>
