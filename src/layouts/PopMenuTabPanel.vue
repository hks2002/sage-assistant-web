<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-11-29 19:30:17
* @FilePath              : sage-assistant-web/src/layouts/PopMenuTabPanel.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-tab-panel name="" class="q-pa-none">
    <q-list>
      <div v-for="index in []" :key="index" @click="() => {}">
        <q-item class="cursor-pointer q-ma-xs" :disable="false">
          <q-item-section avatar>
            <q-avatar />
          </q-item-section>
          <q-item-section class="q-gutter-xs">
            <q-item-label :lines="1"> {{}} </q-item-label>
            <q-item-label caption> {{}} </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator v-if="index < 5" inset="item" />
      </div>
    </q-list>
  </q-tab-panel>
</template>

<script setup></script>
<style lang="scss" scoped></style>
