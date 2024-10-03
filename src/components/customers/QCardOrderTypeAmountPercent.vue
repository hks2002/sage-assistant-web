<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-17 22:26:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-08 11:34:36
* @FilePath              : sage-assistant-web/src/components/customers/QCardOrderTypeAmountPercent.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-card>
    <q-linear-progress size="25px" :value="percent" color="accent">
      <div class="absolute-full flex flex-center">
        <q-badge color="white" text-color="accent" :label="percentLabel" />
      </div>
    </q-linear-progress>
    <q-inner-loading :showing="showLoading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { date } from 'quasar'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  site: String,
  orderType: String,
  customerCode: String,
  dateFrom: String,
  dateTo: String,
  excludeHKG: Boolean
})

//common vars
const showLoading = ref(false)

// component vars
const totalVal = ref(0)
const normalVal = ref(0)
// actions
const doUpdate = () => {
  if (
    !props.site ||
    !props.orderType ||
    !props.customerCode ||
    !date.isValid(props.dateFrom) ||
    !date.isValid(props.dateTo)
  )
    return

  showLoading.value = true
  Promise.all([
    axiosGet('/Data/CustomerSummaryAmountTotalUSD', {
      Site: props.site,
      OrderType: 'ALL',
      CustomerCode: props.customerCode,
      DateFrom: props.dateFrom,
      DateTo: props.dateTo,
      Interval: props.interval,
      ExcludeHKG: props.excludeHKG ? 'TRUE' : 'FALSE'
    }),
    axiosGet('/Data/CustomerSummaryAmountTotalUSD', {
      Site: props.site,
      OrderType: 'NORM',
      CustomerCode: props.customerCode,
      DateFrom: props.dateFrom,
      DateTo: props.dateTo,
      Interval: props.interval,
      ExcludeHKG: props.excludeHKG ? 'TRUE' : 'FALSE'
    })
  ])
    .then((dataArray) => {
      totalVal.value = dataArray[0]
      normalVal.value = dataArray[1]
    })
    .finally(() => {
      showLoading.value = false
    })
}

const percent = computed(() => {
  if (totalVal.value === 0) {
    return 0
  }
  return normalVal.value / totalVal.value
})
const percentLabel = computed(() => (percent.value * 100).toFixed(2) + '%')

// events
onMounted(() => {
  doUpdate()
})

watch(props, (value, oldValue) => {
  doUpdate()
})
</script>
