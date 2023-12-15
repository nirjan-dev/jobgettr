<template>
  <div class="mx-auto max-w-3xl p-3">
    <h1 class="mb-12">Skills to learn</h1>
    <ul v-if="sortedLearningList && sortedLearningList.length > 0">
      <li
        v-for="listItem in sortedLearningList"
        :key="listItem.skill"
      >
        <NCard class="my-4">
          <div class="flex flex-wrap items-center justify-between">
            <p class="text-lg">
              <span class="font-bold">{{ listItem.skill }}</span> mentioned in
              <span class="font-bold">{{ listItem.jobs }}</span> jobs
            </p>

            <div class="flex flex-wrap gap-2">
              <NButton
                size="small"
                type="success"
                @click="addListItemAsSkill(listItem)"
                >Add to Resume</NButton
              >
              <NButton
                type="error"
                size="small"
                @click="
                  deleteItemFromLearningList(listItem);
                  message.success(
                    `Deleted ${listItem.skill} from learning list`,
                  );
                "
                >Delete</NButton
              >
            </div>
          </div>
        </NCard>
      </li>
    </ul>
    <p
      v-else
      class="py-4 text-lg"
    >
      No Skills added to the learning list yet
    </p>
  </div>
</template>

<script setup lang="ts">
  import { NCard, NButton, useMessage } from 'naive-ui';
  import { storeToRefs } from 'pinia';
  import { useResumeStore } from '~/store/resumeStore';
  import { useLearningListStore } from '~/store/learningListStore.ts';

  definePageMeta({
    middleware: ['protected'],
  });

  const { addSkillsToResume } = useResumeStore();
  const { sortedLearningList } = storeToRefs(useLearningListStore());
  const { deleteItemFromLearningList } = useLearningListStore();
  const message = useMessage();

  function addListItemAsSkill(listItem: { skill: string; jobs: number }) {
    addSkillsToResume([listItem.skill]);
    deleteItemFromLearningList(listItem);

    message.success(`Added ${listItem.skill} to resume`);
  }
</script>
