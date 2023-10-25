<template>
  <div class="mx-auto max-w-3xl p-3">
    <h2 class="mb-4 text-2xl font-bold">Resume Settings</h2>
    <n-form
      ref="formRef"
      :model="formValue"
    >
      <n-form-item
        label="Role"
        path="role"
        :rule="{
          required: true,
          message: 'Role is required',
          trigger: 'blur',
        }"
      >
        <n-input v-model:value="formValue.role"></n-input>
      </n-form-item>

      <n-form-item
        label="Skills"
        path="skills"
      >
        <n-dynamic-tags v-model:value="formValue.skills"></n-dynamic-tags>
      </n-form-item>

      <n-form-item label="Jobs">
        <n-dynamic-input
          v-model:value="formValue.jobs"
          :on-create="onCreateJob"
          #="{ index, value }"
        >
          <div class="my-2 w-full">
            <n-form-item
              label="Accomplishments"
              :path="`jobs.${index}.accomplishments`"
            >
              <n-dynamic-input
                v-model:value="value.accomplishments"
                :on-create="onCreateAccomplishments"
                #="{ index, value }"
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
                    :path="`jobs.${index}.accomplishments`"
                  >
                    <span class="mr-2"> {{ index + 1 }} </span>

                    <n-input
                      v-model:value="value.title"
                      type="textarea"
                    ></n-input>
                  </n-form-item>
                </div>
              </n-dynamic-input>
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
  } from 'naive-ui';
  import { useResumeStore } from '~/store/resumeStore';

  const formRef = ref<FormInst | null>(null);

  const { setResume, resume } = useResumeStore();

  const formValue = ref(resume);

  const message = useMessage();

  function onCreateJob() {
    return {
      accomplishments: [
        {
          title: '',
        },
      ],
    };
  }

  function onCreateAccomplishments() {
    return {
      title: '',
    };
  }

  function isAccomplishmentCountLessThanMinCount() {
    const accomplishmentCountsPerJob = formValue.value.jobs.map(
      function getAccomplishmentLength(job) {
        return job.accomplishments.length;
      },
    );

    return accomplishmentCountsPerJob.some(function checkMinCount(count) {
      return count < 8;
    });
  }

  function onSubmit() {
    if (isAccomplishmentCountLessThanMinCount()) {
      message.error('All jobs must have the at least 8 accomplishments');
      return;
    }

    try {
      setResume(formValue.value);
      message.success('Resume Saved');
    } catch (error) {
      message.error('Something went wrong');
      throw createError('Failed to save resume settings');
    }
  }
</script>
