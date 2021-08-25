<template>
  <div
    class="min-h-screen bg-cover bg-no-repeat flex justify-center items-center bg-left md:bg-center"
    :style="{
      'background-image': `url(${require('../assets/RegAndAuthBackground.webp')})`,
    }"
  >
    <div class="w-full md:w-1/2 lg:w-2/5 bg-black bg-opacity-90 p-2 rounded-lg">
      <h3 class="pt-2 text-2xl text-gray-300 text-center">
        Login
      </h3>
      <p class="text-sm text-gray-300 text-center">
        Welcome Back.
      </p>
      <form @submit.prevent="auth" class="px-8 pt-3 pb-2">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-300" for="email">
            Email
          </label>
          <input
            v-model="$v.email.$model"
            :class="{
              'border-red-500': $v.email.$error,
            }"
            class="w-full px-3 py-2 mb-1 text-sm leading-tight bg-black bg-opacity-70 text-gray-300 border rounded appearance-none focus:outline-none focus:shadow-form"
            id="email"
            type="email"
            placeholder="Email"
            autocomplete="off"
          />
          <p
            v-if="$v.email.$error && !$v.email.required"
            class="text-xs italic text-red-500"
          >
            Email is required
          </p>
          <p
            v-if="$v.email.$error && !$v.email.email"
            class="text-xs italic text-red-500"
          >
            Please please enter correct Email
          </p>
        </div>
        <div class="mb-4 md:flex md:justify-between md:space-x-4">
          <div class="mb-4 md:flex-1 md:mb-0">
            <label
              class="block mb-2 text-sm font-bold text-gray-300"
              for="password"
            >
              Password
            </label>
            <input
              v-model.trim="$v.password.$model"
              :class="{
                'border-red-500': $v.password.$error,
              }"
              class="w-full px-3 py-2 mb-1 text-sm leading-tight bg-black bg-opacity-70 text-gray-300 border rounded shadow appearance-none focus:outline-none focus:shadow-form"
              id="password"
              type="password"
              placeholder="******************"
            />
            <p
              v-if="$v.password.$error && !$v.password.required"
              class="text-xs italic text-red-500"
            >
              Password is required
            </p>
          </div>
        </div>
        <div class="mb-4 pt-4 text-center">
          <button
            class="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:shadow-form"
            type="submit"
          >
            Sign In
          </button>
        </div>

        <div class="text-center">
          <router-link
            class="inline-block text-md font-semibold text-indigo-600 align-baseline hover:text-indigo-700 flex justify-center"
            :to="{ name: 'SignUp' }"
          >
            Don't have an account? Sign Up!
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </router-link>
        </div>
      </form>
    </div>
    <ModalWindow @close-modal="closeModal" v-if="error">
      <template #title>
        <h2 class="text-red-500 text-lg">Error</h2>
      </template>
      <template #main>
        <p>{{ errorMessage }}</p>
      </template>
    </ModalWindow>
    <Loader v-if="loading" />
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import ModalWindow from '@/components/ModalWindow';
import Loader from '@/components/Loader';

export default {
  name: 'SignIn',

  components: {
    Loader,
    ModalWindow,
  },

  data() {
    return {
      email: '',
      password: '',

      loading: false,

      error: false,
      errorMessage: null,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },

  methods: {
    async auth() {
      if (this.$v.$invalid) {
        return;
      }
      this.loading = true;
      const userInfo = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.$store.dispatch('signIn', userInfo);
        this.$store.commit('resetTrainings');
        this.$store.commit('resetDates');
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.errorMessage = error.message;
        return;
      }
      this.loading = false;

      this.$router.push({ name: 'Home' });
    },

    closeModal() {
      this.error = false;
      this.errorMessage = '';
    },
  },
};
</script>

<style></style>
