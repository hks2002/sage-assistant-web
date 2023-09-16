<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-17 22:26:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-08-28 22:13:40
* @FilePath              : sage-assistant-web/src/components/customers/QCardCustomerInfo.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-card>
    <template v-for="(info, index) in customerInfo" :key="info['customerCode']">
      <q-item class="text-h6 text-weight-bold q-pr-md q-pb-xs" no-wrap v-if="index === 0">
        <q-icon name="fas fa-address-book" class="q-pr-md q-pt-xs" color="teal" />
        {{ info['customerCode'] }}
        {{ info['customerName0'] }}
        {{ info['customerName1'] }}
      </q-item>
    </template>
    <template v-for="info in customerInfo" :key="info['customerCode']">
      <q-item class="q-pt-xs q-pb-xs">
        <q-icon
          name="fas fa-phone"
          class="q-pr-md q-pt-xs"
          color="teal"
          v-if="
            info['tel0'] != ' ' ||
            info['tel1'] != ' ' ||
            info['tel2'] != ' ' ||
            info['tel3'] != ' ' ||
            info['tel4'] != ' ' ||
            info['mobile0'] != ' '
          "
        />
        {{ info['tel0'] }}
        {{ info['tel1'] }}
        {{ info['tel2'] }}
        {{ info['tel3'] }}
        {{ info['tel4'] }}
        {{ info['mobile0'] }}
        <q-icon name="fas fa-fax" class="q-pr-md q-pl-md q-pt-xs" color="teal" v-if="info['fax0'] != ' '" />
        {{ info['fax0'] }}

        <q-icon
          name="fas fa-envelope"
          class="q-pr-md q-pl-md q-pt-xs"
          color="teal"
          v-if="
            info['email0'] != ' ' ||
            info['email1'] != ' ' ||
            info['email2'] != ' ' ||
            info['email3'] != ' ' ||
            info['email4'] != ' '
          "
        />
        {{ info['email0'] }}
        {{ info['email1'] }}
        {{ info['email2'] }}
        {{ info['email3'] }}
        {{ info['email4'] }}

        <q-icon
          name="fas fa-map-marker"
          class="q-pr-md q-pl-md q-pt-xs"
          color="teal"
          v-if="
            info['postCode'] != ' ' ||
            info['country'] != ' ' ||
            info['state'] != ' ' ||
            info['city'] != ' ' ||
            info['address0'] != ' ' ||
            info['address1'] != ' '
          "
        />
        {{ info['postCode'] }}{{ info['country'] }} {{ info['state'] }} {{ info['city'] }} {{ info['address0']
        }}{{ info['address1'] }}

        <q-icon
          name="fas fa-internet-explorer"
          class="q-pr-md q-pl-md q-pt-xs"
          color="teal"
          v-if="info['website'] != ' '"
        />
        <a target="_blank" :href="WebSiteUrl(info['website'])" v-if="info['website'] != ' '">
          {{ WebSiteUrl(info['website']) }}
        </a>
      </q-item>
    </template>
    <q-inner-loading :showing="showLoading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { Notify } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  customerCode: String
})

//common vars
const showLoading = ref(false)

// component vars
const customerInfo = ref([])

// actions
const doUpdate = () => {
  if (!props.customerCode) return

  showLoading.value = true

  axiosGet('/Data/CustomerDetails', { customerCode: props.customerCode })
    .then((response) => {
      customerInfo.value = response
    })
    .catch(() => {
      Notify.create({
        type: 'error',
        message: t('W.LOADING') + t('{VAR_HOLD_WITH_SPACE}', t('S.CUSTOMER_INFO')) + t('W.FAILED')
      })
    })
    .finally(() => {
      showLoading.value = false
    })
}

const WebSiteUrl = (url) => {
  if (url.toLowerCase().substr(0, 4) === 'http') {
    return url
  } else {
    return 'http://' + url
  }
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
<style lang="sass" scoped>
.q-item
  min-height: 24px
</style>
