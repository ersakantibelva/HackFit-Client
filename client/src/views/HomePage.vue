<script>
import { mapState, mapActions } from "pinia";
import { useGlobalStore } from "../stores/global";
import ActivityCard from "@/components/ActivityCard.vue";
import Leaderboard from "@/components/Leaderboard.vue";

export default {
  components: {
    ActivityCard,
    Leaderboard
  },
  computed: {
    ...mapState(useGlobalStore, ['user', 'activities']),
    badge() {
      return (this.user.Badge ? this.user.Badge.name : '')
    }
  },
  methods: {
    ...mapActions(useGlobalStore, ['fetchUserLogin', 'fetchActivities'])
  },
  created() {
    this.fetchUserLogin(localStorage.userId)
    this.fetchActivities()
  }
};
</script>

<template>
  <!-- Home Page -->
  <header class="bg-gray-100" aria-label="Page Header">
    <div
      class="mx-auto container px-4 py-8 sm:py-12 sm:px-6 lg:px-8"
    >
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="text-center sm:text-left">
          <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome Back, {{ user.fullName }}!
          </h1>

          <div>
            <div class="my-2">
              <h2 class="font-medium">{{ badge }} - {{ user.star }} / 100 Stars</h2>
              <div class="mt-2 overflow-hidden rounded-full bg-gray-200">
                <div class="h-2 w-2/3 rounded-full bg-teal-500"></div>
              </div>
            </div>
          </div>

          <h2 class="mt-4">Let's get fit and share it to your friends! 🎉</h2>
        </div>

        <div
          class="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center"
        >
          <router-link
            to="/new-activity"
            class="block rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring"
            type="button"
          >
            Create Post
          </router-link>
        </div>
      </div>
    </div>
  </header>

  <!-- Activities Cards -->
  <div class="container gap-10 grid grid-cols-10 mx-auto my-4 justify-around px-6 mx-auto">
    <Leaderboard />

    <div class="justify-center col-end-10 col-span-5 flex flex-col gap-4 w-full justify-center">
      <ActivityCard
      v-for="activity in activities"
      :key="activity.id"
      :activity="activity"
      />
    </div>

    
  </div>
</template>
