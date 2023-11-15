<template>
  <div class="mx-auto grid max-w-[1600px] grid-cols-12 gap-4">
    <resume-preview-settings
      class="col-span-12 print:hidden md:col-span-4"
    ></resume-preview-settings>
    <resume-preview
      class="col-span-12 print:col-span-12 md:col-span-8"
    ></resume-preview>
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

      // check if it has the import URL param
      const route = useRoute();

      const importParam = route.query.import;
      if (importParam) {
        let decoded;
        try {
          decoded = JSON.parse(importParam as string);

          const { setResume } = useResumeStore();
          setResume(decoded);
        } catch {}
      }
    },
  });
</script>
