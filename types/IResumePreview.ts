export interface IResumePreview {
  skills: {
    title: string;
    enabled: boolean;
  }[];
  jobs: {
    accomplishments: {
      title: string;
      enabled: boolean;
    }[];
  }[];
  role: string;
}
