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

    const enabledFirstJobAccomplishments = computed(
      function computedEnabledFirstJobAccomplishments() {
        return resumePreview.value.jobs?.[0]?.accomplishments
          .filter(getEnabledAccomplishments)
          .map(getAccomplishmentTitle);
      },
    );

    const enabledSecondJobAccomplishments = computed(
      function computedEnabledSecondJobAccomplishments() {
        return resumePreview.value.jobs?.[1]?.accomplishments
          .filter(getEnabledAccomplishments)
          .map(getAccomplishmentTitle);
      },
    );

    const enabledSkills = computed(function computedEnabledSKills() {
      return resumePreview.value.skills
        ?.filter(function getEnabled(s) {
          return s.enabled;
        })
        .map(function getSkillTitle(skill) {
          return skill.title;
        });
    });

    function setResumePreview(updatedResume: IResumePreview) {
      (resumePreview.value as unknown as IResumePreview) = updatedResume;
    }

    return {
      resumePreview: skipHydrate(resumePreview),
      setResumePreview,
      enabledFirstJobAccomplishments,
      enabledSecondJobAccomplishments,
      enabledSkills,
    };
  },
);

function getEnabledAccomplishments(accomplishment: {
  title: string;
  enabled: boolean;
}) {
  return accomplishment.enabled;
}
function getAccomplishmentTitle(accomplishment: {
  title: string;
  enabled: boolean;
}) {
  return accomplishment.title;
}
