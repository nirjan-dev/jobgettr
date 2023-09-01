<template>
  <div>
    <n-message-provider>
      <nav class="print:hidden flex justify-center items-center gap-4 py-4">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/settings">Settings</NuxtLink>
      </nav>
      <NuxtPage />
    </n-message-provider>
  </div>
</template>

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
  @apply font-sans m-0 leading-4;
}

ul {
  @apply list-none pl-0;
}

a {
  @apply text-blue-500 no-underline;
}
</style>

<script lang="ts" setup>
import { NMessageProvider } from "naive-ui";
</script>
