<template>
  <div class="p-3">
    <h3>Skills</h3>
    <ul class="flex flex-wrap">
      <li
        v-for="skill in enabledSkills"
        :key="skill.title"
        class="mr-2"
      >
        {{ skill.title }}
      </li>
    </ul>

    <template
      v-for="job in parsedResumeDetails.jobs"
      :key="job.companyName"
    >
      <h3>{{ job.companyName }}</h3>

      <ul class="list-disc">
        <li
          v-for="accomplishment in job.accomplishments"
          :key="accomplishment.title"
        >
          {{ accomplishment.title }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { IResumePreview } from 'types/IResumePreview';

  const props = defineProps<{
    resumeDetails: string;
  }>();

  const parsedResumeDetails = computed(
    function parseResumeDetails(): IResumePreview {
      return JSON.parse(props.resumeDetails);
    },
  );

  const enabledSkills = computed(function getEnabledSkills() {
    return parsedResumeDetails.value.skills.filter(function isEnabled(skill) {
      return skill.enabled;
    });
  });
</script>
