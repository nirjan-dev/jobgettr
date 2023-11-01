import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { storePrefix } from 'types/storePrefix';
const prefix: storePrefix = 'NK13_JOB_SEARCH_HELPER';

export const useAPIKeyStore = defineStore(
  'apiKeyStore',
  function getResumeStore() {
    const openAIKey: Ref<string> = useLocalStorage(
      `${prefix}_openAI_api_key`,
      '',
    );

    function setKey(newValue: string) {
      openAIKey.value = newValue;
    }

    const hasKeyBeenSet = computed(function computedHasKeyBeenSet() {
      return !!openAIKey.value;
    });

    function getKey() {
      return openAIKey.value;
    }

    return {
      setKey,
      hasKeyBeenSet,
      getKey,
    };
  },
);
