<script></script>

<template>
  <!-- Form Add Post -->
  <div class="flex flex-col mx-auto my-2 max-w-xl">
    <label class="font-bold mt-4 mb-2 text-left"
      >Activity Name: Incline Hammer Curls</label
    >
    <label class="font-bold mb-2 text-left">Type: strength</label>
    <label class="font-bold mb-4 text-left">
      Difficulty:
      <strong
        class="rounded bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700"
      >
        beginner
      </strong>
    </label>

    <form class="">
      <label class="font-bold mt-4 mb-2 text-left">Caption: </label>
      <textarea
        id="UserEmail"
        placeholder="Write your story here!"
        class="mt-1 p-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
      ></textarea>

      <label class="font-bold mt-4 mb-2 text-left"
        >Upload your image of doing this activity:
      </label>
      <button
        type="button"
        class="mt-1 max-w-fit py-2 px-4 flex justify-center items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
      >
        <svg
          width="20"
          height="20"
          fill="currentColor"
          class="mr-2"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"
          ></path>
        </svg>
        Upload
      </button>
      <img src="" width="1000" alt="" class="my-2" />

      <button
        type="button"
        class="my-4 py-2 px-4 bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 focus:ring-offset-teal-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
      >
        Post
      </button>
    </form>
  </div>
</template>
