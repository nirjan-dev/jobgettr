export interface IApplication {
  id: string;
  resumeDetails: string;
  company: string;
  applicationLink: string;
  stage: string;
  notes: string;
  dateApplied: string;
}

export interface IApplicationWithoutID extends Omit<IApplication, 'id'> {}
