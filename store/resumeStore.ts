import { defineStore, skipHydrate } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { IResume } from 'types/IResume';

export const useResumeStore = defineStore('resume', function getResumeStore() {
  const resume: Ref<IResume> = useLocalStorage('pinia/resume/resume', {
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

  function addSkillsToResume(skills: string[]) {
    resume.value.skills = [...resume.value.skills, ...skills];
  }

  return {
    resume: skipHydrate(resume),
    setResume,
    addSkillsToResume,
  };
});
