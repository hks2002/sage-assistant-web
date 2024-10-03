<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 02:25:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-12-30 10:47:36
* @FilePath              : sage-assistant-web/src/pages/HomePage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page class="column flex flex-center" :style-fn="$pageStore.setPageHeightStyle">
    <LottiePlayer animationLink="/json/working.json" />
    <div class="text-h1 text-primary">
      {{ $t('S.WELCOME_TO {APP}', { APP: $t('S.APP_NAME') }) }}
    </div>
  </q-page>
</template>

<script setup>
import LottiePlayer from '@/components/lottie/LottiePlayer.vue'
import { usePageStore } from '@/stores/PageStore'

const $pageStore = usePageStore()
</script>
