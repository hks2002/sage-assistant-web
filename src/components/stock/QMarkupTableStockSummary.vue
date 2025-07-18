<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-17 23:13:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-21 15:09:03
* @FilePath              : sage-assistant-web/src/components/stock/QMarkupTableStockSummary.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-markup-table dense bordered class="col-grow">
    <thead style="position: sticky; top: 0px; z-index: 1">
      <tr>
        <td colspan="2" class="bg-primary text-white shadow-2 col-grow">
          {{ $t('S.STOCK_COUNT_RESULT {SITE}', { SITE: props.site }) }}, {{ $t('S.TOTAL_QTY') }}:{{ S2N(sumQty, 0) }}
          {{ $t('S.TOTAL_COST') }}:{{ S2N(sumCost) }}, {{ $t('S.PRODUCTS_QTY') }}:{{ S2N(sumProductQty, 0) }}
          {{ $t('S.FINAL_PRODUCTS_COST') }}:{{ S2N(sumProductCost) }}, {{ $t('S.COMPONENTS_QTY') }}:{{
            S2N(sumOtherQty, 0)
          }}
          {{ $t('S.COMPONENTS_COST') }}:{{ S2N(sumOtherCost) }}
          <q-btn dense flat text-color="text-white" icon="fas fa-download" @click="download()" />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in dataByFirstChar" :key="index">
        <td>
          <!-- PN index  -->
          <q-avatar color="primary" text-color="white">
            {{ index }}
          </q-avatar>
        </td>
        <td>
          <!-- PN list  -->
          <div class="row">
            <div
              v-for="(subitem, subindex) in item"
              :key="subindex"
              style="padding-right: 16px"
              @click="showHistory(subitem['PN'])"
            >
              <q-tooltip>
                {{ subitem['description'] }}
                <div v-if="subitem['optionPN']">{{ $t('S.OPTIONAL_PN') }}:{{ subitem['optionPN'] }}</div>
              </q-tooltip>
              <span>{{ subitem['PN'] }}[{{ subitem['location'] }}:{{ subitem['qty'] }}]</span
              ><span v-if="false">{{ [subitem['cost']] }}</span>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
    <q-inner-loading :showing="showLoading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </q-markup-table>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { jsonToExcel, jsonToTable } from 'assets/dataUtils'
import { forEach, groupBy, sumBy } from 'lodash-es'
import { Dialog, date } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  PNfilter: {
    type: String,
    require: false,
    default: ''
  },
  site: {
    type: String,
    require: false,
    default: ''
  }
})

// common vars
const { t } = useI18n()
const showLoading = ref(false)

// component vars
let data = []
const sumQty = ref('')
const sumCost = ref('')
const sumProductQty = ref('')
const sumProductCost = ref('')
const sumOtherQty = ref('')
const sumOtherCost = ref('')

const dataByFirstChar = ref([])

const { formatDate } = date

// actions
const doUpdate = () => {
  showLoading.value = true

  axiosGet('/Data/StockSummary', { site: props.site })
    .then((response) => {
      data = response
      dataByFirstChar.value = groupBy(data, 'A')
      sumQty.value = sumBy(data, 'qty')
      sumCost.value = sumBy(data, 'cost')
      sumProductQty.value = sumBy(data, function (o) {
        if (o['G'] === 'P') {
          return o['qty']
        }
      })
      sumProductCost.value = sumBy(data, function (o) {
        if (o['G'] === 'P') {
          return o['cost']
        }
      })
      sumOtherQty.value = sumBy(data, function (o) {
        if (o['G'] !== 'P') {
          return o['qty']
        }
      })
      sumOtherCost.value = sumBy(data, function (o) {
        if (o['G'] !== 'P') {
          return o['cost']
        }
      })
    })
    .finally(() => {
      showLoading.value = false
    })
}

const showHistory = (pn) => {
  axiosGet('/Data/StockHistory?Site=' + props.site + '&PnOrName=' + pn + '&DateFrom=2000-01-01&DateTo=2099-12-31').then(
    (response) => {
      const history = response
      const header = [
        'Location',
        'Seq',
        'Qty',
        'Cost',
        'ProjectNO',
        'SourceNO',
        'SourceLine',
        'EntryNO',
        'EntryLine',
        'CreateUser',
        'CreateDate'
      ]
      const message = jsonToTable(t('S.{pn} STOCK HISTORY AT {site}', { pn: pn, site: props.site }), history)

      Dialog.create({
        message: message,
        html: true,
        fullWidth: true
      })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
    }
  )
}

const download = () => {
  const nowTimeStamp = Date.now()
  const nowTime = formatDate(nowTimeStamp, 'YYYY-MM-DD')
  const header = ['G', 'Location', 'PN', 'Description', 'OptionPN', 'Qty', 'Cost']
  const strPNData = data
  // PN with #
  forEach(strPNData, (value) => {
    value.PN = '#' + value.PN
  })
  jsonToExcel(t('S.{site} STOCK COUNT {nowTime}', { site: props.site, nowTime: nowTime }), strPNData, header)
}

const S2N = (S, n) => {
  let N = 0
  if (n) {
    N = parseFloat(S).toFixed(n)
  } else if (n === 0) {
    N = parseFloat(S).toFixed(0)
  } else {
    N = parseFloat(S).toFixed(2)
  }
  if (N === 'NaN') {
    return ''
  } else {
    return N
  }
}

onMounted(() => {
  doUpdate()
})

watch(props, (value, oldValue) => {
  console.debug('watch:', oldValue, '--->', value)
  doUpdate()
})
</script>
<style lang="sass" scoped></style>
