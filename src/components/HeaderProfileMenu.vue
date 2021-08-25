<template>
  <div
    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
  >
    <div class="text-md px-4 text-indigo-600 font-semibold pb-2 border-b-2">
      {{ userFullName }}
    </div>

    <router-link
      :to="{ name: 'Settings' }"
      class="block px-4 py-2 text-sm text-gray-700"
      >Settings</router-link
    >
    <button @click="signOut" class="block px-4 py-2 text-sm text-gray-700">
      Sign out
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProfileMenu',
  props: {
    userInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    userFullName() {
      return this.userInfo.firstName + ' ' + this.userInfo.lastName;
    },
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut');
    },
  },
};
</script>

<style></style>
