import { defineStore, skipHydrate } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { IResume } from 'types/IResume';
import { storePrefix } from 'types/storePrefix';
import { getDefaultResume } from '~/utils/getDefaultResume';
const prefix: storePrefix = 'NK13_JOB_SEARCH_HELPER';

export const useResumeStore = defineStore('resume', function getResumeStore() {
  const resume: Ref<IResume> = useLocalStorage(
    `${prefix}_resume`,
    getDefaultResume(),
  );

  function setResume(updatedResume: IResume) {
    (resume.value as IResume) = updatedResume;
  }

  function addSkillsToResume(skills: string[]) {
    if (resume.value) {
      resume.value.skills = [...resume.value.skills, ...skills];
    }
  }

  return {
    resume: skipHydrate(resume),
    setResume,
    addSkillsToResume,
  };
});
