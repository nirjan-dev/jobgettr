<template>
  <n-space vertical>
    <n-switch v-model:value="show">
      <template #checked> Hide notes </template>
      <template #unchecked>
        <span class="text-black">Show notes</span>
      </template>
    </n-switch>
    <n-collapse-transition :show="show">
      {{ notes }}
    </n-collapse-transition>
  </n-space>
</template>

<script setup lang="ts">
  import { NSpace, NSwitch, NCollapseTransition } from 'naive-ui';
  defineProps<{ notes: string }>();
  const show = ref(false);
</script>
