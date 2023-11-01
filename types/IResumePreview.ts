import { IResume } from 'types/IResume';

export interface IResumePreview extends Omit<IResume, 'skills' | 'jobs'> {
  skills: {
    title: string;
    enabled: boolean;
  }[];
  jobs: {
    role?: string;
    useMainRole: boolean;
    companyName: string;
    startDate: string;
    endDate: string;
    accomplishments: {
      title: string;
      enabled: boolean;
    }[];
  }[];
}
