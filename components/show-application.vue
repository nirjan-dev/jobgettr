<template>
  <div
    v-if="applications && applications.length > 0"
    class="py-6"
  >
    <div
      v-for="application in applications"
      :key="application.id"
      class="mb-4 rounded-lg bg-white px-6 py-8 shadow-sm"
    >
      <h2 class="mb-2">{{ application.company }}</h2>

      <p>
        <span>
          Applied on
          <span class="mr-2 font-semibold">{{
            new Date(application.dateApplied).toLocaleDateString()
          }}</span>
        </span>

        <a :href="application.applicationLink">{{
          application.applicationLink
        }}</a>
      </p>

      <div class="flex flex-col">
        <toggle-content name="Resume details">
          <show-resume-details :resume-details="application.resumeDetails" />
        </toggle-content>

        <template v-if="application.notes">
          <toggle-content name="notes">
            {{ application.notes }}
          </toggle-content>
        </template>
      </div>

      <div class="my-3">
        <n-dropdown
          trigger="click"
          :options="stageDropdownOptions"
          @select="(key) => (application.stage = key)"
        >
          <n-button type="info">Change Status</n-button>
        </n-dropdown>

        <n-button
          class="ml-2"
          type="error"
          :ghost="true"
          @click="
            () => {
              deleteApplication(application.id);
              message.success('Application deleted');
            }
          "
          >Delete</n-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { NButton, useMessage, NDropdown } from 'naive-ui';
  import { IApplication } from 'types/IApplication';
  import { useApplicationsStore } from '~/store/applicationStore';
  const message = useMessage();

  const { deleteApplication } = useApplicationsStore();

  defineProps({
    applications: {
      type: Array as PropType<IApplication[]>,
      required: true,
    },
  });

  const stageDropdownOptions: {
    label: string;
    key: IApplication['stage'];
  }[] = [
    {
      label: 'Applied',
      key: 'applied',
    },
    {
      key: 'interviewing',
      label: 'Interviewing',
    },
    {
      key: 'offer',
      label: 'Offer',
    },
    {
      key: 'rejected',
      label: 'Rejected',
    },
  ];
</script>
