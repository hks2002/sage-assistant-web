<!--
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-03-25 11:01:23
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-08-26 10:31:27
 * @FilePath       : \web2\src\layouts\MenuItems.vue
 * @CopyRight      : Dedienne Aerospace China ZhuHai
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
