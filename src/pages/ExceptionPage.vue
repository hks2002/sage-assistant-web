<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 01:49:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-11-19 13:36:42
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <ExceptionLottieVue :ErrorCode="ErrorCode" />
</template>

<script setup>
import ExceptionLottieVue from '@/components/lottie/ExceptionLottie.vue'

/* eslint-disable */
const props = defineProps(['ErrorCode'])
</script>
