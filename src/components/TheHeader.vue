<template>
  <div class="bg-white fixed top-0 left-0 right-0 z-50">
    <div class="max-w-full mx-auto px-4 sm:px-6 border-b-2 border-gray-100">
      <div
        class="relative z-40 flex justify-between items-center py-2 md:py-4 md:justify-start md:space-x-10"
      >
        <HeaderLogo>
          <div class="flex items-center space-x-4">
            <svg
              class="h-12 w-12"
              fill="rgb(79, 70, 229)"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"
              />
            </svg>
            <div class="hidden lg:flex lg:flex-col">
              <h1 class="text-indigo-600 text-lg font-bold">
                Workout Plan
              </h1>
              <h2 class="text-indigo-600 text-md font-semibold">Constructor</h2>
            </div>
          </div>
        </HeaderLogo>
        <HeaderMobileNavButton
          :open="openMobileNav"
          @toggle-menu="toggleMobileNav"
        />
        <HeaderNavigation :navItems="navItems" />

        <div class="flex items-center justify-end md:flex-1 lg:w-0">
          <component :is="profileOrAuth"></component>
        </div>
      </div>
      <transition
        enter-active-class="transition ease-in duration-300"
        enter-class="transform -translate-x-full"
        enter-to-class="transform translate-x-0"
        leave-active-class="transition ease-in duration-300"
        leave-class="opacity-100 transform translate-x-0"
        leave-to-class="opacity-0 transform -translate-x-full"
      >
        <HeaderMobNav v-show="openMobileNav" :navItems="navItems" />
      </transition>
    </div>
  </div>
</template>

<script>
import HeaderNavigation from '@/components/HeaderNavigation';
import HeaderLogo from '@/components/HeaderLogo';
import HeaderAuthRegBtns from '@/components/HeaderAuthRegBtns';
import HeaderMobNav from '@/components/HeaderMobNav';
import HeaderProfile from '@/components/HeaderProfile';
import HeaderMobileNavButton from '@/components/HeaderMobileNavButton';
export default {
  components: {
    HeaderNavigation,
    HeaderLogo,
    HeaderMobNav,
    HeaderProfile,
    HeaderMobileNavButton,
    HeaderAuthRegBtns,
  },
  data() {
    return {
      navItems: [
        { name: 'Home', to: { name: 'Home' } },
        { name: 'All Plans', to: { name: 'AllPlans' } },
        { name: 'Create New Plan', to: { name: 'CreateNewPlan' } },
        { name: 'Calendar', to: { name: 'Calendar' } },
      ],
      openMobileNav: false,
    };
  },
  methods: {
    toggleMobileNav() {
      this.openMobileNav = !this.openMobileNav;
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    profileOrAuth() {
      return this.$store.state.user ? HeaderProfile : HeaderAuthRegBtns;
    },
  },
  watch: {
    $route() {
      this.openMobileNav = false;
    },
  },
};
</script>

<style></style>
