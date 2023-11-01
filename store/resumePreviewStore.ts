import { defineStore, skipHydrate } from 'pinia';
import { IResumePreview } from 'types/IResumePreview';
import { storePrefix } from 'types/storePrefix';
import { useResumeStore } from '~/store/resumeStore';

const prefix: storePrefix = 'NK13_JOB_SEARCH_HELPER';

export const useResumePreviewStore = defineStore(
  `${prefix}_resumePreview`,
  // eslint-disable-next-line max-lines-per-function
  function getResumePreviewStore() {
    const { resume } = useResumeStore();

    const resumePreview: Ref<IResumePreview> = ref({
      ...resume,
      skills: resume.skills.map(function getSkills(skill) {
        return {
          title: skill,
          enabled: true,
        };
      }),
      jobs: resume.jobs.map(function getJobs(job) {
        return {
          ...job,
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

    function getEnabledAccomplishmentsFromJob(job: {
      accomplishments: { enabled: boolean; title: string }[];
    }) {
      return job.accomplishments.filter(function getEnabled(accomplishment) {
        return accomplishment.enabled;
      });
    }

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
      getEnabledAccomplishmentsFromJob,
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
