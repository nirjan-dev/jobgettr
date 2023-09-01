import { defineStore, skipHydrate } from "pinia";
import { useLocalStorage } from "@vueuse/core";

interface IApplication {
  resumeDetails: string;
  company: string;
  applicationLink: string;
  stage: string;
  notes: string;
  dateApplied: string;
}

export const useApplicationsStore = defineStore("application", () => {
  const applications: Ref<IApplication[]> = useLocalStorage(
    "pinia/application/applications",
    []
  );

  const addApplication = (newApplication: IApplication) => {
    applications.value.push(newApplication);
  };

  const deleteApplication = (applicationLink: string) => {
    const index = applications.value.findIndex(
      (application) => application.applicationLink === applicationLink
    );
    applications.value.splice(index, 1);
  };

  return {
    applications: skipHydrate(applications),
    addApplication,
    deleteApplication,
  };
});
