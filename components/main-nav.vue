<template>
  <div
    class="sticky top-0 z-10 mb-12 flex items-center justify-center bg-white py-4 shadow-md print:hidden"
  >
    <nav>
      <ul class="flex flex-wrap gap-4 px-2 md:gap-8">
        <li
          v-for="option in menuOptions"
          :key="option.path"
        >
          <nuxt-link
            class="text-black hover:text-blue-500"
            :to="option.path"
            >{{ option.label }}</nuxt-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
  const menuOptions = [
    {
      label: 'Apply',
      path: '/',
    },
    {
      label: 'Edit',
      path: '/edit',
    },
    {
      label: 'Applications',
      path: '/applications',
    },
    {
      label: 'Learning list',
      path: '/learning-list',
    },
  ];
</script>
