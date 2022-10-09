<!--
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-05-29 19:44:59
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-10-09 17:49:49
 * @FilePath       : \web2\src\components\lottie\ExceptionLottie.vue
 * @CopyRight      : Dedienne Aerospace China ZhuHai
-->
<template>
  <LottiePlayer :animationLink="'/json/' + ErrorCode + '.json'" :height="400" :width="400" class="flex fixed-center" />
</template>

<script setup>
import LottiePlayer from './LottiePlayer.vue'
/* eslint-disable */
const props = defineProps(['ErrorCode'])
</script>
