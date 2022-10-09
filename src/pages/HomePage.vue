<template>
  <q-page class="flex flex-center">
    <LottiePlayer animationLink="/json/working.json" y />
    <div class="text-h1 text-primary">
      {{ $t('Welcome to SageAssistant') }}
    </div>
  </q-page>
</template>

<script setup>
import LottiePlayer from '@/components/lottie/LottiePlayer.vue'
</script>
