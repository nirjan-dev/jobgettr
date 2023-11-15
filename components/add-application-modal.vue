<template>
  <n-modal v-model:show="showAddApplicationModel">
    <NCard
      title="Save a new job application"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      class="max-w-3xl"
    >
      <job-application-form
        @on-cancel="onCloseModel"
        @on-success="onCloseModel"
      />
    </NCard>
  </n-modal>
</template>

<script setup lang="ts">
  import { NModal, NCard } from 'naive-ui';

  const props = defineProps<{
    openModel: boolean;
  }>();

  const showAddApplicationModel = ref(props.openModel);

  watch(
    function getOpenModel() {
      return props.openModel;
    },
    function watchOpenModel(openModel) {
      showAddApplicationModel.value = openModel;
    },
  );

  const emit = defineEmits(['close']);

  function onCloseModel() {
    emit('close');
  }
</script>
