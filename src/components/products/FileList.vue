<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 00:16:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-21 23:45:25
* @FilePath              : sage-assistant-web/src/components/products/FileList.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <div class="q-pa-sm q-gutter-sm">
    <template v-for="file in filesInZHU">
      <a href="javascript:void(0)" @click="clickBtn('http://192.168.0.246/docs' + file.url)"
        ><q-icon color="primary" :name="getDocIcon(file.name)" /> {{ file.name }}
      </a>
    </template>

    <template v-for="file in filesInDMS">
      <a
        style="color: green"
        href="javascript:void(0)"
        @click="
          clickBtn(
            'http://192.168.10.64:4040/cocoon/viewDocument/' +
              file.file_name +
              '?FileID=' +
              file.location +
              '&UserName=TEMP&dsn=dmsDS&Client_Type=25'
          )
        "
        ><q-icon color="green" :name="getDocIcon(file.file_name)" /> {{ file.file_name }}
      </a>
    </template>

    <template v-for="file in filesInTLS">
      <a style="color: grey" href="javascript:void(0)" @click="clickBtn(file.path)"
        ><q-icon color="grey" :name="getDocIcon(file.file)" /> {{ file.file }}
      </a>
    </template>

    <q-inner-loading :showing="showLoading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { lastIndexOf } from 'lodash-es'
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

const getDocIcon = (fileName) => {
  let index = lastIndexOf(fileName, '.')
  let docType = 'UNKNOWN'
  if (index > 0) {
    docType = fileName.substring(index + 1).toUpperCase()
  }

  switch (docType) {
    case 'PDF':
      return 'img:/icons/pdf.svg'
    case 'BMP':
    case 'TIF':
    case 'JPG':
    case 'JPEG':
      return 'img:/icons/image.svg'
    case 'ZIP':
    case 'RAR':
    case '7Z':
      return 'img:/icons/zip.svg'
    case 'DOC':
    case 'DOCX':
      return 'img:/icons/word.svg'
    case 'XLS':
    case 'XLSX':
      return 'img:/icons/excel.svg'
    default:
      return 'img:/icons/file.svg'
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
