<template>
  <div class="text-center section z-1">
    <v-calendar
      class="custom-calendar max-w-full"
      :masks="masks"
      :attributes="attributes"
      is-expanded
      :min-date="new Date()"
    >
      <template v-slot:day-content="{ day, attributes }">
        <div
          class="flex flex-col h-full z-10 overflow-hidden"
          :class="{
            'bg-gray-200': day.isDisabled,
            'border-4':
              day.date.toLocaleString('en-US').slice(0, 9) ===
              new Date().toLocaleString('en-US').slice(0, 9),
            'border-indigo-400':
              day.date.toLocaleString('en-US').slice(0, 9) ===
              new Date().toLocaleString('en-US').slice(0, 9),
          }"
        >
          <span class="day-label text-md text-gray-900 mx-1">{{
            day.day
          }}</span>
          <div class="flex-grow overflow-y-auto overflow-x-auto">
            <p
              v-for="(attr, idx) in attributes"
              :key="idx"
              class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1 text-center mx-1 cursor-pointer"
              :class="attr.customData.class"
              @click="$emit('training-info', attr.customData.title)"
            >
              {{ attr.customData.title }}
            </p>
          </div>
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      masks: {
        weekdays: 'WWW',
      },
    };
  },

  computed: {
    attributes() {
      return this.$store.state.calendarDates.map((el) => {
        return {
          customData: {
            title: el.trainingName,
            class: 'bg-indigo-500 text-white',
          },
          dates: el.dates.map((el) => el.date),
        };
      });
    },
  },
};
</script>
<style lang="postcss" scoped>
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
/deep/ .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 30px;
  --day-height: 65px;
  --day-height-md: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;
  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    @media (min-width: 768px) {
      height: var(--day-height-md);
    }
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>
