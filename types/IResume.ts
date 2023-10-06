export interface IResume {
  skills: string[];
  jobs: {
    accomplishments: {
      title: string;
    }[];
  }[];
  role: string;
}
