<template>
  <n-form
    ref="formRef"
    :model="formValue"
  >
    <n-form-item
      label="Role"
      path="role"
    >
      <n-input v-model:value="formValue.role"></n-input>
    </n-form-item>

    <n-form-item
      label="Skills"
      path="skills"
    >
      <n-grid
        :y-gap="8"
        :x-gap="4"
        :cols="1"
      >
        <n-gi>
          <n-checkbox
            v-for="skill in formValue.skills"
            :key="skill.title"
            v-model:checked="skill.enabled"
            :value="skill.title"
          >
            {{ skill.title }}
          </n-checkbox>
        </n-gi>
      </n-grid>
    </n-form-item>

    <n-form-item
      v-for="(job, index) in formValue.jobs"
      :key="index"
      label="Jobs"
      path="jobs"
      :show-label="false"
    >
      <n-grid
        class="mb-2"
        :cols="1"
      >
        <n-gi>
          <n-checkbox
            v-for="accomplishment in job.accomplishments"
            :key="accomplishment.title"
            v-model:checked="accomplishment.enabled"
            class="mb-2"
            :value="accomplishment.title"
          >
            {{ accomplishment.title }}
          </n-checkbox>
        </n-gi>
      </n-grid>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
  import {
    FormInst,
    NForm,
    NFormItem,
    NInput,
    NCheckbox,
    NGrid,
    NGi,
  } from 'naive-ui';
  import { useResumePreviewStore } from '~/store/resumePreviewStore';

  const { resumePreview } = useResumePreviewStore();

  const formRef = ref<FormInst | null>(null);
  const formValue = ref(resumePreview);
</script>
