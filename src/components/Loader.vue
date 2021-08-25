<template>
  <div
    class="flex items-center justify-center fixed z-20 left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50"
  >
    <div
      class="bg-white bg-opacity-80 p-3 flex space-x-2 rounded-full justify-center items-center "
    >
      <div
        class="bg-indigo-600 p-2  w-4 h-4 rounded-full animate-bounce blue-circle"
      ></div>
      <div
        class="bg-green-600 p-2 w-4 h-4 rounded-full animate-bounce green-circle"
      ></div>
      <div
        class="bg-red-600 p-2  w-4 h-4 rounded-full animate-bounce red-circle"
      ></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.blue-circle {
  animation-delay: 0.1s;
}

.green-circle {
  animation-delay: 0.3s;
}
.red-circle {
  animation-delay: 0.5s;
}
</style>
