<template>
  <div
    class="min-h-screen bg-cover bg-no-repeat bg-bottom"
    :style="{
      'background-image':
        todaysTrainings.length || nearestTrainigs.length
          ? ''
          : `url(${require('../assets/HomeBackground.webp')})`,
    }"
  >
    <Loader v-if="loading" />
    <div class=" py-2 mt-2">
      <div
        v-if="!todaysTrainings.length"
        class="bg-white bg-opacity-70 px-4 py-2 rounded-lg text-center font-semibold"
      >
        <h2 class="text-lg uppercase">Welcome</h2>
        <router-link class="text-indigo-500" :to="{ name: 'AllPlans' }"
          >You didn't set training on today. Do it now!</router-link
        >
      </div>
      <div v-else class="flex flex-col space-y-4">
        <h2 class="text-center uppercase text-lg font-semibold">
          Today's training
        </h2>
        <TrainingInlineCard
          v-for="(training, idx) in todaysTrainings"
          :key="idx"
          :training="training"
        />
      </div>
    </div>
    <template v-if="nearestTrainigs.length">
      <h2 class="text-center uppercase text-lg font-semibold mt-4">
        Next trainings
      </h2>
      <div class=" py-2 mt-2">
        <HomeNextTrainingCard
          v-for="(nextTrainingInfo, idx) of nearestTrainigs"
          :key="idx"
          :nextTrainingInfo="nextTrainingInfo"
        />
      </div>
    </template>
  </div>
</template>

<script>
import Loader from '@/components/Loader';
import HomeNextTrainingCard from '@/components/HomeNextTrainingCard';
import TrainingInlineCard from '@/components/TrainingInlineCard';
export default {
  components: { TrainingInlineCard, HomeNextTrainingCard, Loader },
  name: 'Home',
  data() {
    return {
      todaysTrainings: [],
      nearestTrainigs: [],
      loading: false,
    };
  },

  mounted() {
    this.todaysTrainings = this.choosingTodaysTrainings(
      this.allDates,
      this.allTrainings
    );

    const sortedAllDates = this.sortingDates(this.allDates);

    this.nearestTrainigs = this.choosingNearestTrainings(sortedAllDates);
  },

  computed: {
    allTrainings() {
      return this.$store.state.myTrainings;
    },
    allDates() {
      return this.$store.state.calendarDates;
    },
    todaysDate() {
      return new Date()
        .toISOString()
        .split('')
        .splice(0, 10)
        .join('');
    },
  },

  watch: {
    allDates() {
      this.todaysTrainings = this.choosingTodaysTrainings(
        this.allDates,
        this.allTrainings
      );

      const sortedAllDates = this.sortingDates(this.allDates);

      this.nearestTrainigs = this.choosingNearestTrainings(sortedAllDates);
    },
  },

  methods: {
    choosingTodaysTrainings(allDates, trainings) {
      const structuredDates = allDates.map((el) => {
        return {
          name: el.trainingName,
          dates: el.dates.map((el) => el.id),
        };
      });

      const todaysTrainingNames = structuredDates.map((mainEl) => {
        const todayDateInDates = mainEl.dates.find((el) =>
          el.includes(this.todaysDate)
        );
        if (todayDateInDates !== undefined) {
          return mainEl.name;
        }
      });
      let todaysTrainings = [];
      for (let name of todaysTrainingNames) {
        trainings.forEach((el) => {
          if (el.name === name) {
            todaysTrainings.push(el);
          }
        });
      }
      return todaysTrainings;
    },
    sortingDates(arr) {
      const sortedDates = [];
      for (let item of arr) {
        for (let date of item.dates) {
          sortedDates.push({
            name: item.trainingName,
            date: Number(date.id.split('-').join('')),
          });
        }
      }
      return sortedDates
        .sort((a, b) => {
          return a.date - b.date;
        })
        .map((el) => {
          let dateArr = String(el.date).split('');
          dateArr.splice(4, 0, '-');
          dateArr.splice(-2, 0, '-');
          return {
            name: el.name,
            date: dateArr.join(''),
          };
        });
    },
    choosingNearestTrainings(sortedDates, quantity = 3) {
      return sortedDates
        .filter((el) => el.date !== this.todaysDate)
        .slice(0, quantity);
    },
  },
};
</script>
