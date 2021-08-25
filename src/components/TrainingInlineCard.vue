<template>
  <div
    class="cursor-pointer hover:shadow-md text-gray-400 border-2 rounded-md px-4 py-2"
    @click="isOpen = !isOpen"
  >
    <div class="flex justify-between items-center">
      <div>
        <h3 class="uppercase text-lg text-gray-500 font-semibold">
          {{ training.name }}
        </h3>
        <div class="text-sm mt-1 text-gray-300">
          <p>Created at:</p>
          <p>{{ training.dateOfCreation }}</p>
        </div>
      </div>
      <div
        class="flex flex-col items-end md:flex-row md:space-x-4 md:items-center"
      >
        <p class="text-md font-semibold text-gray-500 py-3">
          Exercises: {{ training.exercises.length }}
        </p>
        <slot name="buttons"></slot>
        <div class="order-first text-gray-400 flex space-x-2 md:order-1">
          <slot
            name="trainingSettings"
            :changeExercise="changeExercise"
            :deleteExercise="deleteExercise"
          ></slot>
        </div>
      </div>
    </div>
    <div class="overflow-hidden">
      <transition
        enter-active-class="transition in-custom duration-500"
        enter-class="transform -translate-y-full opacity-0"
        enter-to-class="transform translate-y-0 opacity-1"
        leave-active-class="transition in-custom duration-300"
        leave-class="opacity-100 transform translate-y-0 opacity-1"
        leave-to-class="opacity-0 transform -translate-y-full opacity-0"
        ><div v-show="isOpen">
          <div class="flex flex-col divide-y divide-gray-200">
            <div
              v-for="(exercise, idx) of training.exercises"
              :key="idx"
              class="flex justify-between items-center py-2 space-x-2"
            >
              <p class="uppercase text-sm font-medium">{{ exercise.name }}</p>
              <div>
                <p v-for="(set, id) of exercise.sets" :key="id">
                  {{ set.unit }}: {{ set.numbers }}
                </p>
              </div>
            </div>
          </div>
        </div></transition
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    training: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changeExercise() {
      this.$router.push({
        name: 'CreateNewPlan',
        params: { trainingName: this.training.name },
      });
    },
    deleteExercise() {
      this.$store.dispatch('deleteTraining', this.training.name);
    },
  },
};
</script>

<style></style>
