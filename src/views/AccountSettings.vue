<template>
  <div class="flex justify-center items-center">
    <div class="w-full md:w-1/2 lg:w-2/5">
      <h3 class="pt-2 text-2xl text-gray-600 text-center">
        Change Your Info
      </h3>
      <form @submit.prevent="saveChanges" class="px-8 pt-3 pb-2">
        <div class="mb-4">
          <div>
            <label
              class="block mb-2 text-sm font-semibold text-gray-500"
              for="firstName"
            >
              First Name
            </label>
            <input
              v-model.trim="$v.firstName.$model"
              class="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-500 border-2 rounded appearance-none focus:outline-none focus:shadow-form"
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
          <div>
            <label
              class="block mb-2 text-sm font-semibold text-gray-500"
              for="lastName"
            >
              Last Name
            </label>
            <input
              v-model.trim="$v.lastName.$model"
              class="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-500 border-2 rounded appearance-none focus:outline-none focus:shadow-form"
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

        <div class="mb-4 text-center">
          <button
            class="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:shadow-form"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
    <Loader v-if="loading" />
    <ModalWindow @close-modal="modal = false" v-if="modal">
      <template #title>
        {{ modalTitle }}
      </template>
      <template #main>
        {{ modalMessage }}
      </template>
    </ModalWindow>
  </div>
</template>

<script>
import Loader from '@/components/Loader';
import ModalWindow from '@/components/ModalWindow';

import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'AccountSettings',

  components: {
    Loader,
    ModalWindow,
  },

  data() {
    return {
      firstName: '',
      lastName: '',

      loading: true,

      modal: false,
      modalTitle: '',
      modalMessage: '',
    };
  },

  mounted() {
    if (this.user) this.initInfo();

    this.loading = false;
  },

  watch: {
    user() {
      this.initInfo();
    },
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
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
  },

  methods: {
    async saveChanges() {
      this.loading = true;

      const newUserInfo = {
        firstName: this.firstName,
        lastName: this.lastName,
      };

      try {
        await this.$store.dispatch('updateUser', newUserInfo);
      } catch (e) {
        this.loading = false;
        this.modal = true;
        this.modalTitle = 'Error';
        this.modalMessage = e.message;
        return;
      }

      this.loading = false;
      this.modal = true;
      this.modalTitle = 'Succesfull';
      this.modalMessage = 'You are updated your profile info';
    },

    initInfo() {
      this.firstName = this.$store.state.user.firstName;
      this.lastName = this.$store.state.user.lastName;

      this.loading = false;
    },
  },
};
</script>

<style></style>
