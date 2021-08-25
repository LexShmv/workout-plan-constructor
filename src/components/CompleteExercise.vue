<template>
  <div
    v-if="completeExercise"
    class="w-full p-2 flex justify-between items-center bg-green-400 rounded-md"
  >
    <div class="flex flex-auto justify-between items-center pr-2 ">
      <h5 class="text-white">{{ exercise.name + ':' }}</h5>
      <div class="flex flex-col items-end">
        <p class="text-white" v-for="(set, id) of exercise.sets" :key="id">
          {{ set.unit + ': ' + set.numbers }}
        </p>
      </div>
    </div>
    <div class="flex flex-col space-y-2">
      <button @click="$emit('delete-exercise')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <button @click="$emit('change-exercise')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    exercise: {
      type: Object,
      required: true,
    },
  },
  computed: {
    completeExercise() {
      return Object.keys(this.exercise).length !== 0;
    },
  },
};
</script>

<style></style>
