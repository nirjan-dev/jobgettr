<template>
  <div class="mx-auto grid max-w-[1600px] grid-cols-12 gap-4">
    <resume-preview-settings class="col-span-4"></resume-preview-settings>
    <resume-preview class="col-span-8 print:col-span-12"></resume-preview>
  </div>
</template>

<script setup lang="ts">
  import { useResumeStore } from '~/store/resumeStore';

  definePageMeta({
    middleware: function homeRouteGuard() {
      const { resume } = useResumeStore();

      if (!resume) {
        return navigateTo('edit');
      }
    },
  });
</script>
