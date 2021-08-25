<template>
  <div
    class="min-h-screen bg-cover bg-no-repeat flex justify-center items-center bg-left md:bg-center"
    :style="{
      'background-image': `url(${require('../assets/RegAndAuthBackground.webp')})`,
    }"
  >
    <div class="w-full md:w-1/2 lg:w-2/5 bg-black bg-opacity-90 p-2 rounded-lg">
      <h3 class="pt-2 text-2xl text-gray-300 text-center">
        Create an Account!
      </h3>
      <form @submit.prevent="registration" class="px-8 pt-3 pb-2">
        <div class="mb-4 md:flex md:justify-between md:space-x-4">
          <div class="md:flex-1 mb-4 md:mb-0">
            <label
              class="block mb-2 text-sm font-bold text-gray-300"
              for="firstName"
            >
              First Name
            </label>
            <input
              v-model.trim="$v.firstName.$model"
              class="w-full px-3 py-2 mb-1 text-sm leading-tight bg-black bg-opacity-70 text-gray-300 border rounded appearance-none focus:outline-none focus:shadow-form"
              :class="{
                'border-red-500': $v.firstName.$error,
              }"
              id="firstName"
              type="text"
              placeholder="First Name"
              autocomplete="off"
            />
            <p
              class="text-xs italic text-red-500"
              v-if="$v.firstName.$error && !$v.firstName.required"
            >
              Name is required
            </p>
            <p
              class="text-xs italic text-red-500"
              v-else-if="$v.firstName.$error && !$v.firstName.minLength"
            >
              Name must be longer than
              {{ $v.firstName.$params.minLength.min }} characters
            </p>
          </div>
          <div class="md:ml-2 md:flex-1">
            <label
              class="block mb-2 text-sm font-bold text-gray-300"
              for="lastName"
            >
              Last Name
            </label>
            <input
              v-model.trim="$v.lastName.$model"
              class="w-full px-3 py-2 mb-1 text-sm leading-tight bg-black bg-opacity-70 text-gray-300 border rounded appearance-none focus:outline-none focus:shadow-form"
              id="lastName"
              type="text"
              placeholder="Last Name"
              autocomplete="off"
              :class="{
                'border-red-500': $v.lastName.$error,
              }"
            />
            <p
              v-if="$v.lastName.$error && !$v.lastName.required"
              class="text-xs italic text-red-500"
            >
              Last Name is required
            </p>
            <p
              v-if="$v.lastName.$error && !$v.lastName.minLength"
              class="text-xs italic text-red-500"
            >
              Name must be longer than
              {{ $v.lastName.$params.minLength.min }} characters
            </p>
          </div>
        </div>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-300" for="email">
            Email
          </label>
          <input
            v-model.trim="$v.email.$model"
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
            Please enter correct Email
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
            <p
              v-if="$v.password.$error && !$v.password.minLength"
              class="text-xs italic text-red-500"
            >
              Password must be more than
              {{ $v.password.$params.minLength.min }} characters.
            </p>
          </div>
          <div class="md:ml-2 md:flex-1">
            <label
              class="block mb-2 text-sm font-bold text-gray-300"
              for="c_password"
            >
              Confirm Password
            </label>
            <input
              v-model="$v.confirmPassword.$model"
              :class="{
                'border-red-500': $v.confirmPassword.$error,
              }"
              class="w-full px-3 py-2 mb-1 text-sm leading-tight bg-black bg-opacity-70 text-gray-300 border rounded appearance-none focus:outline-none focus:shadow-form"
              id="c_password"
              type="password"
              placeholder="******************"
            />
            <p
              v-if="$v.confirmPassword.$error"
              class="text-xs italic text-red-500"
            >
              Passwords must match.
            </p>
          </div>
        </div>
        <div class="mb-4 text-center">
          <button
            class="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:shadow-form"
            type="submit"
          >
            Sign Up
          </button>
        </div>

        <div class="text-center">
          <router-link
            class="inline-block text-md font-semibold text-indigo-600 align-baseline hover:text-indigo-700 flex justify-center"
            :to="{ name: 'SignIn' }"
          >
            Already have an account? Login!
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
    <ModalWindow @close-modal="rejectSave" v-if="permissionToSave">
      <template #title>
        <h2 class="text-red-500 text-lg">We can save that</h2>
      </template>
      <template #main>
        <p>Save your plans and trainings in your new account?</p>
      </template>
      <template #button>
        <button
          @click="resolveSave"
          class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Save!
        </button>
      </template>

      <template #closeButtonName>Don't save...</template>
    </ModalWindow>
    <Loader v-if="loading" />
  </div>
</template>

<script>
import { minLength, required, email, sameAs } from 'vuelidate/lib/validators';
import ModalWindow from '@/components/ModalWindow';
import Loader from '@/components/Loader';

export default {
  name: 'SignUp',

  components: { ModalWindow, Loader },

  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',

      loading: false,

      error: false,
      errorMessage: null,

      permissionToSave: false,

      resolveSaveProm: null,
      rejectSaveProm: null,
    };
  },

  validations: {
    firstName: {
      required,
      minLength: minLength(2),
    },
    lastName: {
      required,
      minLength: minLength(2),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password'),
    },
  },
  methods: {
    async registration() {
      if (this.$v.$invalid) {
        return;
      }
      this.loading = true;
      const userInfo = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
      };
      try {
        await this.$store.dispatch('signUp', userInfo);

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
    showPopup() {
      return new Promise((res, rej) => {
        this.resolveSaveProm = res;
        this.rejectSaveProm = rej;
        this.permissionToSave = true;
      });
    },

    resolveSave() {
      this.permissionToSave = false;
      this.resolveSaveProm(true);
    },
    rejectSave() {
      this.permissionToSave = false;
      this.rejectSaveProm(false);
    },
  },
};
</script>

<style></style>
