<template>
  <n-space vertical>
    <n-switch v-model:value="show">
      <template #checked> Hide {{ name }} </template>
      <template #unchecked>
        <span class="text-black">Show {{ name }}</span>
      </template>
    </n-switch>
    <n-collapse-transition :show="show">
      <slot></slot>
    </n-collapse-transition>
  </n-space>
</template>

<script setup lang="ts">
  import { NSpace, NSwitch, NCollapseTransition } from 'naive-ui';
  defineProps<{ name: string }>();
  const show = ref(false);
</script>
