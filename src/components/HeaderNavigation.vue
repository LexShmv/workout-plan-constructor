<template>
  <nav class="relative hidden md:flex space-x-10">
    <router-link
      v-for="(navItem, idx) of navItems"
      :key="idx"
      :to="navItem.to"
      exact-active-class="text-indigo-600"
      class="text-base font-medium text-gray-500"
      >{{ navItem.name }}</router-link
    >
  </nav>
</template>

<script>
export default {
  props: {
    navItems: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
