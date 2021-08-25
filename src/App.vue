<template>
  <div id="app" class="relative">
    <TheHeader />
    <transition
      enter-active-class="transition easy-in duration-1000"
      enter-class="opacity-0"
      enter-to-class="opacity-1"
      leave-active-class="transition easy-out duration-300"
      leave-class="opacity-1"
      leave-to-class="transform scale-110 opacity-0"
    >
      <Banner
        v-show="bannerIsActive"
        @close-banner="closeBanner"
        class="fixed bottom-0 left-0 right-0 z-50"
      >
        <template #title>{{ bannerText }}</template>
        <template #activeButton>
          <component :is="button"></component>
        </template>
      </Banner>
    </transition>
    <transition
      enter-active-class="transition in-custom duration-1000"
      enter-class="transform -translate-x-full opacity-0"
      enter-to-class="transform translate-x-0 opacity-1"
      leave-active-class="transition in-custom duration-500"
      leave-class="opacity-100 transform translate-x-0 opacity-1"
      leave-to-class="opacity-0 transform -translate-x-full opacity-0"
    >
      <router-view class="max-w-full mx-auto p-4 sm:px-6 pt-20 md:pt-24" />
    </transition>
  </div>
</template>

<script>
import Banner from '@/components/Banner';
import TheHeader from '@/components/TheHeader';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  components: {
    TheHeader,
    Banner,
  },

  data() {
    return {
      bannerIsActive: false,
      bannerText: '',
      button: null,
    };
  },

  created() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await this.$store.dispatch('currentUser', user.uid);
        this.$store.dispatch('loadTrainings', user.uid);
        this.$store.dispatch('loadDates', user.uid);
      } else {
        const trainings = JSON.parse(localStorage.getItem('myTrainings'));
        const dates = JSON.parse(localStorage.getItem('calendarDates'));
        if (trainings) this.$store.commit('initializeTrainings', trainings);
        if (dates) {
          const actualDates = dates.map((el) => {
            return {
              trainingName: el.trainingName,
              dates: el.dates.filter(
                (el) =>
                  el.date.slice(0, 9) >=
                  new Date().toLocaleString('en-US').slice(0, 9)
              ),
            };
          });

          this.$store.commit('initializeDates', actualDates);
        }
      }
    });
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  watch: {
    $route() {
      if (this.$route.name === 'CreateNewPlan' && !this.user) {
        this.bannerIsActive = true;
        this.bannerText =
          'Until you are logged in, all recordings will be saved to your device. The entries will be destroyed when the browser is cleared.';
        this.button = null;
      }
    },
    user(oldValue, newValue) {
      if (newValue !== false && oldValue !== newValue) {
        this.permissionToUploadLocalEntries();
      }
    },
  },

  methods: {
    closeBanner() {
      this.bannerIsActive = false;
    },
    permissionToUploadLocalEntries() {
      const trainings = JSON.parse(localStorage.getItem('myTrainings'));
      const dates = JSON.parse(localStorage.getItem('calendarDates'));
      console.log(dates);
      if (trainings.length || dates.length) {
        this.bannerText =
          'You already have recordings saved on this device. Want to add them to your account? If the names are the same as the entries already made, they will be overwritten.';
        this.bannerIsActive = true;
        const that = this;
        this.button = {
          template:
            '<button @click="uploadEntries" class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm w-full text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50">Upload now!</button>',
          methods: {
            async uploadEntries() {
              const loadedTrainings = await trainings.forEach((el) => {
                this.$store.dispatch('addTraining', el);
              });
              const loadedDates = await dates.forEach((el) => {
                this.$store.dispatch('saveNewTrainingsDate', el);
              });
              Promise.all([loadedTrainings, loadedDates]).then(() => {
                that.button = null;
                that.bannerText = 'Succsesfull loaded';
                setTimeout(() => {
                  that.bannerText = '';
                  that.bannerIsActive = false;
                }, 2000);
              });
            },
          },
        };
      }
    },
  },
};
</script>
