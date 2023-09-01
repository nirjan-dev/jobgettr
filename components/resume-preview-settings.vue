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
    </n-form>

    <div>
      <n-form ref="jobAppplicationFormRef" :model="jobApplicationFormValue">
        <n-form-item label="Company" path="company">
          <n-input v-model:value="jobApplicationFormValue.company"></n-input>
        </n-form-item>

        <n-form-item label="link" path="applicationLink">
          <n-input
            v-model:value="jobApplicationFormValue.applicationLink"
          ></n-input>
        </n-form-item>

        <n-form-item label="Notes" path="notes">
          <n-input
            type="textarea"
            v-model:value="jobApplicationFormValue.notes"
          ></n-input>
        </n-form-item>
      </n-form>

      <n-button @click="applyForJob">Apply for the Job</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  FormInst,
  NForm,
  NFormItem,
  NInput,
  NButton,
  NCheckbox,
  useMessage,
  NGrid,
  NGi,
} from "naive-ui";
import { useApplicationsStore } from "~/store/applicationStore";
import { useResumePreviewStore } from "~/store/resumePreviewStore";

const formRef = ref<FormInst | null>(null);
const jobAppplicationFormRef = ref<FormInst | null>(null);

const { resumePreview } = useResumePreviewStore();
const { addApplication } = useApplicationsStore();
const formValue = ref(resumePreview);
const jobApplicationFormValue = ref({
  company: "",
  resumeDetails: "",
  applicationLink: "",
  stage: "applied",
  notes: "",
  dateApplied: "",
});

const message = useMessage();

const enabledSkills = computed(() => {
  return resumePreview.skills
    .filter((skill) => skill.enabled)
    .map((skills) => skills.title);
});

const enabledFirstJobAccomplishments = computed(() => {
  return resumePreview?.jobs[0]?.accomplishments
    .filter((accomplishment) => accomplishment.enabled)
    .map((accomplishment) => accomplishment.title);
});

const enabledSecondJobAccomplishments = computed(() => {
  return resumePreview?.jobs[1]?.accomplishments
    .filter((accomplishment) => accomplishment.enabled)
    .map((accomplishment) => accomplishment.title);
});

function applyForJob() {
  if (window) {
    window.print();

    let resumeDetailsElement = document.getElementById("resumeDetails");

    if (resumeDetailsElement) {
      jobApplicationFormValue.value.resumeDetails =
        resumeDetailsElement.innerHTML;
    }

    jobApplicationFormValue.value.dateApplied = new Date().toISOString();

    addApplication(jobApplicationFormValue.value);

    message.success("Job Application Saved");
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
