import { defineStore, skipHydrate } from 'pinia';
import { IResumePreview } from 'types/IResumePreview';
import { useResumeStore } from '~/store/resumeStore';

export const useResumePreviewStore = defineStore('resumePreview', () => {
  const { resume } = useResumeStore();

  const resumePreview: Ref<IResumePreview> = ref({
    role: resume.role,
    skills: resume.skills.map((skill) => {
      return {
        title: skill,
        enabled: true,
      };
    }),
    jobs: resume.jobs.map((job) => {
      return {
        accomplishments: job.accomplishments.map((accomplishment) => {
          return {
            title: accomplishment.title,
            enabled: true,
          };
        }),
      };
    }),
  });

  //   const resumePreview = ref(null);

  const setResumePreview = (updatedResume: IResumePreview) => {
    (resumePreview.value as unknown as IResumePreview) = updatedResume;
  };

  return {
    resumePreview: skipHydrate(resumePreview),
    setResumePreview,
  };
});
