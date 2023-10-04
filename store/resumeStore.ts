import { defineStore, skipHydrate } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

interface IResume {
  skills: string[];
  jobs: {
    accomplishments: {
      title: string;
    }[];
  }[];
  role: string;
}

export const useResumeStore = defineStore('resume', () => {
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

  const setResume = (updatedResume: IResume) => {
    (resume.value as IResume) = updatedResume;
  };

  return {
    resume: skipHydrate(resume),
    setResume,
  };
});
