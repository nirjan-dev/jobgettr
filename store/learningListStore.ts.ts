import { defineStore, skipHydrate } from 'pinia';
import {
  IlearningListItem,
  ILearningListItemWithoutJobs,
} from 'types/IlearningListItem';

export const useLearningListStore = defineStore(
  'learningList',
  function learningListStore() {
    const learningList: Ref<IlearningListItem[]> = useLocalStorage(
      'pinia/learningList/learningList',
      [],
    );

    function addItemToLearningList(newItem: ILearningListItemWithoutJobs) {
      const existingItem = learningList.value.find(
        function findExistingItem(item) {
          return item.skill === newItem.skill;
        },
      );

      if (existingItem) {
        existingItem.jobs++;
        return;
      }

      learningList.value.push({
        skill: newItem.skill,
        jobs: 1,
      });
    }

    function addMultipleItemsToLearningList(
      newItems: ILearningListItemWithoutJobs[],
    ) {
      newItems.forEach(addItemToLearningList);
    }

    return {
      learningList: skipHydrate(learningList),
      addItemToLearningList,
      addMulitpleItemsToLearningList: addMultipleItemsToLearningList,
    };
  },
);
