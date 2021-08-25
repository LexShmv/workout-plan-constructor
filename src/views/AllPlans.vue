<template>
  <div
    class="min-h-screen bg-cover bg-no-repeat bg-center"
    :style="{
      'background-image': filteredTrainings.length
        ? ''
        : `url(${require('../assets/AllTrainingsBackground.webp')})`,
    }"
  >
    <div
      v-if="!filteredTrainings.length"
      class="flex flex-col justify-center items-center bg-white bg-opacity-70 px-4 py-2 rounded-lg"
    >
      <h2
        v-if="!filteredTrainings.length"
        class="text-center text-lg font-semibold uppercase text-gray-500"
      >
        You don't have a plan yet.
      </h2>
      <router-link
        class="text-indigo-400 font-bold"
        :to="{ name: 'CreateNewPlan' }"
        >Create Now!</router-link
      >
    </div>
    <div v-else class="flex justify-between space-x-10">
      <div class="flex space-x-2 items-center">
        <label class="text-gray-600 font-medium" for="filterExercise"
          >Filter:</label
        >
        <input
          type="text"
          id="filterExercise"
          class="mt-2 px-4 py-1 w-full border-2 rounded-md"
          placeholder="Filter Your Trainings"
          v-model="filterSymbols"
        />
      </div>
      <div class="hidden md:flex md:space-x-2 md:items-center">
        <label for="grid">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 cursor-pointer text-gray-400"
              :class="{ 'text-gray-800': layoutCards === 'grid' }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </div>
        </label>
        <input
          class="hidden"
          type="radio"
          name="layout"
          id="grid"
          value="grid"
          v-model="layoutCards"
        />
        <label for="inline"
          ><div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 cursor-pointer text-gray-400"
              :class="{ 'text-gray-800': layoutCards === 'inline' }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg></div
        ></label>
        <input
          class="hidden"
          type="radio"
          name="layout"
          id="inline"
          value="inline"
          v-model="layoutCards"
        />
      </div>
    </div>
    <div :class="computedLayout" class="mt-4">
      <TrainingCard
        v-for="(training, idx) of filteredTrainings"
        :key="idx"
        :training="training"
        :is="computedCardComponent"
        @set-date="setDate(training)"
      >
        <template #title>
          {{ training.name }}
        </template>

        <template #trainingSettings="{changeExercise, deleteExercise}">
          <div class="text-gray-400 flex space-x-2">
            <TrainingCardSettings
              @change-exercise="changeExercise"
              @delete-exercise="deleteExercise"
            />
          </div>
        </template>
        <template #buttons>
          <button
            @click.stop="setDate(training)"
            class="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-500 hover:bg-indigo-600"
          >
            Set Date
          </button>
        </template>
      </TrainingCard>
    </div>
    <ModalWindowDatePicker
      @save-dates="saveDates"
      @close-modal="closeModal"
      :training="modalDateTraining"
      v-if="modal"
    />
  </div>
</template>

<script>
import ModalWindowDatePicker from '@/components/ModalWindowDatePicker.vue';
import TrainingCard from '@/components/TrainingCard.vue';
import TrainingCardSettings from '@/components/TrainingCardSettings.vue';
import TrainingInlineCard from '@/components/TrainingInlineCard.vue';
export default {
  name: 'AllPlans',
  components: {
    TrainingCard,
    TrainingInlineCard,
    ModalWindowDatePicker,
    TrainingCardSettings,
  },
  data() {
    return {
      filterSymbols: '',
      layoutCards: 'grid',
      modal: false,
      modalDateTraining: null,
      layouts: {
        grid: ['grid', 'grid-cols-1', 'gap-4', 'md:grid-cols-3'],
        inline: ['flex', 'flex-col', 'space-y-4'],
      },
    };
  },

  computed: {
    filteredTrainings() {
      return this.$store.state.myTrainings.filter((el) =>
        el.name.includes(this.filterSymbols.toUpperCase())
      );
    },
    computedLayout() {
      return this.layoutCards === 'grid'
        ? this.layouts.grid
        : this.layouts.inline;
    },
    computedCardComponent() {
      return this.layoutCards === 'grid' ? TrainingCard : TrainingInlineCard;
    },
  },
  methods: {
    setDate(training) {
      this.modalDateTraining = training;
      this.modal = !this.modal;
    },
    closeModal() {
      this.modal = !this.modal;
      this.modalDateTraining = null;
    },
    saveDates(payload) {
      this.$store.dispatch('saveNewTrainingsDate', payload);
      this.closeModal();
    },
  },
};
</script>

<style></style>
