<script>

export default {
  props: ['user']
}
</script>

<template>
  <!-- My Profile -->
  <div class="p-4 bg-gray-100 mt-2">
    <div class="mb-4 text-center opacity-90">
      <a href="#" class="relative block">
        <img
          alt="profil"
          :src="user.imageProfile"
          class="mx-auto object-cover rounded-full h-40 w-40"
        />
      </a>
    </div>
    <div class="text-center flex flex-col items-center">
      <p class="text-2xl text-black">{{ user ? user.fullName : '' }}</p>
      <p class="text-xl font-bold text-teal-500">{{ user.status }}</p>
      <div class="max-w-xs py-4 font-light text-black text-md">
        <p>Born at {{ user ? user.dateOfBirth : '' }}</p>
        <p>Live in {{ user ? user.city : '' }}</p>
      </div>
    </div>
    <div
      class="flex flex-col items-center justify-center pt-4 mx-auto text-gray-500 border-t border-gray-400 w-44"
    >
      <span
        class="font-medium whitespace-nowrap rounded-full bg-teal-100 px-2.5 py-0.5 text-sm text-teal-500"
      >
        {{ user.Badge ? user.Badge.name : '' }}
      </span>

      <div class="my-2">
        <h2 class="font-medium text-black">{{ user.star }} / 100 Stars</h2>
        <div class="mt-2 overflow-hidden rounded-full bg-gray-200">
          <div class="h-2 w-2/3 rounded-full bg-teal-500"></div>
        </div>
      </div>
    </div>
  </div>
</template>
