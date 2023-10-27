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
  import { IResumeSuggestionsBody } from 'types/IResumeSuggestionsBody';
  import { ISuggestedAccomplishment } from 'types/ISuggestedAccomplishment';

  const emit = defineEmits<{
    suggestionsLoaded: [
      suggestions: {
        suggestedSkills: ISuggestedSkill[];
        suggestedAccomplishments: ISuggestedAccomplishment[];
      },
    ];
  }>();

  const message = useMessage();
  const { resumePreview } = useResumePreviewStore();

  const jobDescription = ref('');
  const isLoadingSuggestions = ref(false);
  const suggestedSkills = ref<ISuggestedSkill[]>([]);
  const suggestedAccomplishments = ref<ISuggestedAccomplishment[]>([]);

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

    updateSuggestedAccomplishments(data.value?.suggestedAccomplishments);
    updatedSuggestedSkills(
      data.value?.suggestedSkillsToEnable,
      data.value?.additionalRecommendations,
    );

    emit('suggestionsLoaded', {
      suggestedSkills: suggestedSkills.value,
      suggestedAccomplishments: suggestedAccomplishments.value,
    });
  }

  function updateSuggestedAccomplishments(
    suggestedAccomplishmentsFromAPI: string[][] | undefined,
  ) {
    if (!suggestedAccomplishmentsFromAPI) {
      return;
    }

    const allAccomplishments = suggestedAccomplishmentsFromAPI.flat();

    suggestedAccomplishments.value =
      allAccomplishments.map(
        function getSuggestedAccomplishments(accomplishment) {
          return {
            accomplishment,
            action: ENABLE_ACTION,
          };
        },
      ) ?? [];
  }

  function updatedSuggestedSkills(
    suggestedSkillsToEnable: string[] | undefined,
    additionalRecommendations: string[] | undefined,
  ) {
    if (suggestedSkillsToEnable && additionalRecommendations) {
      suggestedSkills.value =
        suggestedSkillsToEnable.map(function getRecommendedSkills(skill) {
          return {
            skill,
            action: ENABLE_ACTION,
          };
        }) ?? [];

      const additionalSkills: ISuggestedSkill[] =
        additionalRecommendations.map(function getAdditionalSkills(skill) {
          return {
            skill,
            action: IGNORE_ACTION,
          };
        }) ?? [];
      suggestedSkills.value = [...suggestedSkills.value, ...additionalSkills];
    }
  }

  const allAccomplishments = computed(function getAllAccomplishments() {
    const accomplishments: string[][] = [];

    resumePreview.jobs.forEach(function loopOverJobs(job) {
      const accomplishMentsForThisJob = job.accomplishments.map(
        function getAccomplishmentTitle(accomplishment) {
          return accomplishment.title;
        },
      );
      accomplishments.push(accomplishMentsForThisJob);
    });

    return accomplishments;
  });

  async function fetchResumeSuggestions() {
    isLoadingSuggestions.value = true;

    const endpointBody: IResumeSuggestionsBody = {
      jobDescription: jobDescription.value,
      skills: skills.value,
      accomplishments: allAccomplishments.value,
    };

    const { data } = await useFetch('/api/resume-suggestions', {
      method: 'POST',
      body: endpointBody,
    });

    isLoadingSuggestions.value = false;

    if (!data) {
      message.error('No suggestions found');
      return false;
    }

    return data;
  }
</script>
