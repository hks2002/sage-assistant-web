<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-11-29 19:25:41
* @FilePath              : sage-assistant-web/src/components/menu/MenuGroup.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <template v-if="props.enable">
    <q-separator v-if="split" />
    <!-- with sub menu items -->
    <template v-if="props.children && props.children.length > 0">
      <q-expansion-item expand-separator expand-icon-toggle header-class="q-pa-sm">
        <template v-slot:header>
          <MenuItemSection :icon="props.icon" :title="props.title" :caption="props.caption" />
        </template>

        <template v-for="child in props.children">
          <q-item
            v-if="child.enable"
            :key="child.name"
            v-bind="child"
            clickable
            class="q-pa-sm"
            @click="showPage(child.name)"
          >
            <MenuItemSection :icon="child.icon" :title="child.title" :caption="child.caption" />
          </q-item>
        </template>
      </q-expansion-item>
    </template>
    <!-- without sub menu items -->
    <template v-else>
      <q-item clickable @click="showPage(props.name)" class="q-pa-none q-pl-sm">
        <MenuItemSection :icon="props.icon" :title="props.title" :caption="props.caption" />
      </q-item>
    </template>
  </template>
</template>

<script setup>
import { useRouter } from 'vue-router'
import MenuItemSection from './MenuItemSection.vue'

/* eslint-disable */
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  split: {
    type: Boolean,
    default: false
  },
  children: {
    type: Array,
    default: []
  },

  enable: {
    type: Boolean,
    default: false
  }
})

// common vars
const $router = useRouter()

// actions
const showPage = (name) => {
  $router.push({ name: name })
}
</script>

<style lang="sass" scoped>
// min-width decide the distance between icon and title
.q-item
  &__section
    &--avatar
      min-width: 36px
</style>
