<template>
  <div
    class="sticky top-0 z-10 mb-12 bg-white px-4 py-2 shadow-sm print:hidden lg:px-20"
  >
    <nav
      class="container mx-auto grid grid-cols-12 items-center justify-between"
    >
      <nuxt-link
        class="col-span-6 md:col-span-2"
        to="/"
        >Home</nuxt-link
      >

      <div class="col-span-6 flex justify-end md:hidden">
        <NButton @click="() => (isMenuClosed = !isMenuClosed)">Menu</NButton>
      </div>

      <ul
        class="col-span-12 mx-0 flex flex-col flex-wrap justify-center gap-3 px-0 px-2 md:col-span-8 md:flex-row md:gap-8"
        :class="{ 'hidden-on-mobile': isMenuClosed }"
      >
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

      <ul
        v-if="!user"
        class="col-span-12 mx-0 flex flex-col items-start justify-end gap-4 px-0 md:col-span-2 md:flex-row md:items-center md:gap-6"
        :class="{ 'hidden-on-mobile': isMenuClosed }"
      >
        <li>
          <NButton>
            <nuxt-link to="/login">Login</nuxt-link>
          </NButton>
        </li>
        <li>
          <NButton type="primary">
            <nuxt-link
              to="/signup"
              class="text-white"
              >Sign Up</nuxt-link
            >
          </NButton>
        </li>
      </ul>

      <ul
        v-if="user"
        class="col-span-12 mx-0 flex flex-col items-start justify-end gap-4 px-0 md:col-span-2 md:flex-row md:items-center md:gap-6"
        :class="{ 'hidden-on-mobile': isMenuClosed }"
      >
        <li>
          <NButton>
            <nuxt-link to="/profile">Edit Profile</nuxt-link>
          </NButton>
        </li>
        <li>
          <NButton
            type="primary"
            @click="handleLogout"
          >
            Logout
          </NButton>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
  import { NButton, useMessage } from 'naive-ui';
  const message = useMessage();
  const isMenuClosed = ref(true);
  const user = useUser();
  const menuOptions = [
    {
      label: 'Apply',
      path: '/apply',
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

  async function handleLogout() {
    try {
      await $fetch('/api/logout', {
        method: 'POST',
      });
      message.success('Successfully logged out');
    } catch (error) {
      message.error('Something went wrong, please try again!');
    }
  }
</script>

<style scopped>
  a {
    @apply text-black;
  }

  .hidden-on-mobile {
    @apply hidden md:flex;
  }
</style>
