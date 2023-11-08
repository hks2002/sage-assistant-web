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
        v-for="file in files"
        :key="file.Path"
        type="a"
        size="xs"
        :icon="getDocIcon(file.DocType)"
        @click="clickBtn(file.Path)"
        dense
      >
        <q-badge v-if="file.Cat === 'Drawing'" floating>D</q-badge>
        <q-badge v-else-if="file.Cat === 'Manual'" floating>M</q-badge>
        <q-badge v-else-if="file.Cat === 'Certificate'" floating>C</q-badge>
        <q-badge v-else floating>?</q-badge>
        <q-tooltip v-if="file.Cat === 'Drawing'" floating>{{ t('W.DRAWING') }}:{{ file.File }}</q-tooltip>
        <q-tooltip v-else-if="file.Cat === 'Manual'" floating>{{ t('W.MANUAL') }}:{{ file.File }}</q-tooltip>
        <q-tooltip v-else-if="file.Cat === 'Certificate'" floating>{{ t('W.CERTIFICATE') }}:{{ file.File }}</q-tooltip>
        <q-tooltip v-else floating>{{ t('S.UNKNOWN_CATEGORY') }}:{{ file.File }}</q-tooltip>
        <q-menu touch-position context-menu>
          <q-btn
            icon="fas fa-trash-alt"
            color="teal"
            size="sm"
            v-if="isFromChina"
            @click="doDeleteFile(file.Path)"
            dense
          />
        </q-menu>
      </q-btn>

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

    <q-inner-loading :showing="showLoading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </q-item-label>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { Notify } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  pn: String,
  isActive: Boolean
})

const isFromChina = ref(false)
const files = ref([])
const showLoading = ref(false)
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

const getDocIcon = (docType) => {
  if (docType === 'PDF') {
    return 'fas fa-file-pdf'
  } else if (docType === 'BMP' || docType === 'TIF' || docType === 'JPG' || docType === 'JPEG') {
    return 'fas fa-file-image'
  } else if (docType === 'ZIP' || docType === 'RAR' || docType === '7Z') {
    return 'fas fa-file-archive'
  } else if (docType === 'DOC' || docType === 'DOCX') {
    return 'fas fa-file-word'
  } else if (docType === 'XLS' || docType === 'XLSX') {
    return 'fas fa-file-excel'
  } else {
    return 'fas fa-file'
  }
}

const clickBtn = (path) => {
  console.debug('open:' + path)
  window.open(path)
}

const setUploadParams = (pn, cat) => {
  const params = [
    { name: 'Pn', value: pn },
    { name: 'Cat', value: cat }
  ]
  return params
}

const doDeleteFile = (path) => {
  if (!isFromChina.value) {
    return
  }

  console.debug('deleteFile:' + path)
  axiosGet('/Data/FileDelete', { Path: path })
    .then((data) => {
      Notify.create({ type: 'success', message: data })
    })
    .catch((e) => {
      Notify.create({
        type: 'error',
        message: t('W.DELETE') + t('{VAR_HOLD_WITH_SPACE}', path) + t('W.FAILED')
      })
    })
}

const doUpdate = () => {
  showLoading.value = true

  Promise.all([
    axiosGet('/Data/AttachmentPath', { Pn: props.pn }),
    axiosGet('/Data/AttachmentPathForChina', { Pn: props.pn })
  ])
    .then((data) => {
      files.value = data[0]
      if (isFromChina.value) {
        files.value = [...data[0], ...data[1]]
      }
      showFileUploader.value = false
    })
    .catch((e) => {
      Notify.create({
        type: 'error',
        message: t('W.LOADING') + t('{VAR_HOLD_WITH_SPACE}', t('W.ATTACHMENT')) + t('W.FAILED')
      })
    })
    .finally(() => {
      showLoading.value = false
    })
}

onMounted(() => {
  axiosGet('/Data/ClientIP').then((ip) => {
    if (ip.startsWith('192.168.0') || ip.startsWith('192.168.8') || ip.startsWith('192.168.253')) {
      isFromChina.value = true
    } else {
      isFromChina.value = false
    }
  })

  if (props.pn) {
    doUpdate()
  }
})

watch(props, (value, oldValue) => {
  console.debug('watch:', oldValue, '--->', value)

  doUpdate()
})
</script>
