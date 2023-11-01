<template>
  <n-form
    ref="jobApplicationFormRef"
    :model="jobApplicationFormValue"
  >
    <n-form-item
      label="Company"
      path="company"
    >
      <n-input v-model:value="jobApplicationFormValue.company"></n-input>
    </n-form-item>

    <n-form-item
      label="link"
      path="applicationLink"
      :rule="getLinkValidationRule()"
    >
      <n-input
        v-model:value="jobApplicationFormValue.applicationLink"
      ></n-input>
    </n-form-item>

    <n-form-item
      label="Notes"
      path="notes"
    >
      <n-input
        v-model:value="jobApplicationFormValue.notes"
        type="textarea"
      ></n-input>
    </n-form-item>

    <n-button @click="applyForJob">Apply for the Job</n-button>
  </n-form>
</template>

<script setup lang="ts">
  import {
    FormInst,
    NForm,
    NFormItem,
    NInput,
    useMessage,
    NButton,
  } from 'naive-ui';
  import { useApplicationsStore } from '~/store/applicationStore';
  import { useResumePreviewStore } from '~/store/resumePreviewStore';

  const { addApplication } = useApplicationsStore();
  const message = useMessage();
  const { resumePreview } = useResumePreviewStore();

  const jobApplicationFormRef = ref<FormInst | null>(null);
  const jobApplicationFormValue = ref({
    company: '',
    resumeDetails: '',
    applicationLink: '',
    stage: 'applied',
    notes: '',
    dateApplied: '',
  });

  function applyForJob() {
    if (window) {
      window.print();

      jobApplicationFormValue.value.resumeDetails =
        JSON.stringify(resumePreview);

      jobApplicationFormValue.value.dateApplied = new Date().toISOString();

      addApplication(jobApplicationFormValue.value);

      message.success('Job Application Saved');
    }
  }
</script>
