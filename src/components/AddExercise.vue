<template>
  <div class="flex flex-col w-full space-y-5">
    <div class="flex-auto w-full">
      <div class="flex justify-between items-center">
        <label for="exercive_name">
          Exercise name
        </label>
      </div>
      <input
        class="mt-2 px-4 py-2 w-full border-2 rounded-md"
        id="exercive_name"
        type="text"
        autocomplete="off"
        placeholder="Exercise Name"
        v-model="exerciseName"
      />
    </div>
    <div class="flex-auto w-full flex flex-col">
      <label for="Numbers_Sets">Numbers of sets: {{ numbersOfSets }}</label>
      <input
        class="mt-2"
        type="range"
        min="1"
        max="10"
        v-model.number="numbersOfSets"
      />
    </div>
    <div class="flex-auto flex flex-col space-y-3">
      <SetConfiguration
        @confirm-set="updateSets"
        :itemId="idx"
        v-for="(set, idx) of numbersOfSets"
        :key="idx"
        :oldSet="sets[idx]"
      />
    </div>
    <button
      @click="saveExercise"
      :disabled="disabledButton"
      class="w-full flex items-center justify-center p-2 text-white bg-indigo-600 rounded hover:bg-indigo-500 disabled:bg-indigo-400"
    >
      <p>Save Exersice</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 ml-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import SetConfiguration from '@/components/SetConfiguration.vue';
export default {
  components: {
    SetConfiguration,
  },
  data() {
    return {
      exerciseName: '',
      numbersOfSets: 3,
      sets: [],
    };
  },
  props: {
    itemId: {
      type: Number,
    },
    exercise: {
      type: Object,
    },
  },
  created() {
    if (this.exercise.name) this.exerciseName = this.exercise.name;
    if (this.exercise.sets) {
      this.numbersOfSets = this.exercise.sets.length;
      this.sets.splice(0, 0, ...this.exercise.sets);
    }
  },
  computed: {
    disabledButton() {
      return this.exerciseName === null || this.exerciseName === '';
    },
  },

  watch: {
    exercise() {
      if (this.exercise.name) this.exerciseName = this.exercise.name;
      if (this.exercise.sets) {
        this.numbersOfSets = this.exercise.sets.length;
        this.sets.splice(0, 0, ...this.exercise.sets);
      }
    },
  },

  // из-за изнчального пуша создается empty в массиве, если сначала добавить новое упражнение, а затем попытаться поменять уже добавленное

  methods: {
    updateSets(payload) {
      this.sets[payload.idx] = { unit: payload.unit, numbers: payload.numbers };
    },
    saveExercise() {
      const exerciseItem = {
        id: this.itemId,
        exercise: { name: this.exerciseName, sets: this.sets },
      };
      this.$emit('save-exercise', exerciseItem);
    },
  },
};
</script>

<style></style>
