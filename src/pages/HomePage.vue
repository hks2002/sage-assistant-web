<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 02:25:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-09-06 04:25:52
* @FilePath              : sage-assistant-web/src/pages/HomePage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <div class="column flex-center" :style="{ height: height - 10 + 'px' }">
    <LottiePlayer animationLink="/json/working.json" />
    <div class="text-h1 text-primary">
      {{ $t('S.WELCOME_TO {APP}', { APP: $t('W.APP_NAME') }) }}
    </div>
  </div>
</template>

<script setup>
import LottiePlayer from '@/components/lottie/LottiePlayer.vue'
import { inject } from 'vue'
const height = inject('tabPageBodyHeight')
</script>
