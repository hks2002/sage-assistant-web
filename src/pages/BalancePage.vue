<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-17 23:04:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-22 09:50:54
* @FilePath              : sage-assistant-web/src/pages/BalancePage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page :style-fn="$pageStore.setPageHeightStyle">
    <WaitInputLottieVue v-if="!accountNO" />

    <div class="row q-gutter-sm q-pa-sm">
      <q-input
        v-model="accountNO"
        dense
        outlined
        debounce="1000"
        :label="$t('F.AccountNO')"
        :hint="$t('S.SUCH_AS') + ': ' + '1001000 ' + $t('S.OR') + ' 1001000, 1001001, 1001002'"
        hide-hint
        hide-bottom-space
        input-style="font-weight:bolder;font-size:25px;text-transform:uppercase"
        class="col-grow"
      />
      <q-input v-model="year" dense outlined debounce="1000" :label="$t('S.YEAR')" class="col-1" />
      <q-toggle v-model="showBalance" dense :label="$t('S.BALANCE')" class="col-1" />
      <q-toggle v-model="showDebit" dense :label="$t('S.DEBIT')" class="col-1" />
      <q-toggle v-model="showCredit" dense :label="$t('S.CREDIT')" class="col-1" />
      <q-toggle v-model="showMovement" dense :label="$t('S.MOVEMENT')" class="col-1" />
    </div>
    <q-list class="q-gutter-sm q-pa-sm" v-if="accountNO" :style="$pageStore.setDomHeightStyle(56)">
      <div class="row" style="padding: 0px; height: 250px">
        <echart-financial-account-balance-vue
          :site="site"
          :year="year"
          :accountNO="accountNO"
          cat="B"
          class="col-3"
          v-if="showBalance"
        />
        <echart-financial-account-balance-vue
          :site="site"
          :year="year"
          :accountNO="accountNO"
          cat="D"
          class="col-3"
          v-if="showDebit"
        />
        <echart-financial-account-balance-vue
          :site="site"
          :year="year"
          :accountNO="accountNO"
          cat="C"
          class="col-3"
          v-if="showCredit"
        />
        <echart-financial-account-balance-vue
          :site="site"
          :year="year"
          :accountNO="accountNO"
          cat="M"
          class="col-3"
          v-if="showMovement"
        />
      </div>
      <q-markup-table-balance-vue
        :accountNO="accountNO"
        :year="year"
        :site="site"
        :showBalance="showBalance"
        :showCredit="showCredit"
        :showDebit="showDebit"
        :showMovement="showMovement"
      />
    </q-list>
  </q-page>
</template>

<script setup>
import EchartFinancialAccountBalanceVue from '@/components/echarts/EchartAccountBalance.vue'
import QMarkupTableBalanceVue from '@/components/Financial/QMarkupTableBalance.vue'
import WaitInputLottieVue from '@/components/lottie/WaitInputLottie.vue'
import { date } from 'quasar'
import { ref } from 'vue'

import { usePageStore } from '@/stores/PageStore'
import { storeToRefs } from 'pinia'
const $pageStore = usePageStore()

// page vars
const { site } = storeToRefs($pageStore)
const accountNO = ref(null)
const nowTimeStamp = Date.now()
const formattedString = date.formatDate(nowTimeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
const year = ref(formattedString.substring(0, 4))

const showBalance = ref(true)
const showDebit = ref(true)
const showCredit = ref(true)
const showMovement = ref(true)
</script>
