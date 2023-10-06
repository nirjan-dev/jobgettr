import { defineStore, skipHydrate } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { IApplication } from 'types/IApplication';

export const useApplicationsStore = defineStore(
  'application',
  function applicationStore() {
    const applications: Ref<IApplication[]> = useLocalStorage(
      'pinia/application/applications',
      [],
    );

    function addApplication(newApplication: IApplication) {
      applications.value.push(newApplication);
    }

    function deleteApplication(applicationLink: string) {
      const index = applications.value.findIndex(
        function getMatchByLink(application) {
          return application.applicationLink === applicationLink;
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
