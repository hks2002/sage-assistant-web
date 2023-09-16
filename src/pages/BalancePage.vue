<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-17 23:04:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-08-27 11:15:57
* @FilePath              : sage-assistant-web/src/pages/BalancePage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <WaitInputLottieVue v-if="!accountNO && isAuthorized('GESSIH')" />
  <ExceptionLottieVue :ErrorCode="403" v-if="!isAuthorized('GESSIH')" />

  <div class="row q-gutter-sm q-px-sm q-pt-sm" v-if="isAuthorized('GESSIH')">
    <q-input
      v-model="accountNO"
      dense
      outlined
      debounce="1000"
      :label="$t('F.AccountNO')"
      :hint="$t('S.SUCH_AS') + ': ' + '1001000 ' + $t('W.OR') + ' 1001000, 1001001, 1001002'"
      hide-hint
      hide-bottom-space
      input-style="font-weight:bolder;font-size:25px;text-transform:uppercase"
      class="col-grow"
    />
    <q-input v-model="year" dense outlined debounce="1000" :label="$t('W.YEAR')" class="col-1" />
    <q-toggle v-model="showBalance" dense :label="$t('W.BALANCE')" class="col-1" />
    <q-toggle v-model="showDebit" dense :label="$t('W.DEBIT')" class="col-1" />
    <q-toggle v-model="showCredit" dense :label="$t('W.CREDIT')" class="col-1" />
    <q-toggle v-model="showMovement" dense :label="$t('W.MOVEMENT')" class="col-1" />
  </div>
  <q-list class="q-pa-sm" v-if="accountNO">
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
</template>

<script setup>
import { isAuthorized } from '@/assets/auth'
import { getCookies } from '@/assets/storage'
import EchartFinancialAccountBalanceVue from '@/components/echarts/EchartAccountBalance.vue'
import QMarkupTableBalanceVue from '@/components/Financial/QMarkupTableBalance.vue'
import ExceptionLottieVue from '@/components/lottie/ExceptionLottie.vue'
import WaitInputLottieVue from '@/components/lottie/WaitInputLottie.vue'
import { date, LocalStorage } from 'quasar'
import { inject, onBeforeUnmount, ref } from 'vue'

// common vars
const ebus = inject('ebus')
const site = ref(LocalStorage.getItem('site'))

// page vars
const accountNO = ref(null)
const nowTimeStamp = Date.now()
const formattedString = date.formatDate(nowTimeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
const year = ref(formattedString.substring(0, 4))

const showBalance = ref(true)
const showDebit = ref(true)
const showCredit = ref(true)
const showMovement = ref(true)

// events
ebus.on('changeSite', () => {
  site.value = getCookies('site')
})

onBeforeUnmount(() => {
  ebus.off('changeSite')
})
</script>
