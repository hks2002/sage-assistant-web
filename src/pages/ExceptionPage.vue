<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 01:49:16
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-06-23 01:49:16
* @FilePath              : src/pages/ExceptionPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page>
    <ExceptionLottieVue :ErrorCode="ErrorCode" />
  </q-page>
</template>

<script setup>
import ExceptionLottieVue from '@/components/lottie/ExceptionLottie.vue'

/* eslint-disable */
const props = defineProps(['ErrorCode'])
</script>
