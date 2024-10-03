<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-22 22:48:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-10-16 01:42:14
* @FilePath              : sage-assistant-web/src/components/Financial/QMarkupTableBalance.vue
* @CopyRight             : MerBleueAviation
-->

<template>
  <!-- set height and width in parent -->
  <q-markup-table dense>
    <thead style="position: sticky; top: 0px; z-index: 1">
      <tr>
        <td :colspan="colspan" class="bg-teal text-h6 text-white shadow-2">
          {{ $t('F.AccountNO') }}:
          {{
            $t('S.{ACCOUNT_NO} BALANCE OF {YEAR}', {
              ACCOUNT_NO: accountNO,
              YEAR: year
            })
          }}
          <q-btn dense flat icon="fas fa-download" @click="download()" />
        </td>
      </tr>
      <tr class="bg-primary text-white">
        <th class="text-center text-caption">#</th>
        <th class="text-left">{{ $t('F.AccountNO') }}</th>
        <th class="text-left">{{ $t('F.Currency') }}</th>
        <template v-for="month in 13" :key="month">
          <template v-if="showBalance">
            <th class="text-right">B{{ month - 1 }}</th>
          </template>
        </template>
        <template v-for="month in 13" :key="month">
          <template v-if="showCredit">
            <th class="text-right">C{{ month - 1 }}</th>
          </template>
        </template>
        <template v-for="month in 13" :key="month">
          <template v-if="showDebit">
            <th class="text-right">D{{ month - 1 }}</th>
          </template>
        </template>
        <template v-for="month in 13" :key="month">
          <template v-if="showMovement">
            <th class="text-right">M{{ month - 1 }}</th>
          </template>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in balanceItems" :key="index">
        <td class="text-center">{{ index }}</td>
        <td class="text-left">{{ item['accountNO'] }}</td>
        <td class="text-left">{{ item['currency'] }}</td>
        <template v-for="month in 13" :key="month">
          <template v-if="showBalance">
            <td class="text-right">{{ item['b' + (month - 1)] }}</td>
          </template>
        </template>
        <template v-for="month in 13" :key="month">
          <template v-if="showCredit">
            <td class="text-right">{{ item['c' + (month - 1)] }}</td>
          </template>
        </template>
        <template v-for="month in 13" :key="month">
          <template v-if="showDebit">
            <td class="text-right">{{ item['d' + (month - 1)] }}</td>
          </template>
        </template>
        <template v-for="month in 13" :key="month">
          <template v-if="showMovement">
            <td class="text-right">{{ item['m' + (month - 1)] }}</td>
          </template>
        </template>
      </tr>
    </tbody>
    <q-inner-loading :showing="showLoading">
      <q-spinner-hourglass size="50px" color="primary" />
    </q-inner-loading>
  </q-markup-table>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { jsonToExcel } from 'assets/dataUtils'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  accountNO: { type: String, require: true, default: '' },
  year: { type: String, require: true, default: '' },
  site: { type: String, require: true, default: '' },
  showCredit: { type: Boolean, require: false, default: true },
  showDebit: { type: Boolean, require: false, default: true },
  showMovement: { type: Boolean, require: false, default: true },
  showBalance: { type: Boolean, require: false, default: true }
})

// common vars
const showLoading = ref(false)

// components vars
const balanceItems = ref([])
const colspan = ref(56)

// actions
const doUpdate = () => {
  if (!props.accountNO || !props.year || !props.site) return

  showLoading.value = true

  colspan.value = 4
  colspan.value = props.showCredit ? colspan.value + 13 : colspan.value
  colspan.value = props.showDebit ? colspan.value + 13 : colspan.value
  colspan.value = props.showMovement ? colspan.value + 13 : colspan.value
  colspan.value = props.showBalance ? colspan.value + 13 : colspan.value

  axiosGet('/Data/FinancialBalance', {
    Site: props.site,
    AccountNO: props.accountNO,
    Year: props.year
  })
    .then((response) => {
      balanceItems.value = response
    })
    .finally(() => {
      showLoading.value = false
    })
}

const download = () => {
  const header = ['AccountNO', 'Currency']
  for (let idx = 0; idx <= 12; idx++) {
    if (props.showBalance) {
      header.push('B' + idx)
    }
    if (props.showCredit) {
      header.push('C' + idx)
    }
    if (props.showDebit) {
      header.push('D' + idx)
    }
    if (props.showMovement) {
      header.push('M' + idx)
    }
  }

  jsonToExcel('AccountNO:' + props.accountNO + ' Balance of ' + props.year, balanceItems.value, header)
}

// events
onMounted(() => {
  doUpdate()
})

watch(props, (value, oldValue) => {
  console.debug('watch:', oldValue, '--->', value)

  doUpdate()
})
</script>
