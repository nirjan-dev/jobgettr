<template>
  <div class="mx-auto max-w-3xl p-3 px-4">
    <h1 class="mb-8">Job Application History</h1>

    <div
      v-if="applications && applications.length > 0"
      class="py-6"
    >
      <div v-if="appliedApplications.length > 0">
        <h2 class="text-2xl opacity-75">Applied</h2>
        <show-application :applications="appliedApplications" />
      </div>

      <div v-if="interviewingApplications.length > 0">
        <h2 class="text-2xl opacity-75">Interviewing</h2>
        <show-application :applications="interviewingApplications" />
      </div>

      <div v-if="offerApplications.length > 0">
        <h2 class="text-2xl opacity-75">Offers</h2>
        <show-application :applications="offerApplications" />
      </div>

      <div v-if="rejectedApplications.length > 0">
        <h2 class="text-2xl opacity-75">Rejected</h2>
        <show-application :applications="rejectedApplications" />
      </div>
    </div>

    <p
      v-else
      class="py-4 text-lg"
    >
      No Applications saved yet
    </p>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useApplicationsStore } from '~/store/applicationStore';

  definePageMeta({
    middleware: ['protected'],
  });

  const { applications } = storeToRefs(useApplicationsStore());

  const appliedApplications = computed(function getAppliedApplications() {
    return applications.value.filter(function checkIfApplied(application) {
      return application.stage === 'applied';
    });
  });

  const interviewingApplications = computed(
    function getInterviewingApplications() {
      return applications.value.filter(
        function checkIfInterviewing(application) {
          return application.stage === 'interviewing';
        },
      );
    },
  );

  const offerApplications = computed(function getOfferApplications() {
    return applications.value.filter(function checkIfOffer(application) {
      return application.stage === 'offer';
    });
  });

  const rejectedApplications = computed(function getRejectedApplications() {
    return applications.value.filter(function checkIfRejected(application) {
      return application.stage === 'rejected';
    });
  });
</script>
