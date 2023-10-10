<template>
  <div class="mx-auto max-w-3xl p-3 print:hidden">
    <h2 class="mb-4 text-2xl font-bold">Resume Preview Settings</h2>

    <div class="mb-4">
      <div class="my-2">
        <resume-suggestions-form
          @recommended-skills-loaded="handleRecommendedSkillsLoaded"
        />
      </div>

      <job-application-form />
    </div>

    <resume-preview-settings-form />

    <resume-suggestions-modal
      :open-model="showSuggestionsModel"
      :recommended-skills="recommendedSkills"
      @close="closeSuggestionModal"
    />
  </div>
</template>

<script setup lang="ts">
  import { ISuggestedSkill } from '~/types/ISuggestedSkill';

  const showSuggestionsModel = ref(false);

  const recommendedSkills = ref<ISuggestedSkill[]>([]);

  function handleRecommendedSkillsLoaded(
    loadingRecommendedSkills: ISuggestedSkill[],
  ) {
    recommendedSkills.value = loadingRecommendedSkills;
    openSuggestionModal();
  }

  function openSuggestionModal() {
    showSuggestionsModel.value = true;
  }

  function closeSuggestionModal() {
    showSuggestionsModel.value = false;
  }
</script>
