import { defineStore, skipHydrate } from 'pinia';
import { IResumePreview } from 'types/IResumePreview';
import { useResumeStore } from '~/store/resumeStore';

export const useResumePreviewStore = defineStore(
  'resumePreview',
  function getResumePreviewStore() {
    const { resume } = useResumeStore();

    const resumePreview: Ref<IResumePreview> = ref({
      role: resume.role,
      skills: resume.skills.map(function getSkills(skill) {
        return {
          title: skill,
          enabled: true,
        };
      }),
      jobs: resume.jobs.map(function getJObs(job) {
        return {
          accomplishments: job.accomplishments.map(
            function getAccomplishments(accomplishment) {
              return {
                title: accomplishment.title,
                enabled: true,
              };
            },
          ),
        };
      }),
    });

    //   const resumePreview = ref(null);

    function setResumePreview(updatedResume: IResumePreview) {
      (resumePreview.value as unknown as IResumePreview) = updatedResume;
    }

    return {
      resumePreview: skipHydrate(resumePreview),
      setResumePreview,
    };
  },
);
