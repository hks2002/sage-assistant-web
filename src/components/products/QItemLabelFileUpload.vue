<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 00:16:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-07-07 21:50:24
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-item-label class="relative-position">
    <div class="q-gutter-sm">
      <q-btn
        v-if="pn && isFromChina"
        icon="fas fa-file-medical"
        color="teal"
        size="sm"
        dense
        @click="showFileUploader = true"
      />
    </div>
    <q-dialog v-model="showFileUploader">
      <q-card>
        <q-card-section> </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-gutter-sm"></div>
          <q-uploader url="/Data/FileUpload" field-name="file" multiple color="teal" style="width: 100%" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="teal" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-item-label>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  pn: String,
  isActive: Boolean
})

const isFromChina = ref(false)
const showFileUploader = ref(false)

onMounted(() => {
  axiosGet('/Data/ClientIP').then((ip) => {
    if (
      ip.startsWith('192.168.0') ||
      ip.startsWith('192.168.8') ||
      ip.startsWith('192.168.13') ||
      ip.startsWith('192.168.253')
    ) {
      isFromChina.value = true
    } else {
      isFromChina.value = false
    }
  })
})

watch(props, (value, oldValue) => {
  console.debug('watch:', oldValue, '--->', value)
})
</script>
