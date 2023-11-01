<template>
  <div class="mx-auto max-w-3xl p-3 px-4">
    <h1>Job Application History</h1>

    <div
      v-if="applications && applications.length > 0"
      class="py-6"
    >
      <div
        v-for="application in applications"
        :key="application.applicationLink"
        class="my-6 rounded-lg bg-white px-6 py-8 shadow-sm"
      >
        <h2 class="mb-2">{{ application.company }}</h2>

        <p>
          Applied on
          <span class="mr-2">{{
            new Date(application.dateApplied).toLocaleDateString()
          }}</span>
        </p>

        <p>
          <a :href="application.applicationLink">{{
            application.applicationLink
          }}</a>
        </p>

        <p v-if="application.notes">{{ application.notes }}</p>

        <div class="my-3">
          <n-button
            type="error"
            @click="() => deleteApplication(application.applicationLink)"
            >Delete</n-button
          >
        </div>
      </div>
    </div>

    <p
      v-else
      class="py-4 text-lg"
    >
      No Applications saved yet
    </p>
  </div>
</template>

<script setup lang="ts">
  import { NButton } from 'naive-ui';
  import { useApplicationsStore } from '~/store/applicationStore';

  const { applications, deleteApplication } = useApplicationsStore();
</script>
