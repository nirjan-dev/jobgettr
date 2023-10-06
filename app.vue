<template>
  <div>
    <n-message-provider>
      <nav class="flex items-center justify-center gap-4 py-4 print:hidden">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/settings">Settings</NuxtLink>
        <NuxtLink to="/applications">Applications</NuxtLink>
        <NuxtLink to="/learning-list">Learning List</NuxtLink>
      </nav>
      <NuxtPage />
    </n-message-provider>
  </div>
</template>

<script lang="ts" setup>
  import { NMessageProvider } from 'naive-ui';
</script>

<style>
  body {
    @apply font-sans leading-6;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply m-0 font-sans leading-4;
  }

  ul {
    @apply list-none pl-0;
  }

  a {
    @apply text-blue-500 no-underline;
  }
</style>
