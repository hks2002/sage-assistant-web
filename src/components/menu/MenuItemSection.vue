<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2024-09-14 17:13:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-11-29 19:26:05
* @FilePath              : sage-assistant-web/src/components/menu/MenuItemSection.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-item-section v-if="icon" avatar class="q-pa-none">
    <q-icon :name="icon" color="primary" />
  </q-item-section>

  <q-item-section>
    <q-item-label class="text-primary text-bold">
      {{ $t('{VAR_HOLD}', { VAR_HOLD: title }) }}
    </q-item-label>
    <q-item-label class="text-primary" caption>
      {{ $t('{VAR_HOLD}', { VAR_HOLD: caption }) }}
    </q-item-label>
  </q-item-section>
</template>

<script setup>
/* eslint-disable */
const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  }
})
</script>
