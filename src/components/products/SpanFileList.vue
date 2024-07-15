<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 00:16:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-07-16 00:32:10
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <span class="q-pa-sm q-gutter-sm">
    <q-btn
      v-for="file in filesInZHU"
      :key="file.file_name"
      type="a"
      :icon="getDocIcon(file.file_name)"
      @click="clickBtn('/docs/' + file.location + '/' + file.file_name)"
      color="primary"
      dense
    >
      <q-tooltip>{{ file.file_name }}</q-tooltip>
    </q-btn>
    <q-btn
      v-for="file in filesInDMS"
      :key="file.file_name"
      type="a"
      :icon="getDocIcon(file.file_name)"
      @click="
        clickBtn(
          'http://192.168.10.64:4040/cocoon/viewDocument/' +
            file.file_name +
            '?FileID=' +
            file.location +
            '&UserName=TEMP&dsn=dmsDS&Client_Type=25'
        )
      "
      color="green"
      dense
    >
      <q-tooltip>{{ file.file_name }}</q-tooltip>
    </q-btn>
    <q-btn
      v-for="file in filesInTLS"
      :key="file.path"
      type="a"
      :icon="getDocIcon(file.docType)"
      @click="clickBtn(file.path)"
      color="grey"
      dense
    >
      <q-tooltip>{{ file.file }}</q-tooltip>
    </q-btn>
    <q-inner-loading :showing="showLoading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </span>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { lastIndexOf } from 'lodash'
import { Notify } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  pn: String,
  version: String
})

const filesInZHU = ref([])
const filesInDMS = ref([])
const filesInTLS = ref([])
const showLoading = ref(false)

const getDocIcon = (docType) => {
  var index = lastIndexOf(docType, '.')
  if (index > 0) {
    docType = docType.substring(index + 1).toUpperCase()
  }

  switch (docType) {
    case 'PDF':
      return 'fas fa-file-pdf'
    case 'BMP':
    case 'TIF':
    case 'JPG':
    case 'JPEG':
      return 'fas fa-file-image'
    case 'ZIP':
    case 'RAR':
    case '7Z':
      return 'fas fa-file-archive'
    case 'DOC':
    case 'DOCX':
      return 'fas fa-file-word'
    case 'XLS':
    case 'XLSX':
      return 'fas fa-file-excel'
    default:
      return 'fas fa-file'
  }
}

const clickBtn = (path) => {
  console.debug('open:' + path)
  window.open(path, '_blank')
}

const doUpdate = () => {
  showLoading.value = true

  if (!props.pn) {
    filesInZHU.value = []
    filesInDMS.value = []
    filesInTLS.value = []

    showLoading.value = false
    return
  }

  let filesInSrv = []
  filesInSrv.push(axiosGet('/Data/GetDocsInfoFromZHU', { Pn: props.pn }))
  filesInSrv.push(axiosGet('/Data/GetDocsInfoFromDms', { Pn: props.pn }))
  filesInSrv.push(axiosGet('/Data/GetDocsInfoFromTLS', { Pn: props.pn }))

  Promise.all(filesInSrv)
    .then((data) => {
      filesInZHU.value = data[0]
      filesInDMS.value = data[1]
      filesInTLS.value = data[2]
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
  if (props.pn) {
    doUpdate()
  }
})

watch(props, (value, oldValue) => {
  console.debug('watch:', oldValue, '--->', value)
  doUpdate()
})
</script>
