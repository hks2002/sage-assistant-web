<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 02:25:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-11-30 11:01:15
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <div class="column flex-center" :style="{ height: height - 10 + 'px' }">
    <LottiePlayer animationLink="/json/working.json" />
    <div class="text-h1 text-primary">
      {{ $t('S.WELCOME_TO {APP}', { APP: $t('S.APP_NAME') }) }}
    </div>
  </div>
</template>

<script setup>
import LottiePlayer from '@/components/lottie/LottiePlayer.vue'
import { inject } from 'vue'
const height = inject('bodyHeight')
</script>
