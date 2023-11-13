<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 00:06:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-09-08 22:16:18
* @FilePath              : sage-assistant-web/src/components/products/QListPnList.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-list>
    <q-item dense class="q-px-sm q-pt-none" v-if="pnRoot">
      <q-item-label class="text-teal" style="font-weight: bolder; font-size: 20px"
        >{{ $t('S.PART_NUM_INFO') }}
        <template v-for="(pn, index) in pnsInFamily" :key="pn.ROWID">
          <span v-if="index < 2" class="q-gutter-xl">
            <SpanFileList :pn="pn.PN" :version="pn.version" />
          </span>
        </template>
      </q-item-label>
    </q-item>
    <template v-for="pn in pnsInFamily" :key="pn.ROWID">
      <q-item dense class="q-px-sm q-pt-none">
        <q-item-section :class="labClass(pn.status)" style="padding: 0px">
          <q-item-label style="font-weight: bolder; font-size: 20px">{{ pn.PN }}</q-item-label>
          <q-item-label v-if="pn.desc1">{{ pn.desc1 }}</q-item-label>
          <q-item-label v-if="pn.desc2">{{ pn.desc2 }}</q-item-label>
          <q-item-label v-if="pn.desc3">{{ pn.desc3 }}</q-item-label>
          <QItemLabelFileUpload :pn="pn.PN" />
        </q-item-section>
        <q-item-section :class="labClass(pn.status)" side top>
          <q-item-label style="font-size: 18px">{{ date.formatDate(pn.createDate, 'YYYY-MM-DD') }}</q-item-label>
          <q-item-label style="font-size: 18px">{{ pn.cat }}</q-item-label>
          <q-item-label> <q-badge color="purple" v-if="pn.status === 1">Active</q-badge> </q-item-label
          ><q-item-label v-if="pn.comment">{{ pn.comment }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
    <q-inner-loading :showing="showLoading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </q-list>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import QItemLabelFileUpload from '@/components/products/QItemLabelFileUpload'
import SpanFileList from '@/components/products/SpanFileList'
import { date, Notify } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  pnRoot: String
})

const pnsInFamily = ref([])
const showLoading = ref(false)

const labClass = (status) => {
  if (status === 1) {
    return 'text-green-10'
  } else {
    return 'text-grey'
  }
}

const doUpdate = () => {
  if (!props.pnRoot) {
    return
  }

  showLoading.value = true

  axiosGet('/Data/PNsInFamily', { PnRoot: props.pnRoot })
    .then((response) => {
      pnsInFamily.value = response
    })
    .catch(() => {
      Notify.create({ type: 'error', message: t('W.LOADING') + t('{VAR_HOLD_WITH_SPACE}', t('F.PN')) + t('W.FAILED') })
    })
    .finally(() => {
      showLoading.value = false
    })
}

onMounted(() => {
  doUpdate()
})

watch(props, (value, oldValue) => {
  console.debug('watch:', oldValue, '--->', value)

  doUpdate()
})
</script>
