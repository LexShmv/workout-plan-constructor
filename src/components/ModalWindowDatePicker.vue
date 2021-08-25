<template>
  <ModalWindow @close-modal="$emit('close-modal')">
    <template #title>
      <p>{{ training.name }}</p>
    </template>
    <template #main
      ><v-calendar
        :attributes="attributes"
        @dayclick="onDayClick"
        :min-date="new Date()"
    /></template>
    <template #button>
      <button
        @click="saveDates"
        class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Agree
      </button>
    </template>
  </ModalWindow>
</template>

<script>
import ModalWindow from '@/components/ModalWindow';

export default {
  components: {
    ModalWindow,
  },
  data() {
    return {
      days: [],
    };
  },
  props: {
    training: Object,
  },
  computed: {
    dates() {
      return this.days.map((day) => day.date);
    },
    attributes() {
      return this.dates.map((date) => ({
        highlight: true,
        dates: date,
      }));
    },
  },
  mounted() {
    const alreadyCreatedDates = this.$store.state.calendarDates.find(
      (el) => el.trainingName === this.training.name
    );
    if (alreadyCreatedDates) {
      this.days = alreadyCreatedDates.dates;
    }
  },
  methods: {
    saveDates() {
      const newTrainingDates = {
        trainingName: this.training.name,
        dates: this.days.map((el) => {
          return {
            id: el.id,
            date: el.date.toLocaleString('en-US'),
          };
        }),
      };

      this.$emit('save-dates', newTrainingDates);
    },
    onDayClick(day) {
      const dayDateString = new Date(day.date).toDateString();
      const currentDateString = new Date().toDateString();

      const formatedDayDateString = dayDateString.slice(
        4,
        dayDateString.length
      );
      const formatedCurrentDateString = currentDateString.slice(
        4,
        currentDateString.length
      );

      if (formatedDayDateString < formatedCurrentDateString) {
        return;
      }
      const idx = this.days.findIndex((d) => d.id === day.id);
      if (idx >= 0) {
        this.days.splice(idx, 1);
      } else {
        this.days.push({
          id: day.id,
          date: day.date,
        });
      }
    },
  },
};
</script>

<style></style>
