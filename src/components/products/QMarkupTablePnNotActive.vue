<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 00:06:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-19 19:00:22
* @FilePath              : sage-assistant-web/src/components/products/QMarkupTablePnNotActive.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-markup-table dense id="pnNotActive">
    <thead style="position: sticky; top: 0px; z-index: 1">
      <tr class="bg-primary text-white">
        <th class="text-center text-caption">#</th>
        <th class="text-left">{{ $t('F.ProjectNO') }}</th>
        <th class="text-left">{{ $t('F.PN') }}</th>
        <th class="text-left">{{ $t('F.Description') }}</th>
        <th class="text-left">{{ $t('F.Description') }}</th>
        <th class="text-left">{{ $t('F.Description') }}</th>
        <th class="text-left">{{ $t('F.PNStatus') }}</th>
        <th class="text-left">WC</th>
        <th class="text-left">{{ $t('F.CustomerCode') }}</th>
        <th class="text-left">{{ $t('F.CustomerName') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in pnNotActive" :key="index">
        <td class="text-center">{{ index }}</td>
        <td>{{ item['projectNO'] }}</td>
        <td>{{ item['PN'] }}</td>
        <td>{{ item['desc1'] }}</td>
        <td>{{ item['desc2'] }}</td>
        <td>{{ item['desc3'] }}</td>
        <td>{{ item['PNStatus'] }}</td>
        <td>{{ item['WC'] }}</td>
        <td>{{ item['customerCode'] }}</td>
        <td>{{ item['customerName'] }}</td>
      </tr>
    </tbody>
    <tfoot style="position: sticky; top: 0px; z-index: 1">
      <tr>
        <td colspan="10">
          <q-banner>
            <q-btn dense icon="fas fa-download" color="primary" :label="$t('S.DOWNLOAD')" @click="download()" />
          </q-banner>
        </td>
      </tr>
    </tfoot>
    <q-inner-loading :showing="showLoading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </q-markup-table>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { tableToExcel } from '@/assets/dataUtils'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  site: String
})

const pnNotActive = ref([])
const showLoading = ref(false)

const doUpdate = () => {
  if (!props.site) return

  showLoading.value = true

  axiosGet('/Data/NotActivePN', { Site: props.site })
    .then((response) => {
      pnNotActive.value = response
    })
    .finally(() => {
      showLoading.value = false
    })
}

const download = () => {
  tableToExcel('pnNotActive', props.site, t('S.NOT_ACTIVE_PN'))
}

onMounted(() => {
  doUpdate()
})

watch(props, (value, oldValue) => {
  console.debug('watch:', oldValue, '--->', value)

  doUpdate()
})
</script>
