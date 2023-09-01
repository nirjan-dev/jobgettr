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
        <n-grid class="mb-2" :cols="1">
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

      <div class="hidden" id="resumeDetails">
        <h4>Skills Enabled:</h4>

        <ul>
          <li v-for="skill in enabledSkills" :key="skill">{{ skill }}</li>
        </ul>

        <br />

        <h4>Role: {{ resumePreview.role }}</h4>

        <br />

        <h4>Job 1 accomplishments:</h4>
        <ul>
          <li
            v-for="accomplishment in enabledFirstJobAccomplishments"
            :key="accomplishment"
          >
            {{ accomplishment }}
          </li>
        </ul>

        <h4>Job 2 accomplishments:</h4>
        <ul>
          <li
            v-for="accomplishment in enabledSecondJobAccomplishments"
            :key="accomplishment"
          >
            {{ accomplishment }}
          </li>
        </ul>
      </div>

      <div>
        <n-button @click="generateResume">Print Resume</n-button>
      </div>
    </n-form>

    <textarea class="sr-only" id="copyTextArea"></textarea>
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

const enabledSkills = computed(() => {
  return resumePreview.skills
    .filter((skill) => skill.enabled)
    .map((skills) => skills.title);
});

const enabledFirstJobAccomplishments = computed(() => {
  return resumePreview.jobs[0].accomplishments
    .filter((accomplishment) => accomplishment.enabled)
    .map((accomplishment) => accomplishment.title);
});

const enabledSecondJobAccomplishments = computed(() => {
  return resumePreview.jobs[1].accomplishments
    .filter((accomplishment) => accomplishment.enabled)
    .map((accomplishment) => accomplishment.title);
});

function generateResume() {
  if (window) {
    window.print();

    let copyText = document.getElementById("resumeDetails");
    let copyTextArea = document.getElementById(
      "copyTextArea"
    ) as HTMLTextAreaElement;

    if (copyText && copyTextArea) {
      copyTextArea.value = copyText.innerHTML;
    }

    copyTextArea.select();

    document.execCommand("copy");
  }
}

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
