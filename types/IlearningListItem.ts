import { IlearningListItem } from 'types/IlearningListItem';

export interface IlearningListItem {
  skill: string;
  jobs: number;
}
export interface ILearningListItemWithoutJobs
  extends Omit<IlearningListItem, 'jobs'> {}
