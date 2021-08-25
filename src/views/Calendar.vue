<template>
  <div class="relative">
    <CalendarTable @training-info="openModalTraining" />
    <ModalWindow v-if="modal" @close-modal="modal = !modal">
      <template #title>
        <h3>{{ currentTraining.name }}</h3>
      </template>
      <template #main>
        <TrainingCard :training="currentTraining" />
      </template>
    </ModalWindow>
  </div>
</template>

<script>
import CalendarTable from '@/components/CalendarTable';
import ModalWindow from '@/components/ModalWindow';
import TrainingCard from '@/components/TrainingCard';
export default {
  name: 'Calendar',
  components: {
    CalendarTable,
    ModalWindow,
    TrainingCard,
  },
  data() {
    return {
      modal: false,
      currentTraining: null,
    };
  },
  methods: {
    openModalTraining(payload) {
      this.currentTraining = this.$store.state.myTrainings.find(
        (el) => el.name === payload
      );
      this.modal = true;
    },
  },
};
</script>

<style></style>
