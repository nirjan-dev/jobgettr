import { defineStore, skipHydrate } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { IApplication, IApplicationWithoutID } from 'types/IApplication';
import { storePrefix } from 'types/storePrefix';

const prefix: storePrefix = 'NK13_JOB_SEARCH_HELPER';

export const useApplicationsStore = defineStore(
  'application',
  function applicationStore() {
    const applications: Ref<IApplication[]> = useLocalStorage(
      `${prefix}_applications`,
      [],
    );

    function addApplication(newApplication: IApplicationWithoutID) {
      applications.value.push({
        ...newApplication,
        id: crypto.randomUUID(),
      });
    }

    function deleteApplication(id: string) {
      const index = applications.value.findIndex(
        function getMatchByLink(application) {
          return application.id === id;
        },
      );
      applications.value.splice(index, 1);
    }

    return {
      applications: skipHydrate(applications),
      addApplication,
      deleteApplication,
    };
  },
);
