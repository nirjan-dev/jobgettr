export interface IResume {
  name: string;
  phoneNumber?: string;
  email?: string;
  location?: string;
  links?: { title: string; link: string }[];
  summary: string;
  projects?: {
    title: string;
    description: string;
    link?: string;
  }[];
  skills: string[];
  jobs: {
    role?: string;
    useMainRole: boolean;
    companyName: string;
    startDate: string;
    endDate: string;
    accomplishments: {
      title: string;
    }[];
  }[];
  role: string;
}
