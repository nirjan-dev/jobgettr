export const LEARNING_LIST_ACTION = 'add to learning list';
export const ENABLE_ACTION = 'enable';
export const IGNORE_ACTION = 'ignore';
export const ADD_TO_RESUME = 'add to resume';

export interface ISuggestedSkill {
  skill: string;
  action:
    | typeof ENABLE_ACTION
    | typeof LEARNING_LIST_ACTION
    | typeof IGNORE_ACTION
    | typeof ADD_TO_RESUME;
}
