<template>
  <div class="flex justify-center md:justify-start flex-1">
    <router-link :to="{ name: 'Home' }">
      <slot></slot>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
