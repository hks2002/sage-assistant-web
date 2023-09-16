<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-10-09 17:38:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-06-10 09:59:31
* @FilePath              : src/components/lottie/LottiePlayer.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <div ref="lottieplayer"></div>
</template>
<script setup>
//import lottie from 'lottie-web'
import lottie from 'lottie-web/build/player/lottie.min.js'
import { onMounted, ref } from 'vue'

const props = defineProps({
  animationLink: {
    type: String,
    required: true
  },
  animationData: {
    type: Object,
    default: null,
    required: false
  },
  loop: {
    type: [Boolean, Number],
    default: true
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  background: {
    type: String,
    default: 'transparent'
  }
})

let lottieplayer = ref(null)
onMounted(() => {
  if (lottieplayer.value) {
    lottie.loadAnimation({
      container: lottieplayer.value,
      renderer: 'svg',
      loop: props.loop,
      autoplay: props.autoplay,
      animationData: props.animationData,
      path: props.animationLink,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        progressiveLoad: true,
        background: props.background
      }
    })
  }
})
</script>
