<template>
  <div
    class="flex flex-col items-center text-base font-medium text-gray-500 space-y-2 md:w-1/2"
  >
    <h3 class="text-lg font-bold">Create training</h3>
    <div class="w-full">
      <label for="nameExercise">Name:</label>
      <input
        type="text"
        id="nameExercise"
        autocomplete="off"
        class="mt-2 px-4 py-2 w-full border-2 rounded-md"
        v-model="nameTraining"
        placeholder="Enter The Name For New Training"
        @keydown.enter="addExercise"
      />
    </div>

    <draggable
      class="w-full flex flex-col space-y-2"
      v-model="exercises"
      @start="drag = true"
      @end="drag = false"
    >
      <CompleteExercise
        v-for="(exercise, id) of exercises"
        :key="id"
        :exercise="exercise"
        @delete-exercise="deleteExercise(id)"
        @change-exercise="changeExercise(id)"
      />
    </draggable>

    <AddExercise
      v-if="currentExercise"
      :exercise="currentExercise"
      :itemId="currentExerciseId"
      @save-exercise="saveExercise"
    />
    <button
      :disabled="disabledButton"
      @click="addExercise"
      class="w-full flex items-center justify-center p-2 text-white bg-indigo-600 rounded hover:bg-indigo-500 disabled:opacity-50 disabled:bg-indigo-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <p>Add exersice</p>
    </button>
    <div class="w-full flex space-x-3">
      <button
        :disabled="disabledButton"
        @click="resetInputs"
        class="w-full p-2 flex items-center justify-center text-white bg-red-600 rounded hover:bg-red-500 disabled:opacity-50 disabled:bg-red-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <p>Reset all</p>
      </button>
      <button
        :disabled="disabledButton"
        @click="saveTraining"
        class="w-full flex items-center justify-center p-2 text-white bg-green-600 rounded hover:bg-green-500 disabled:opacity-50 disabled:bg-green-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <p>Save</p>
      </button>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import AddExercise from '@/components/AddExercise';
import CompleteExercise from '@/components/CompleteExercise';
export default {
  name: 'CreateNewPlan',
  components: { AddExercise, CompleteExercise, draggable },
  data() {
    return {
      nameTraining: null,
      exercises: [],
      currentExercise: null,
      currentExerciseId: null,
    };
  },
  props: {
    trainingName: String,
  },
  mounted() {
    if (this.trainingName) {
      console.log(this.trainingName);
      const currentTraining = this.$store.state.myTrainings.find(
        (el) => el.name === this.trainingName
      );
      this.nameTraining = currentTraining.name;
      this.exercises = currentTraining.exercises;
    }
  },
  methods: {
    addExercise() {
      this.currentExerciseId = this.exercises.length;
      this.currentExercise = {};
    },
    resetInputs() {
      this.nameTraining = null;
      this.exercises = [];
      this.currentExercise = null;
      this.currentExerciseId = null;
    },
    saveTraining() {
      const newTraining = {
        name: this.nameTraining.toUpperCase(),
        exercises: this.exercises,
        dateOfCreation: new Date().toLocaleString('en-US').slice(0, 9),
      };
      this.$store.dispatch('addTraining', newTraining);
      this.resetInputs();
      this.$router.push({ name: 'AllPlans' });
    },
    deleteExercise(id) {
      this.exercises.splice(id, 1);
    },
    saveExercise(payload) {
      this.exercises.splice(payload.id, 1, payload.exercise);
      this.currentExerciseId = null;
      this.currentExercise = null;
    },
    changeExercise(id) {
      this.currentExerciseId = id;
      this.currentExercise = this.exercises[this.currentExerciseId];
    },
  },
  computed: {
    disabledButton() {
      return this.nameTraining === null || this.nameTraining === '';
    },
  },
};
</script>

<style></style>
