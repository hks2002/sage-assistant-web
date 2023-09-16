<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-09-06 03:12:22
* @FilePath              : sage-assistant-web/src/layouts/MenuItems.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-scroll-area class="fit">
    <q-list>
      <MenuLink v-for="link in Links" :key="link.title" v-bind="link" />
    </q-list>
  </q-scroll-area>
</template>

<script setup>
import MenuLink from '@/layouts/MenuLink'
import { onMounted, ref } from 'vue'

const Links = ref([])

// events
onMounted(() => {
  Links.value = require('@/components/menuItem/menuItems').default
})
</script>
