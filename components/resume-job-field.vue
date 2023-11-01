<template>
  <n-form-item
    label="Jobs"
    path="jobs"
  >
    <n-dynamic-input
      :value="formValue.jobs"
      :on-create="onCreateJob"
      #="{ index: jobIndex, value: job }"
      @update-value="$emit('update:formValue', $event)"
    >
      <div class="w-full">
        <n-form-item
          label="Company Name"
          :path="`jobs.${jobIndex}.companyName`"
          :rule="{
            required: true,
          }"
        >
          <n-input v-model:value="job.companyName"></n-input>
        </n-form-item>
        <n-form-item
          label="Use Main Role Instead?"
          :path="`jobs.${jobIndex}.useMainRole`"
        >
          <n-switch v-model:value="job.useMainRole"></n-switch>
        </n-form-item>
        <n-form-item
          v-if="!job.useMainRole"
          label="Role"
          :path="`jobs.${jobIndex}.role`"
        >
          <n-input v-model:value="job.role"></n-input>
        </n-form-item>
        <n-form-item
          label="Start Date"
          :path="`jobs.${jobIndex}.startDate`"
          :rule="{
            required: true,
          }"
        >
          <n-input v-model:value="job.startDate"></n-input>
        </n-form-item>
        <n-form-item
          label="End Date"
          :path="`jobs.${jobIndex}.endDate`"
          :rule="{
            required: true,
          }"
        >
          <n-input v-model:value="job.endDate"></n-input>
        </n-form-item>

        <NButton
          class="my-2 mt-4"
          @click="
            showModal = true;
            jobToUpdate = job;
          "
        >
          Paste-in Accomplishments
        </NButton>

        <div class="my-2 w-full">
          <n-form-item
            label="Accomplishments"
            :path="`jobs.${jobIndex}.accomplishments`"
            :rule="{
              required: true,
            }"
            class="flex flex-col"
          >
            <n-dynamic-input
              v-model:value="job.accomplishments"
              :on-create="onCreateAccomplishments"
              #="{ index: accomplishmentIndex, value }"
            >
              <div class="w-full">
                <n-form-item
                  :rule="{
                    required: true,
                    validator: (rule, value) => {
                      return value.length <= 200;
                    },
                    message:
                      'Accomplishment cannot exceed 200 characters. Keep your accomplishments concise for a better resume.',
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
    <NModal
      v-model:show="showModal"
      size="small"
    >
      <NCard
        class="max-w-3xl"
        title="Paste-in Accomplishments"
        size="small"
        role="dialog"
        aria-modal="true"
      >
        <p>Paste accomplishments separated by a new line</p>
        <NInput
          v-model:value="accomplishmentsText"
          type="textarea"
          class="w-full"
          rows="10"
        ></NInput>
        <NButton
          class="mr-4 mt-4"
          type="success"
          @click="() => addAccomplishments()"
        >
          Add Accomplishments
        </NButton>
        <NButton
          type="tertiary"
          class="mt-4"
          @click="showModal = false"
        >
          Cancel
        </NButton>
      </NCard>
    </NModal>
  </n-form-item>
</template>

<script setup lang="ts">
  import {
    NButton,
    NDynamicInput,
    NFormItem,
    NInput,
    NModal,
    NSwitch,
    NCard,
  } from 'naive-ui';
  import { IResume } from 'types/IResume';

  defineProps<{
    formValue: IResume;
  }>();
  defineEmits(['update:formValue']);
  const showModal = ref(false);
  const accomplishmentsText = ref('');
  const jobToUpdate = ref<IResume['jobs'][0] | null>(null);

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

  function onCreateAccomplishments() {
    return {
      title: '',
    };
  }

  function addAccomplishments() {
    const lines = accomplishmentsText.value.split('\n');
    const accomplishments = lines.map(function getAccomplishmentFromLine(line) {
      return {
        title: line.replace('•', '').replace('-', '').trim(),
      };
    });

    accomplishmentsText.value = '';

    showModal.value = false;

    if (!jobToUpdate.value) {
      return;
    }

    const currentAccomplishments = jobToUpdate.value.accomplishments;

    currentAccomplishments.push(...accomplishments);

    jobToUpdate.value = null;
  }
</script>
