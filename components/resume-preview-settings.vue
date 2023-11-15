<template>
  <div class="mx-auto max-w-3xl rounded-md bg-white p-8 shadow-sm print:hidden">
    <h2 class="mb-4 flex justify-between text-xl font-bold">
      Resume Preview Settings
      <n-button
        class="ml-1"
        type="primary"
        @click="openAddApplicationModal"
        >Add Application</n-button
      >
    </h2>

    <div class="mb-4">
      <div class="my-2">
        <resume-suggestions-form
          @suggestions-loaded="handleSuggestionsLoaded"
        />
      </div>

      <p>
        Easily download custom resumes for ATR systems and get hired faster.
      </p>
      <div>
        <NButton
          type="primary"
          :ghost="true"
          class="mr-2"
          :loading="isDownloadingResume"
          @click="downloadResume"
          >Download Resume</NButton
        >
      </div>
    </div>

    <resume-preview-settings-form />

    <resume-suggestions-modal
      :open-model="showSuggestionsModel"
      :suggested-skills="suggestedSkills"
      :suggested-accomplishments="suggestedAccomplishments"
      @close="closeSuggestionModal"
    />

    <add-application-modal
      :open-model="showAddApplicationModel"
      @close="closeAddApplicationModal"
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
  import { NButton } from 'naive-ui';
  import { storeToRefs } from 'pinia';
  import { ISuggestedAccomplishment } from 'types/ISuggestedAccomplishment';
  import { ISuggestedSkill } from '~/types/ISuggestedSkill';
  import { IResumePreview } from 'types/IResumePreview';
  import { IResume } from 'types/IResume';
  import { useResumePreviewStore } from '~/store/resumePreviewStore';

  const showSuggestionsModel = ref(false);
  const showAddApplicationModel = ref(false);
  const { enabledSkills, resumePreview } = storeToRefs(useResumePreviewStore());

  const { getEnabledAccomplishmentsFromJob } = useResumePreviewStore();

  const suggestedSkills = ref<ISuggestedSkill[]>([]);
  const suggestedAccomplishments = ref<ISuggestedAccomplishment[]>([]);
  const isDownloadingResume = ref(false);

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

  function openAddApplicationModal() {
    showAddApplicationModel.value = true;
  }

  function closeAddApplicationModal() {
    showAddApplicationModel.value = false;
  }

  async function downloadResume() {
    isDownloadingResume.value = true;
    const result: any = await $fetch('/api/download-resume', {
      method: 'POST',
      responseType: 'arrayBuffer',
      headers: {
        Accept: 'application/pdf',
      },
      body: {
        resumeDetails: JSON.stringify(
          resumePreviewToResume(resumePreview.value),
        ),
      },
    });

    const blob = new Blob([result], { type: 'application/pdf' });

    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'resume.pdf';
    a.click();
    a.remove();
    isDownloadingResume.value = false;
  }

  function resumePreviewToResume(resumePreview: IResumePreview): IResume {
    return {
      ...resumePreview,
      skills: enabledSkills.value,
      jobs: resumePreview.jobs.map(
        function getEnabledAccomplishmentsWithJobs(j) {
          return {
            ...j,
            accomplishments: getEnabledAccomplishmentsFromJob(j),
          };
        },
      ),
    };
  }
</script>
