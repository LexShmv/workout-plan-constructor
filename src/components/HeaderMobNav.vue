<template>
  <div class="relative z-10 px-2 pt-2 pb-3 space-y-1">
    <router-link
      v-for="(navItem, idx) of navItems"
      :key="idx"
      :to="navItem.to"
      class="block px-4 py-3 text-base font-medium text-gray-500"
    >
      {{ navItem.name }}
    </router-link>
  </div>
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
