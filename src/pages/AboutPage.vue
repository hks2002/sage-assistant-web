<template>
  <q-page class="flex flex-center">
    <q-card>
      <div>
        <div class="row text-h6 bg-primary text-white q-pl-sm">
          {{ $t('About') }} {{ productName }}
          <q-chip dense color="orange" text-color="white">
            {{ version }}
          </q-chip>
          <q-separator vertical />
          {{ srvName }}
          <q-chip dense color="purple" text-color="white">
            {{ srvVersion }}
          </q-chip>
        </div>
      </div>
      <q-separator />
      <div />
      <div class="text-h6 q-pa-sm">
        {{ $t("It's a tool to get information from sage,to save your time, and increase productivity.") }}
      </div>
      <div class="row">
        <ul>
          <div class="text-bold">Powered by:</div>
          <li v-for="(ver, dep) in dependencies" :key="dep" class="">{{ dep }} : {{ ver }}</li>
        </ul>
        <ul>
          <div class="text-bold">Powered by:</div>
          <li v-for="dep in srvProjectDependencies" :key="dep" class="">{{ dep.artifactId }} : {{ dep.version }}</li>
        </ul>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import _remove from 'lodash/remove'
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const $q = useQuasar()
const srvName = ref('')
const srvVersion = ref('')
const srvProjectDependencies = ref([])
const productName = require('@/../package.json').productName
const version = require('@/../package.json').version
// const author = require('@/../package.json').author
const dependencies = require('@/../package.json').dependencies

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
    _remove(response, function (dep) {
      return dep.groupId === 'SAP'
    })
    srvProjectDependencies.value = response.data
  })
  .finally(() => {
    $q.loadingBar.stop()
  })
</script>
