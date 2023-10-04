<template>
  <div class="p-3 max-w-3xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Resume Settings</h2>
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
                  <n-form-item :path="`jobs.${index}.accomplishments`">
                    <n-input v-model:value="value.title"></n-input>
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

  const onCreateJob = () => {
    return {
      accomplishments: [
        {
          title: '',
        },
      ],
    };
  };

  const onCreateAccomplishments = () => {
    return {
      title: '',
    };
  };

  const onSubmit = () => {
    try {
      setResume(formValue.value);
      message.success('Resume Saved');
    } catch (error) {
      message.error('Something went wrong');
      throw createError('Failed to save resume settings');
    }
  };
</script>
