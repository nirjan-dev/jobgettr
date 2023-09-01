import { defineStore, skipHydrate } from "pinia";
import { useLocalStorage } from "@vueuse/core";

interface IResume {
  skills: string[];
  jobs: {
    accomplishments: {
      title: string;
    }[];
  }[];
  role: string;
}

export const useResumeStore = defineStore("resume", () => {
  const resume = useLocalStorage("pinia/resume/resume", {
    skills: [],
    jobs: [
      {
        accomplishments: [
          {
            title: "",
          },
        ],
      },
    ],
    role: "",
  });

  const setResume = (updatedResume: IResume) => {
    console.log("setResume", updatedResume);
    (resume.value as IResume) = updatedResume;
    console.log("resume", resume.value);
  };

  return {
    resume: skipHydrate(resume),
    setResume,
  };
});
