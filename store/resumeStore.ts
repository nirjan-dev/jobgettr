import { defineStore, skipHydrate } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { IResume } from 'types/IResume';

export const useResumeStore = defineStore('resume', function getResumeStore() {
  const resume = useLocalStorage('pinia/resume/resume', {
    skills: [],
    jobs: [
      {
        accomplishments: [
          {
            title: '',
          },
        ],
      },
    ],
    role: '',
  });

  function setResume(updatedResume: IResume) {
    (resume.value as IResume) = updatedResume;
  }

  return {
    resume: skipHydrate(resume),
    setResume,
  };
});
