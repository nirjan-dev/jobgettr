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
      <h3>Recommended skills for the job</h3>
      <ul>
        <li
          v-for="skill in props.recommendedSkills"
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

  const message = useMessage();
  const { addMulitpleItemsToLearningList: addMultipleItemsToLearningList } =
    useLearningListStore();
  const { resumePreview } = useResumePreviewStore();
  const { addSkillsToResume } = useResumeStore();

  const props = defineProps<{
    recommendedSkills: ISuggestedSkill[];
    openModel: boolean;
  }>();

  const showSuggestionsModel = ref(props.openModel);

  watch(props, function watchOpenModel(props) {
    showSuggestionsModel.value = props.openModel;
  });

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

  const emit = defineEmits(['close']);

  function onCloseModel() {
    emit('close');
  }

  function applySuggestions() {
    const skillsToEnable = props.recommendedSkills
      .filter(function filterEnabledSkills(skill) {
        return skill.action === ENABLE_ACTION;
      })
      .map(function getSkill(skill) {
        return skill.skill;
      });

    const skillsToAddToLearningList = props.recommendedSkills
      .filter(function getLearningListSkills(skill) {
        return skill.action === LEARNING_LIST_ACTION;
      })
      .map(function getSkill(skill) {
        return { skill: skill.skill };
      });

    const skillsToAddToResume = props.recommendedSkills
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

    message.success('Changes Applied');

    onCloseModel();
  }
</script>
