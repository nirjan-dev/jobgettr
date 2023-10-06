<template>
  <div class="mx-auto max-w-3xl p-3 print:hidden">
    <h2 class="mb-4 text-2xl font-bold">Resume Preview Settings</h2>

    <div class="mb-4">
      <n-form
        ref="jobAppplicationFormRef"
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
        >
          <n-input
            v-model:value="jobApplicationFormValue.applicationLink"
          ></n-input>
        </n-form-item>

        <n-form-item
          label="Job Description"
          path="jobDescription"
        >
          <n-input
            v-model:value="jobApplicationFormValue.jobDescription"
            type="textarea"
          ></n-input>
        </n-form-item>

        <n-button
          class="mb-3"
          role="button"
          type="info"
          :loading="isLoadingSuggestions"
          @click="getResumeSuggestions"
        >
          Get Resume Suggestions</n-button
        >

        <n-form-item
          label="Notes"
          path="notes"
        >
          <n-input
            v-model:value="jobApplicationFormValue.notes"
            type="textarea"
          ></n-input>
        </n-form-item>
      </n-form>

      <n-button @click="applyForJob">Apply for the Job</n-button>
    </div>

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

      <div
        id="resumeDetails"
        class="hidden"
      >
        <h4>Skills Enabled:</h4>

        <ul>
          <li
            v-for="skill in enabledSkills"
            :key="skill"
          >
            {{ skill }}
          </li>
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

    <n-modal v-model:show="showSuggestionsModel">
      <NCard
        title="Suggested changes"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        class="max-w-5xl"
      >
        <h3>Recommended skills for the job</h3>
        <ul>
          <li
            v-for="skill in recommendedSkills"
            :key="skill.skill"
            class="mb-2 grid grid-cols-5 gap-2"
          >
            <div class="w-64">{{ skill.skill }}</div>
            <n-select
              v-model:value="skill.action"
              :options="suggestedSkillActions"
            />
          </li>
        </ul>

        <NButton
          type="success"
          class="mr-2"
          @click="applySuggestions"
          >Apply Changes</NButton
        >
        <NButton
          type="tertiary"
          @click="showSuggestionsModel = false"
          >Cancel</NButton
        >
      </NCard>
    </n-modal>
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
    NModal,
    NCard,
    NSelect,
  } from 'naive-ui';
  import { useLearningListStore } from '~/store/learningListStore.ts';
  import { useApplicationsStore } from '~/store/applicationStore';
  import { useResumePreviewStore } from '~/store/resumePreviewStore';

  const formRef = ref<FormInst | null>(null);
  const jobAppplicationFormRef = ref<FormInst | null>(null);

  const { resumePreview } = useResumePreviewStore();
  const { addApplication } = useApplicationsStore();
  const { addMulitpleItemsToLearningList: addMultipleItemsToLearningList } =
    useLearningListStore();
  const isLoadingSuggestions = ref(false);
  const formValue = ref(resumePreview);
  const showSuggestionsModel = ref(false);
  const LEARNING_LIST_ACTION = 'add to learning list';
  const ENABLE_ACTION = 'enable';
  const IGNORE_ACTION = 'ignore';
  const jobApplicationFormValue = ref({
    company: '',
    resumeDetails: '',
    applicationLink: '',
    stage: 'applied',
    notes: '',
    dateApplied: '',
    jobDescription: '',
  });

  interface ISuggestedSkill {
    skill: string;
    action:
      | typeof ENABLE_ACTION
      | typeof LEARNING_LIST_ACTION
      | typeof IGNORE_ACTION;
  }

  const suggestedSkillActions: {
    label: ISuggestedSkill['action'];
    value: ISuggestedSkill['action'];
  }[] = [
    {
      label: ENABLE_ACTION,
      value: ENABLE_ACTION,
    },
    {
      label: LEARNING_LIST_ACTION,
      value: LEARNING_LIST_ACTION,
    },
    {
      label: IGNORE_ACTION,
      value: IGNORE_ACTION,
    },
  ];
  const recommendedSkills = ref<ISuggestedSkill[]>([]);

  const message = useMessage();

  const enabledSkills = computed(function computedEnabledSkills() {
    return resumePreview.skills
      .filter(function getEnabledSkills(skill) {
        return skill.enabled;
      })
      .map(function getTitle(skills) {
        return skills.title;
      });
  });

  function getEnabledAccomplishments(accomplishment: {
    title: string;
    enabled: boolean;
  }) {
    return accomplishment.enabled;
  }
  function getAccomplishmentTitle(accomplishment: {
    title: string;
    enabled: boolean;
  }) {
    return accomplishment.title;
  }

  const enabledFirstJobAccomplishments = computed(
    function computedEnabledFirstJobAccomplishments() {
      return resumePreview?.jobs[0]?.accomplishments
        .filter(getEnabledAccomplishments)
        .map(getAccomplishmentTitle);
    },
  );

  const enabledSecondJobAccomplishments = computed(
    function computedEnabledSecondJobAccomplishments() {
      return resumePreview?.jobs[1]?.accomplishments
        .filter(getEnabledAccomplishments)
        .map(getAccomplishmentTitle);
    },
  );

  function applyForJob() {
    if (window) {
      window.print();

      const resumeDetailsElement = document.getElementById('resumeDetails');

      if (resumeDetailsElement) {
        jobApplicationFormValue.value.resumeDetails =
          resumeDetailsElement.innerHTML;
      }

      jobApplicationFormValue.value.dateApplied = new Date().toISOString();

      addApplication(jobApplicationFormValue.value);

      message.success('Job Application Saved');
    }
  }

  async function getResumeSuggestions() {
    const jobDescription = jobApplicationFormValue.value.jobDescription;
    const skills = formValue.value.skills.map(function getSkillTitle(skill) {
      return skill.title;
    });

    if (!jobDescription) {
      message.error('Please enter a job description');
    }

    if (!skills || skills.length === 0) {
      message.error('Please add at least one skill');
    }

    isLoadingSuggestions.value = true;

    const { data } = await useFetch('/api/resume-suggestions', {
      method: 'POST',
      body: {
        jobDescription,
        skills,
      },
    });

    if (!data) {
      message.error('No suggestions found');
    }

    isLoadingSuggestions.value = false;

    recommendedSkills.value =
      data.value?.suggestedSkillsToEnable.map(
        function getRecommendedSkills(skill) {
          return {
            skill,
            action: ENABLE_ACTION,
          };
        },
      ) ?? [];

    const additionalSkills: ISuggestedSkill[] =
      data.value?.additionalRecommendations.map(
        function getAdditionalSkills(skill) {
          return {
            skill,
            action: LEARNING_LIST_ACTION,
          };
        },
      ) ?? [];

    recommendedSkills.value = [...recommendedSkills.value, ...additionalSkills];

    showSuggestionsModel.value = true;
  }

  function applySuggestions() {
    const skillsToEnable = recommendedSkills.value
      .filter(function filterEnabledSkills(skill) {
        return skill.action === ENABLE_ACTION;
      })
      .map(function getSkill(skill) {
        return skill.skill;
      });

    const skillsToAddToLearingList = recommendedSkills.value
      .filter(function getLearningListSkills(skill) {
        return skill.action === LEARNING_LIST_ACTION;
      })
      .map(function getSkill(skill) {
        return { skill: skill.skill };
      });

    resumePreview.skills = resumePreview.skills.map(
      function updatePreviewSkills(skill) {
        if (skillsToEnable.includes(skill.title)) {
          skill.enabled = true;
        } else {
          skill.enabled = false;
        }
        return skill;
      },
    );

    addMultipleItemsToLearningList(skillsToAddToLearingList);

    showSuggestionsModel.value = false;

    message.success('Changes Applied');
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
