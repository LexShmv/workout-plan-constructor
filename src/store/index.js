import Vue from 'vue';
import Vuex from 'vuex';
import {
  signUpUser,
  signInUser,
  signOutUser,
  getCurrentUser,
  saveTraining,
  getTrainings,
  deleteTrainings,
  saveDates,
  getDates,
  deleteDate,
  updateUserInfo,
} from '../ApiFirebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: false,
    myTrainings: [],
    calendarDates: [],
  },
  mutations: {
    pushNewTraining(state, payload) {
      state.myTrainings.push(payload);
    },
    initializeTrainings(state, payload) {
      state.myTrainings = payload;
    },
    initializeDates(state, payload) {
      state.calendarDates = payload;
    },
    replaceTraining(state, payload) {
      state.myTrainings.splice(
        payload.trainingIndex,
        1,
        payload.updatedTraining
      );
    },
    deleteTrainingMut(state, payload) {
      state.myTrainings.splice(payload, 1);
    },
    deleteCalendarDates(state, payload) {
      state.calendarDates.splice(payload, 1);
    },
    pushNewCalendarDate(state, payload) {
      state.calendarDates.push(payload);
    },
    resetTrainings(state) {
      state.myTrainings = [];
    },
    resetDates(state) {
      state.calendarDates = [];
    },

    changeCalendarDate(state, payload) {
      state.calendarDates.splice(payload.dateIndex, 1, payload.payload);
    },
    updateUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    //user
    async signUp({ dispatch }, { email, password, firstName, lastName }) {
      dispatch;
      return await signUpUser(email, password, firstName, lastName);
    },

    async signIn({ dispatch }, { email, password }) {
      dispatch;
      return await signInUser(email, password);
    },

    async currentUser({ commit }, payload) {
      const res = await getCurrentUser(payload);
      commit('updateUser', res);
    },

    updateUser({ state, dispatch }, payload) {
      updateUserInfo(state.user.userID, payload).then(() =>
        dispatch('currentUser', state.user.userID)
      );
    },

    signOut() {
      signOutUser();
    },

    // trainings

    addTraining({ commit, state }, payload) {
      const trainingIndex = state.myTrainings.findIndex(
        (el) => el.name === payload.name
      );
      if (trainingIndex !== -1) {
        commit('replaceTraining', { trainingIndex, updatedTraining: payload });
        state.user
          ? saveTraining(state.user.userID, payload)
          : localStorage.setItem(
              'myTrainings',
              JSON.stringify(state.myTrainings)
            );
        return;
      }
      commit('pushNewTraining', payload);
      state.user
        ? saveTraining(state.user.userID, payload)
        : localStorage.setItem(
            'myTrainings',
            JSON.stringify(state.myTrainings)
          );
      return;
    },

    deleteTraining({ commit, state }, payload) {
      const trainingIndex = state.myTrainings.findIndex(
        (el) => el.name === payload
      );
      const calendarIndex = state.calendarDates.findIndex(
        (el) => el.name === payload
      );

      commit('deleteTrainingMut', trainingIndex);
      commit('deleteCalendarDates', calendarIndex);
      if (state.user) {
        deleteTrainings(state.user.userID, payload);
        deleteDate(state.user.userID, payload);
      } else {
        localStorage.setItem(
          'calendarDates',
          JSON.stringify(state.calendarDates)
        );
        localStorage.setItem('myTrainings', JSON.stringify(state.myTrainings));
      }
    },

    async loadTrainings({ commit }, payload) {
      let loadedTrainings = await getTrainings(payload);

      commit('initializeTrainings', loadedTrainings);
    },

    //dates

    saveNewTrainingsDate({ commit, state }, payload) {
      const dateIndex = state.calendarDates.findIndex(
        (el) => el.trainingName === payload.trainingName
      );
      if (dateIndex !== -1) {
        commit('changeCalendarDate', { dateIndex, payload });
        state.user
          ? saveDates(state.user.userID, payload)
          : localStorage.setItem(
              'calendarDates',
              JSON.stringify(state.calendarDates)
            );
        return;
      }
      commit('pushNewCalendarDate', payload);
      state.user
        ? saveDates(state.user.userID, payload)
        : localStorage.setItem(
            'calendarDates',
            JSON.stringify(state.calendarDates)
          );
    },
    async loadDates({ commit }, payload) {
      const loadedDates = await getDates(payload);
      const actualDates = loadedDates.map((el) => {
        return {
          trainingName: el.trainingName,
          dates: el.dates.filter(
            (el) =>
              el.date.slice(0, 9) >=
              new Date().toLocaleString('en-US').slice(0, 9)
          ),
        };
      });

      commit('initializeDates', actualDates);
    },
  },
});
