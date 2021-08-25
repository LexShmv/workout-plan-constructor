<template>
  <div
    class="p-4 rounded-md bg-white text-gray-400 border border-gray-200 flex flex-col"
  >
    <div class="flex justify-between items-center mb-2">
      <h3
        class="uppercase text-lg text-gray-500 font-semibold border-gray-200 border-b-2"
      >
        <slot name="title"></slot>
      </h3>
      <slot
        name="trainingSettings"
        :changeExercise="changeExercise"
        :deleteExercise="deleteExercise"
      ></slot>
    </div>
    <div
      v-for="(exercise, idx) of training.exercises"
      :key="idx"
      class="flex justify-between items-center py-2 space-x-2 border-gray-200 border-b-2"
    >
      <p class="uppercase text-sm font-medium">{{ exercise.name }}</p>
      <div>
        <p v-for="(set, id) of exercise.sets" :key="id">
          {{ set.unit }}: {{ set.numbers }}
        </p>
      </div>
    </div>
    <div class="flex justify-between items-center space-x-10 pt-2 mt-auto">
      <p class="text-sm text-gray-400 ">
        Created at: {{ training.dateOfCreation }}
      </p>
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script>
export default {
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
