<template>
  <div class="mx-auto max-w-3xl rounded-md bg-white p-8 shadow-sm print:hidden">
    <h2 class="mb-4 text-2xl font-bold">Resume Preview Settings</h2>

    <div class="mb-4">
      <div class="my-2">
        <resume-suggestions-form
          @suggestions-loaded="handleSuggestionsLoaded"
        />
      </div>

      <job-application-form />
    </div>

    <resume-preview-settings-form />

    <resume-suggestions-modal
      :open-model="showSuggestionsModel"
      :suggested-skills="suggestedSkills"
      :suggested-accomplishments="suggestedAccomplishments"
      @close="closeSuggestionModal"
    />

    <footer>
      Made with 💜 by
      <a
        href="https://nirjan.dev"
        target="_blank"
        rel="noopener"
        >Nirjan Khadka</a
      >
    </footer>
  </div>
</template>

<script setup lang="ts">
  import { ISuggestedAccomplishment } from 'types/ISuggestedAccomplishment';
  import { ISuggestedSkill } from '~/types/ISuggestedSkill';

  const showSuggestionsModel = ref(false);

  const suggestedSkills = ref<ISuggestedSkill[]>([]);
  const suggestedAccomplishments = ref<ISuggestedAccomplishment[]>([]);

  function handleSuggestionsLoaded({
    suggestedSkills: suggestedSkillsFromAPI,
    suggestedAccomplishments: suggestedAccomplishmentsFromAPI,
  }: {
    suggestedSkills: ISuggestedSkill[];
    suggestedAccomplishments: ISuggestedAccomplishment[];
  }) {
    suggestedSkills.value = suggestedSkillsFromAPI;
    suggestedAccomplishments.value = suggestedAccomplishmentsFromAPI;
    openSuggestionModal();
  }

  function openSuggestionModal() {
    showSuggestionsModel.value = true;
  }

  function closeSuggestionModal() {
    showSuggestionsModel.value = false;
  }
</script>
