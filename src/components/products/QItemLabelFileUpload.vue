<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 00:16:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-11-08 22:06:27
* @CopyRight             : MerBleueAviation
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
        <q-card-section>
          <div class="text-h6">{{ t('S.CHOOSE_CATEGORY_OF_FILE') }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-gutter-sm">
            <q-option-group v-model="upLoadFileCategory" :options="upLoadFileCategoryOptions" color="teal" />
          </div>
          <q-uploader
            url="/Data/FileUpload"
            :form-fields="setUploadParams(this.pn, upLoadFileCategory)"
            field-name="file"
            multiple
            color="teal"
            style="width: 100%"
          />
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
const upLoadFileCategory = ref('Drawing')
const upLoadFileCategoryOptions = ref([
  {
    label: 'Drawing',
    value: 'Drawing'
  },
  {
    label: 'Manual',
    value: 'Manual'
  }
])

const setUploadParams = (pn, cat) => {
  const params = [
    { name: 'Pn', value: pn },
    { name: 'Cat', value: cat }
  ]
  return params
}

onMounted(() => {
  axiosGet('/Data/ClientIP').then((ip) => {
    if (ip.startsWith('192.168.0') || ip.startsWith('192.168.8') || ip.startsWith('192.168.253')) {
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
