<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-05-29 19:46:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-11-17 11:18:07
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <LottiePlayer
    :animationLink="'/json/waiting-input.json'"
    :height="400"
    :width="400"
    class="flex fixed-center"
    style="z-index: -999"
  />
</template>

<script setup>
import LottiePlayer from './LottiePlayer.vue'
</script>
