import { setup } from '@css-render/vue3-ssr';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(function defineNaiveUIPlugin(nuxtApp) {
  if (process.server) {
    const { collect } = setup(nuxtApp.vueApp);
    const originalRenderMeta = nuxtApp.ssrContext?.renderMeta;
    nuxtApp.ssrContext = nuxtApp.ssrContext || undefined;
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.renderMeta = function renderMeta() {
        if (!originalRenderMeta) {
          return {
            headTags: collect(),
          };
        }
        const originalMeta = originalRenderMeta();
        if ('then' in originalMeta) {
          return originalMeta.then(
            function handleOriginalMeta(resolvedOriginalMeta) {
              return {
                ...resolvedOriginalMeta,
                headTags: resolvedOriginalMeta.headTags + collect(),
              };
            },
          );
        } else {
          return {
            ...originalMeta,
            headTags: originalMeta.headTags + collect(),
          };
        }
      };
    }
  }
});
