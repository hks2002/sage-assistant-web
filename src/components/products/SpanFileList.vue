<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 00:16:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-11-30 12:55:19
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <span class="q-pa-xs q-gutter-sm">
    <q-btn
      v-for="file in filesInZHUSrv"
      :key="file.Path"
      type="a"
      :icon="getDocIcon(file.DocType)"
      :label="getFileCat(file.Cat)"
      @click="clickBtn(file.Path)"
      text-color="orange-10"
      dense
    >
      <q-badge color="orange" floating>{{ props.version }}</q-badge>
      <q-tooltip>{{ getFileToolTip(file.Cat, file.File) }}</q-tooltip>
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
      v-for="file in filesInTLSSrv"
      :key="file.path"
      type="a"
      :icon="getDocIcon(file.docType)"
      :label="getFileCat(file.cat)"
      @click="clickBtn(file.path)"
      text-color="primary"
      dense
    >
      <q-badge color="orange" floating>{{ props.version }}</q-badge>
      <q-tooltip>{{ getFileToolTip(file.cat, file.file) }}</q-tooltip>
    </q-btn>
  </span>

  <q-inner-loading :showing="showLoading">
    <q-spinner-ios size="50px" color="primary" />
  </q-inner-loading>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { Notify } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  pn: String,
  version: String
})

const isFromChina = ref(false)
const filesInZHUSrv = ref([])
const filesInTLSSrv = ref([])
const showLoading = ref(false)

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
const getFileCat = (fileCat) => {
  if (fileCat === 'Drawing') {
    return 'D'
  } else if (fileCat === 'Manual') {
    return 'M'
  } else if (fileCat === 'Certificate') {
    return 'C'
  } else {
    return '?'
  }
}

const getFileToolTip = (fileCat, fileName) => {
  if (fileCat === 'Drawing') {
    return t('S.DRAWING') + ':' + fileName
  } else if (fileCat === 'Manual') {
    return t('S.MANUAL') + ':' + fileName
  } else if (fileCat === 'Certificate') {
    return t('S.CERTIFICATE') + ':' + fileName
  } else {
    return t('S.UNKNOWN_CATEGORY') + ':' + fileName
  }
}

const clickBtn = (path) => {
  console.debug('open:' + path)
  window.open(path, '_blank')
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
    .catch(() => {
      Notify.create({
        type: 'error',
        message: t('S.DELETE') + t('{VAR_HOLD_WITH_SPACE}', path) + t('S.FAILED')
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
      filesInTLSSrv.value = data[0]
      if (isFromChina.value) {
        filesInZHUSrv.value = data[1]
      }
    })
    .catch(() => {
      Notify.create({
        type: 'error',
        message: t('S.LOADING') + t('{VAR_HOLD_WITH_SPACE}', t('S.ATTACHMENT')) + t('S.FAILED')
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
