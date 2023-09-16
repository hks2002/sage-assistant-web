<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-21 16:13:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-08-24 17:02:52
* @FilePath              : sage-assistant-web/src/pages/AboutPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <div class="flex flex-center">
    <q-card>
      <div class="row text-h6 bg-primary text-white q-pl-sm">{{ $t('W.ABOUT') }} {{ $t('W.APP_NAME') }}</div>
      <div />

      <div class="text-h6 q-pa-sm">
        {{ $t('S.ABOUT') }}
      </div>

      <div class="row">
        <ul>
          <div class="text-bold">
            {{ productName }}
            <q-chip dense color="orange" text-color="white">
              {{ version }}
            </q-chip>
          </div>
          <li v-for="(ver, dep) in dependencies" :key="dep" class="">{{ dep }} : {{ ver }}</li>
        </ul>
        <ul>
          <div class="text-bold">
            {{ srvName }}
            <q-chip dense color="purple" text-color="white">
              {{ srvVersion }}
            </q-chip>
          </div>
          <li v-for="dep in srvProjectDependencies" :key="dep" class="">{{ dep.artifactId }} : {{ dep.version }}</li>
        </ul>
        <ul>
          <div class="text-bold">
            {{ rptSrvName }}
            <q-chip dense color="purple" text-color="white">
              {{ rptSrvVersion }}
            </q-chip>
          </div>
          <li v-for="dep in rptSrvProjectDependencies" :key="dep" class="">{{ dep.artifactId }} : {{ dep.version }}</li>
        </ul>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const $q = useQuasar()
const srvName = ref('')
const srvVersion = ref('')
const srvProjectDependencies = ref([])
const rptSrvName = ref('')
const rptSrvVersion = ref('')
const rptSrvProjectDependencies = ref([])
const productName = require('app/package.json').productName
const version = require('app/package.json').version
// const author = require('app/package.json').author
const dependencies = require('app/package.json').dependencies

axiosGet('/Data/SrvInfo')
  .then((response) => {
    srvName.value = response.name
    srvVersion.value = response.version
  })
  .finally(() => {
    $q.loadingBar.stop()
  })

axiosGet('/Data/SrvProjectDependencies')
  .then((response) => {
    srvProjectDependencies.value = response
  })
  .finally(() => {
    $q.loadingBar.stop()
  })

axiosGet('/Report/SrvInfo')
  .then((response) => {
    rptSrvName.value = response.name
    rptSrvVersion.value = response.version
  })
  .finally(() => {
    $q.loadingBar.stop()
  })

axiosGet('/Report/SrvProjectDependencies')
  .then((response) => {
    rptSrvProjectDependencies.value = response
  })
  .finally(() => {
    $q.loadingBar.stop()
  })
</script>
