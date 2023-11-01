<template>
  <div
    class="sticky top-0 z-10 mb-12 flex items-center justify-center bg-white py-6 shadow-md"
  >
    <n-menu
      :options="menuOptions"
      mode="horizontal"
    />
  </div>
</template>

<script setup lang="ts">
  import { MenuOption, NMenu } from 'naive-ui';
  import MyNuxtLink from '~/components/MyNuxtLink';

  const menuOptions: MenuOption[] = [
    {
      label: function getLink() {
        return h(
          MyNuxtLink,
          {
            to: '/',
          },
          'Home',
        );
      },
      key: 'home',
    },

    {
      label: function getLink() {
        return h(
          MyNuxtLink,
          {
            to: '/settings',
          },
          'Settings',
        );
      },
      key: 'settings',
    },

    {
      label: function getLink() {
        return h(
          MyNuxtLink,
          {
            to: '/applications',
          },
          'Applications',
        );
      },
      key: 'applications',
    },

    {
      label: function getLink() {
        return h(
          MyNuxtLink,
          {
            to: '/learning-list',
          },
          'Learning List',
        );
      },
      key: 'learning-list',
    },
  ];
</script>
