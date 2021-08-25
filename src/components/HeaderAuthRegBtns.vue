<template>
  <div>
    <div class="hidden md:block">
      <router-link
        :to="{ name: 'SignIn' }"
        class="whitespace-nowrap text-base font-medium text-gray-500"
      >
        Sign In
      </router-link>
      <router-link
        :to="{ name: 'SignUp' }"
        class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Sign Up
      </router-link>
    </div>
    <div
      class="w-10 h-10 md:hidden flex items-center justify-center transform  rotate-180"
    >
      <router-link :to="{ name: 'SignIn' }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#6B7280"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderAuthAndRegBtns',
};
</script>

<style></style>
