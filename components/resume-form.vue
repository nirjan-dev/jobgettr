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

      <n-form-item
        label="Jobs"
        path="jobs"
      >
        <n-dynamic-input
          v-model:value="formValue.jobs"
          :on-create="onCreateJob"
          #="{ index: jobIndex, value }"
        >
          <div class="w-full">
            <n-form-item
              label="Company Name"
              :path="`jobs.${jobIndex}.companyName`"
            >
              <n-input v-model:value="value.companyName"></n-input>
            </n-form-item>
            <n-form-item
              label="Use Main Role Instead?"
              :path="`jobs.${jobIndex}.useMainRole`"
            >
              <n-switch v-model:value="value.useMainRole"></n-switch>
            </n-form-item>
            <n-form-item
              v-if="!value.useMainRole"
              label="Role"
              :path="`jobs.${jobIndex}.role`"
            >
              <n-input v-model:value="value.role"></n-input>
            </n-form-item>
            <n-form-item
              label="Start Date"
              :path="`jobs.${jobIndex}.startDate`"
            >
              <n-input v-model:value="value.startDate"></n-input>
            </n-form-item>
            <n-form-item
              label="End Date"
              :path="`jobs.${jobIndex}.endDate`"
            >
              <n-input v-model:value="value.endDate"></n-input>
            </n-form-item>

            <div class="my-2 w-full">
              <n-form-item
                label="Accomplishments"
                :path="`jobs.${jobIndex}.accomplishments`"
              >
                <n-dynamic-input
                  v-model:value="value.accomplishments"
                  :on-create="onCreateAccomplishments"
                  #="{ index: accomplishmentIndex, value }"
                >
                  <div class="w-full">
                    <n-form-item
                      :rule="{
                        required: true,
                        validator: (rule, value) => {
                          return value.length <= 100;
                        },
                        message:
                          'Accomplishment cannot exceed 100 characters. Keep your accomplishments concise for a better resume.',
                        trigger: ['input', 'blur'],
                      }"
                      :path="`jobs[${jobIndex}].accomplishments[${accomplishmentIndex}].title`"
                    >
                      <span class="mr-2"> {{ accomplishmentIndex + 1 }} </span>
                      <n-input
                        v-model:value="value.title"
                        type="textarea"
                      ></n-input>
                    </n-form-item>
                  </div>
                </n-dynamic-input>
              </n-form-item>
            </div>
          </div>
        </n-dynamic-input>
      </n-form-item>

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
    NSwitch,
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

  function onCreateJob() {
    return {
      companyName: '',
      role: '',
      startDate: '',
      endDate: '',
      useMainRole: false,
      accomplishments: [
        {
          title: '',
        },
      ],
    };
  }

  function onCreateProject() {
    return {
      title: '',
      description: '',
      link: '',
    };
  }

  function onCreateAccomplishments() {
    return {
      title: '',
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
      } catch (error) {
        message.error('Something went wrong');
        throw createError('Failed to save resume settings');
      }
    });
  }
</script>
