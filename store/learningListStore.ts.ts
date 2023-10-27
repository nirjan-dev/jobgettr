import { defineStore } from 'pinia';
import {
  IlearningListItem,
  ILearningListItemWithoutJobs,
} from 'types/IlearningListItem';
import { storePrefix } from 'types/storePrefix';

const prefix: storePrefix = 'NK13_JOB_SEARCH_HELPER';

export const useLearningListStore = defineStore(
  'learningList',
  function learningListStore() {
    const learningList: Ref<IlearningListItem[]> = useLocalStorage(
      `${prefix}_learningList`,
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

    const sortedLearningList = computed(function getSortedLearningList() {
      const learningListCopy = [...learningList.value];

      return learningListCopy.sort(function sortComparison(a, b) {
        return b.jobs - a.jobs;
      });
    });

    function deleteItemFromLearningList(itemToDelete: IlearningListItem) {
      const newLearningList = learningList.value.filter(
        function filterOutDeletionItem(loopItem) {
          return loopItem.skill !== itemToDelete.skill;
        },
      );

      learningList.value = newLearningList;
    }

    return {
      learningList,
      sortedLearningList,
      addItemToLearningList,
      addMultipleItemsToLearningList,
      deleteItemFromLearningList,
    };
  },
);
