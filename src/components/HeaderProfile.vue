<template>
  <div class="relative">
    <div class="flex flex-auto justify-between items-center cursor-pointer">
      <button
        @click="toggleProfileMenu"
        type="button"
        class="bg-indigo-700 flex  text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        <div
          class="h-10 w-10 rounded-full flex justify-center items-center text-lg font-semibold text-white"
        >
          {{ userInitials }}
        </div>
      </button>
    </div>
    <HeaderProfileMenu :userInfo="user" v-show="openProfileMenu" />
  </div>
</template>

<script>
import HeaderProfileMenu from '@/components/HeaderProfileMenu';
export default {
  components: { HeaderProfileMenu },
  data() {
    return {
      openProfileMenu: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    userInitials() {
      return (
        this.user.firstName.charAt(0) + this.user.lastName.charAt(0)
      ).toUpperCase();
    },
  },
  watch: {
    $route() {
      this.openProfileMenu = false;
    },
  },

  methods: {
    toggleProfileMenu() {
      this.openProfileMenu = !this.openProfileMenu;
    },
  },
};
</script>

<style></style>
