<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-05-29 19:46:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-06-10 10:00:03
* @FilePath              : src/components/lottie/WaitInputLottie.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <LottiePlayer :animationLink="'/json/waiting-input.json'" :height="400" :width="400" class="flex fixed-center" />
</template>

<script setup>
import LottiePlayer from './LottiePlayer.vue'
</script>
