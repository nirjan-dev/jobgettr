import { defineStore, skipHydrate } from 'pinia';
import {
  IlearningListItem,
  ILearningListItemWithoutJobs,
} from 'types/IlearningListItem';

export const useLearningListStore = defineStore('learningList', () => {
  const learningList: Ref<IlearningListItem[]> = useLocalStorage(
    'pinia/learningList/learningList',
    [],
  );

  const addItemToLearningList = (newItem: ILearningListItemWithoutJobs) => {
    const existingItem = learningList.value.find(
      (item) => item.skill === newItem.skill,
    );

    if (existingItem) {
      existingItem.jobs++;
      return;
    }

    learningList.value.push({
      skill: newItem.skill,
      jobs: 1,
    });
  };

  const addMultipleItemsToLearningList = (
    newItems: ILearningListItemWithoutJobs[],
  ) => {
    newItems.forEach((item) => {
      addItemToLearningList(item);
    });
  };

  return {
    learningList: skipHydrate(learningList),
    addItemToLearningList,
    addMulitpleItemsToLearningList: addMultipleItemsToLearningList,
  };
});
