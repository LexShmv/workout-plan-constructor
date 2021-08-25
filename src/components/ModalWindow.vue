<template>
  <transition
    enter-active-class="transition easy-in duration-200"
    enter-class="opacity-0"
    enter-to-class="opacity-1"
    leave-active-class="transition easy-out duration-200"
    leave-class="opacity-1"
    leave-to-class="transform scale-110 opacity-0"
  >
    <div
      ref="modalWindow"
      class="flex items-center justify-center fixed z-20 left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-60"
    >
      <div class="bg-white rounded-lg mx-2">
        <div class="flex flex-col items-start p-4">
          <div class="flex items-center w-full">
            <div class="text-gray-900 font-medium text-lg">
              <slot name="title"></slot>
            </div>
          </div>
          <hr />
          <div class="my-2">
            <slot name="main"></slot>
          </div>
          <hr />
          <div class="ml-auto">
            <slot name="button"></slot>
            <button
              ref="closeButton"
              @click="closeModal"
              class="bg-transparent hover:bg-gray-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded"
            >
              <slot name="closeButtonName">Close</slot>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',

  mounted() {
    this.$refs.closeButton.focus();
  },

  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
};
</script>

<style></style>
