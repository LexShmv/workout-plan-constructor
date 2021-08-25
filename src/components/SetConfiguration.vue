<template>
  <div class="w-full flex justify-start space-x-3">
    <div class="flex flex-col flex-auto w-1/2">
      <label for="reps">Unit</label>
      <select
        id="reps"
        v-model="unitOfExercise"
        class="mt-2 px-4 py-2 w-full border-2 rounded-md"
      >
        <option v-for="(unit, idx) of units" :key="idx" :value="unit">{{
          unit
        }}</option>
      </select>
    </div>
    <div v-if="unitOfExercise" class="flex flex-col flex-auto w-1/2">
      <label>{{ unitOfExercise }}</label>
      <input
        class="mt-2 px-4 py-2 w-full border-2 rounded-md"
        type="text"
        v-model="numbersOfUnit"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      units: ['Reps', 'Seconds', 'Minutes', 'Meters', 'Kilometers'],
      unitOfExercise: 'Reps',
      numbersOfUnit: null,
    };
  },
  props: {
    itemId: {
      type: Number,
    },
    oldSet: {
      type: Object,
      required: false,
    },
  },
  mounted() {
    if (this.oldSet && Object.keys(this.oldSet)) {
      if (this.oldSet.unit) this.unitOfExercise = this.oldSet.unit;
      if (this.oldSet.numbers) this.numbersOfUnit = this.oldSet.numbers;
    }
  },
  computed: {
    set() {
      return {
        unit: this.unitOfExercise,
        numbers: this.numbersOfUnit,
        idx: this.itemId,
      };
    },
  },
  watch: {
    numbersOfUnit() {
      this.$emit('confirm-set', this.set);
    },
    oldSet() {
      if (this.oldSet && Object.keys(this.oldSet)) {
        if (this.oldSet.unit) this.unitOfExercise = this.oldSet.unit;
        if (this.oldSet.numbers) this.numbersOfUnit = this.oldSet.numbers;
      }
    },
  },
};
</script>

<style></style>
