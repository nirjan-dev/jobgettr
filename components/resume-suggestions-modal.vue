<template>
  <n-modal v-model:show="showSuggestionsModel">
    <NCard
      title="Suggested changes"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      class="max-w-5xl"
    >
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-4">
          <h3>Recommended skills for the job</h3>
          <ul>
            <li
              v-for="skill in props.suggestedSkills"
              :key="skill.skill"
              class="mb-4 grid grid-cols-6 gap-1"
            >
              <div class="col-span-6">{{ skill.skill }}</div>
              <n-select
                v-model:value="skill.action"
                class="col-span-6"
                :options="suggestedSkillActions"
              />
            </li>
          </ul>
        </div>
        <div class="col-span-8">
          <h3>Recommended accomplishments for the job</h3>
          <ul>
            <li
              v-for="accomplishment in props.suggestedAccomplishments"
              :key="accomplishment.accomplishment"
              class="mb-2 grid grid-cols-6 gap-2"
            >
              <div class="col-span-4">{{ accomplishment.accomplishment }}</div>
              <n-select
                v-model:value="accomplishment.action"
                class="col-span-2"
                :options="suggestedAccomplishmentActions"
              />
            </li>
          </ul>
        </div>
      </div>

      <NButton
        type="success"
        class="mr-2"
        @click="applySuggestions"
        >Apply Changes</NButton
      >
      <NButton
        type="tertiary"
        @click="onCloseModel"
        >Cancel</NButton
      >
    </NCard>
  </n-modal>
</template>

<script setup lang="ts">
  import { NButton, NModal, NCard, NSelect, useMessage } from 'naive-ui';
  import { useResumePreviewStore } from '~/store/resumePreviewStore';
  import { useLearningListStore } from '~/store/learningListStore.ts';
  import {
    ADD_TO_RESUME,
    ENABLE_ACTION,
    IGNORE_ACTION,
    ISuggestedSkill,
    LEARNING_LIST_ACTION,
  } from '~/types/ISuggestedSkill';
  import { useResumeStore } from '~/store/resumeStore';
  import { ISuggestedAccomplishment } from 'types/ISuggestedAccomplishment';

  const message = useMessage();
  const { addMultipleItemsToLearningList } = useLearningListStore();
  const { resumePreview } = useResumePreviewStore();
  const { addSkillsToResume } = useResumeStore();

  const props = defineProps<{
    suggestedSkills: ISuggestedSkill[];
    suggestedAccomplishments: ISuggestedAccomplishment[];
    openModel: boolean;
  }>();

  const showSuggestionsModel = ref(props.openModel);

  watch(
    function getOpenModel() {
      return props.openModel;
    },
    function watchOpenModel(openModel) {
      showSuggestionsModel.value = openModel;
    },
  );

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
    {
      label: ADD_TO_RESUME,
      value: ADD_TO_RESUME,
    },
  ];

  const suggestedAccomplishmentActions: {
    label: ISuggestedAccomplishment['action'];
    value: ISuggestedAccomplishment['action'];
  }[] = [
    {
      label: ENABLE_ACTION,
      value: ENABLE_ACTION,
    },
    {
      label: IGNORE_ACTION,
      value: IGNORE_ACTION,
    },
  ];

  const emit = defineEmits(['close']);

  function onCloseModel() {
    emit('close');
  }

  function applySuggestions() {
    const skillsToEnable = props.suggestedSkills
      .filter(function filterEnabledSkills(skill) {
        return skill.action === ENABLE_ACTION;
      })
      .map(function getSkill(skill) {
        return skill.skill;
      });

    const skillsToAddToLearningList = props.suggestedSkills
      .filter(function getLearningListSkills(skill) {
        return skill.action === LEARNING_LIST_ACTION;
      })
      .map(function getSkill(skill) {
        return { skill: skill.skill };
      });

    const skillsToAddToResume = props.suggestedSkills
      .filter(function getResumeSkills(skill) {
        return skill.action === ADD_TO_RESUME;
      })
      .map(function getSkill(skill) {
        return skill.skill;
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

    addSkillsToResume(skillsToAddToResume);

    addMultipleItemsToLearningList(skillsToAddToLearningList);

    const accomplishmentsToEnable = props.suggestedAccomplishments
      .filter(function filterEnabledAccomplishments(accomplishment) {
        return accomplishment.action === ENABLE_ACTION;
      })
      .map(function getAccomplishment(accomplishment) {
        return accomplishment.accomplishment;
      });

    resumePreview.jobs.forEach(function updatePreviewJobs(job) {
      job.accomplishments = job.accomplishments.map(
        function updatePreviewAccomplishments(accomplishment) {
          if (accomplishmentsToEnable.includes(accomplishment.title)) {
            accomplishment.enabled = true;
          } else {
            accomplishment.enabled = false;
          }
          return accomplishment;
        },
      );
    });

    message.success('Changes Applied');

    onCloseModel();
  }
</script>
