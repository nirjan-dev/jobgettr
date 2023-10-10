<template>
  <div>
    <n-form-item label="Enter Job Description to get resume suggestions">
      <n-input
        v-model:value="jobDescription"
        type="textarea"
      ></n-input>
    </n-form-item>
    <n-button
      class="mb-3"
      role="button"
      type="info"
      :loading="isLoadingSuggestions"
      @click="getResumeSuggestions"
    >
      Get Resume Suggestions</n-button
    >
  </div>
</template>

<script setup lang="ts">
  import { NButton, useMessage, NFormItem, NInput } from 'naive-ui';
  import {
    ENABLE_ACTION,
    IGNORE_ACTION,
    ISuggestedSkill,
  } from '~/types/ISuggestedSkill';
  import { useResumePreviewStore } from '~/store/resumePreviewStore';

  const emit = defineEmits(['recommendedSkillsLoaded']);

  const message = useMessage();
  const { resumePreview } = useResumePreviewStore();

  const jobDescription = ref('');
  const isLoadingSuggestions = ref(false);
  const recommendedSkills = ref<ISuggestedSkill[]>([]);

  const skills = computed(function computedSkills() {
    return (
      resumePreview.skills.map(function getSkillTitle(skill) {
        return skill.title;
      }) ?? []
    );
  });

  async function getResumeSuggestions() {
    if (!jobDescription.value) {
      message.error('Please enter a job description');
      return;
    }

    const data = await fetchResumeSuggestions();

    if (!data) {
      return;
    }

    recommendedSkills.value =
      data.value?.suggestedSkillsToEnable.map(
        function getRecommendedSkills(skill) {
          return {
            skill,
            action: ENABLE_ACTION,
          };
        },
      ) ?? [];

    const additionalSkills: ISuggestedSkill[] =
      data.value?.additionalRecommendations.map(
        function getAdditionalSkills(skill) {
          return {
            skill,
            action: IGNORE_ACTION,
          };
        },
      ) ?? [];

    recommendedSkills.value = [...recommendedSkills.value, ...additionalSkills];

    emit('recommendedSkillsLoaded', recommendedSkills.value);
  }

  async function fetchResumeSuggestions() {
    isLoadingSuggestions.value = true;

    const { data } = await useFetch('/api/resume-suggestions', {
      method: 'POST',
      body: {
        jobDescription,
        skills,
      },
    });

    isLoadingSuggestions.value = false;

    if (!data) {
      message.error('No suggestions found');
      return false;
    }

    return data;
  }
</script>
