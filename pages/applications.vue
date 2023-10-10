<template>
  <div class="px-4">
    <h1>Job Application History</h1>

    <div
      v-if="applications"
      class="py-6"
    >
      <div
        v-for="application in applications"
        :key="application.applicationLink"
        class="my-3 rounded-lg border-b-2 border-solid border-gray-700 px-3 py-4"
      >
        <h2 class="mb-2">{{ application.company }}</h2>

        <div class="my-3">
          <n-button
            @click="() => deleteApplication(application.applicationLink)"
            >Delete</n-button
          >
        </div>

        <span class="mr-2">{{
          new Date(application.dateApplied).toLocaleDateString()
        }}</span>

        <a :href="application.applicationLink">{{
          application.applicationLink
        }}</a>

        <p v-if="application.notes">{{ application.notes }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { NButton } from 'naive-ui';
  import { useApplicationsStore } from '~/store/applicationStore';

  const { applications, deleteApplication } = useApplicationsStore();
</script>
