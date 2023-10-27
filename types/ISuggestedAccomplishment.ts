export const ENABLE_ACTION = 'enable';
export const IGNORE_ACTION = 'ignore';

export interface ISuggestedAccomplishment {
  accomplishment: string;
  action: typeof ENABLE_ACTION | typeof IGNORE_ACTION;
}
