<template>
  <div class="bg-gray-100">
    <n-message-provider>
      <main-nav />
      <NuxtPage />
    </n-message-provider>
  </div>
</template>

<script lang="ts" setup>
  import { NMessageProvider } from 'naive-ui';
</script>

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
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
    @apply inline text-blue-500 no-underline;
  }
</style>
