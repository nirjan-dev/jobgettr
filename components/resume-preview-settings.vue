<template>
  <div class="p-3 max-w-3xl mx-auto print:hidden">
    <h2 class="text-2xl font-bold mb-4">Resume Preview Settings</h2>
    <n-form ref="formRef" :model="formValue">
      <n-form-item label="Role" path="role">
        <n-input v-model:value="formValue.role"></n-input>
      </n-form-item>

      <n-form-item label="Skills" path="skills">
        <n-grid :y-gap="8" :x-gap="4" :cols="1">
          <n-gi>
            <n-checkbox
              :key="skill.title"
              v-for="skill in formValue.skills"
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
        <n-grid class="mb-6" :cols="1">
          <n-gi>
            <n-checkbox
              class="mb-2"
              :key="accomplishment.title"
              v-for="accomplishment in job.accomplishments"
              v-model:checked="accomplishment.enabled"
              :value="accomplishment.title"
            >
              {{ accomplishment.title }}
            </n-checkbox>
          </n-gi>
        </n-grid>
      </n-form-item>

      <!-- <n-form-item>
        <n-button type="success" @click="onSubmit"> Save </n-button>
      </n-form-item> -->
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
  NCheckbox,
  useMessage,
  NCheckboxGroup,
  NGrid,
  NGi,
} from "naive-ui";
import { useResumePreviewStore } from "~/store/resumePreviewStore";

const formRef = ref<FormInst | null>(null);

const { resumePreview } = useResumePreviewStore();

const formValue = ref(resumePreview);

const message = useMessage();

const onCreateJob = () => {
  return {
    accomplishments: [
      {
        title: "",
      },
    ],
  };
};

const onCreateAccomplishments = () => {
  return {
    title: "",
  };
};

// const onSubmit = () => {
//   try {
//     setResumePreview(formValue.value);
//     message.success("Resume Saved");
//   } catch (error) {
//     message.error("Something went wrong");
//     console.log({ error });
//   }
// };
</script>

<style scoped></style>
