<template>
  <div>
    <h2 class="font-md text-md text-gray-400 pt-2 mb-2 border-b-2">
      {{ nextTrainingInfo.date }} -
      <span class="font-semibold">
        {{
          new Date(nextTrainingInfo.date)
            .toUTCString()
            .split('')
            .splice(0, 3)
            .join('')
        }}
      </span>
    </h2>
    <TrainingInlineCard :training="training" />
  </div>
</template>

<script>
import TrainingInlineCard from '@/components/TrainingInlineCard';
export default {
  components: {
    TrainingInlineCard,
  },
  props: {
    nextTrainingInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    training() {
      return this.$store.state.myTrainings.find(
        (el) => el.name === this.nextTrainingInfo.name
      );
    },
  },
};
</script>

<style></style>
