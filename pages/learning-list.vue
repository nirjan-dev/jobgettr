<template>
  <div>
    <ul v-if="learningList && learningList.length > 0">
      <li
        v-for="listItem in learningList"
        :key="listItem.skill"
      >
        {{ listItem.skill }} - {{ listItem.jobs }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { useLearningListStore } from '~/store/learningListStore.ts';

  const { learningList } = useLearningListStore();
</script>
