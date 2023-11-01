<template>
  <div class="mx-auto max-w-3xl p-3">
    <h2 class="mb-4 text-2xl font-bold">Resume Settings</h2>
    <p>Required fields are marked with *</p>
    <n-form
      ref="formRef"
      :model="formValue"
      :rules="rules"
    >
      <n-form-item
        label="Name"
        path="name"
      >
        <n-input v-model:value="formValue.name"></n-input>
      </n-form-item>

      <n-form-item
        label="Role"
        path="role"
      >
        <n-input v-model:value="formValue.role"></n-input>
      </n-form-item>

      <n-form-item
        label="Summary"
        path="summary"
      >
        <n-input
          v-model:value="formValue.summary"
          type="textarea"
        ></n-input>
      </n-form-item>

      <n-form-item
        label="Email"
        path="email"
      >
        <n-input v-model:value="formValue.email"></n-input>
      </n-form-item>

      <n-form-item
        label="Location"
        path="location"
      >
        <n-input v-model:value="formValue.location"></n-input>
      </n-form-item>

      <n-form-item
        label="Phone Number"
        path="phoneNumber"
      >
        <n-input v-model:value="formValue.phoneNumber"></n-input>
      </n-form-item>

      <n-form-item
        label="Links"
        path="links"
      >
        <n-dynamic-input
          v-model:value="formValue.links"
          :on-create="onCreateLink"
          #="{ index, value }"
        >
          <div class="my-2 w-full">
            <n-form-item
              label="Title"
              :path="`links.${index}.title`"
            >
              <n-input v-model:value="value.title"></n-input>
            </n-form-item>
            <n-form-item
              label="Link"
              :path="`links.${index}.link`"
              :rule="getLinkValidationRule()"
            >
              <n-input v-model:value="value.link"></n-input>
            </n-form-item>
          </div>
        </n-dynamic-input>
      </n-form-item>

      <n-form-item
        label="Skills"
        path="skills"
      >
        <n-dynamic-tags v-model:value="formValue.skills"></n-dynamic-tags>
      </n-form-item>

      <resume-job-field v-model:jobs="formValue.jobs" />

      <n-form-item
        label="Projects"
        path="projects"
      >
        <n-dynamic-input
          v-model:value="formValue.projects"
          :on-create="onCreateProject"
          #="{ index, value }"
        >
          <div class="w-full">
            <n-form-item
              label="Title"
              :path="`projects.${index}.title`"
            >
              <n-input v-model:value="value.title"></n-input>
            </n-form-item>

            <n-form-item
              label="Description"
              :path="`projects.${index}.description`"
            >
              <n-input
                v-model:value="value.description"
                type="textarea"
              ></n-input>
            </n-form-item>

            <n-form-item
              label="Link"
              :path="`projects.${index}.link`"
              :rule="getLinkValidationRule()"
            >
              <n-input v-model:value="value.link"></n-input>
            </n-form-item>
          </div>
        </n-dynamic-input>
      </n-form-item>

      <n-form-item>
        <n-button
          type="success"
          @click="onSubmit"
        >
          Save
        </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
  import {
    FormInst,
    NForm,
    NFormItem,
    NInput,
    NDynamicTags,
    NDynamicInput,
    NButton,
    useMessage,
    FormRules,
  } from 'naive-ui';
  import { useResumeStore } from '~/store/resumeStore';

  const formRef = ref<FormInst | null>(null);

  const { setResume, resume } = useResumeStore();

  const formValue = ref(resume);

  const rules: FormRules = {
    name: {
      required: true,
      trigger: 'blur',
    },
    role: {
      required: true,
      trigger: 'blur',
    },
    summary: {
      required: true,
      trigger: 'blur',
    },
  };

  const message = useMessage();

  function onCreateProject() {
    return {
      title: '',
      description: '',
      link: '',
    };
  }

  function onCreateLink() {
    return {
      title: '',
      link: '',
    };
  }

  function onSubmit() {
    formRef.value?.validate(function validateForm(errors) {
      if (errors) {
        message.error('Please fix all the form validation errors');
        return;
      }

      try {
        setResume(formValue.value);

        message.success('Resume Saved');

        navigateTo('/');
      } catch (error) {
        message.error('Something went wrong');
        throw createError('Failed to save resume settings');
      }
    });
  }
</script>
