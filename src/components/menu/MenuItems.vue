<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-11-29 19:25:57
* @FilePath              : sage-assistant-web/src/components/menu/MenuItems.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-scroll-area class="fit">
    <q-list>
      <MenuGroup v-for="item in menuItemsI18n" :key="item.title" v-bind="item" />
    </q-list>
  </q-scroll-area>
</template>

<script setup>
import { constCase } from '@/assets/nameStyle'
import MenuGroup from '@/components/menu/MenuGroup'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const menuItemsI18n = ref([])

/**
 * Add title to menu items, with all sub items
 */
const addTitle = (items) => {
  items.forEach((item) => {
    // here to keep the title, if provided
    if (!item.title) {
      item.title = t('S.' + constCase(item.name))
    }

    if (item.children) {
      addTitle(item.children)
    }
  })
}

onMounted(() => {
  const menuItems = require('@/components/menu/menuItems').default
  addTitle(menuItems)
  menuItemsI18n.value = menuItems
})

// Watch i18n locale change, don't watch pageStore locale
// Because the i18n locale value change is after pageStore locale
// Call addTitle is using the old i18n locale value
watch(locale, () => {
  delete require.cache[require.resolve('@/components/menu/menuItems')]
  Promise.resolve(require('@/components/menu/menuItems').default)
    .then((menuItems) => {
      addTitle(menuItems)
      menuItemsI18n.value = menuItems
    })
    .catch((e) => {
      console.debug(e)
    })
})
</script>
