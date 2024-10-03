<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 01:07:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-10-17 23:04:11
* @FilePath              : sage-assistant-web/src/components/suppliers/QCardSupplierInfo.vue
* @CopyRight             : MerBleueAviation
-->

<template>
  <q-card>
    <q-item class="text-h6 text-weight-bold q-pr-md q-pb-xs">
      <q-icon name="fas fa-address-book" class="q-pr-md q-pt-xs" color="teal" />
      {{ info['supplierCode'] }}
      {{ info['supplierName0'] }}
      {{ info['supplierName1'] }}
    </q-item>
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
    <q-inner-loading :showing="showLoading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  supplierCode: String
})

//common vars
const showLoading = ref(false)

// component vars
const info = ref({})

// actions
const doUpdate = () => {
  if (!props.supplierCode) return

  showLoading.value = true

  axiosGet('/Data/SupplierDetails', { supplierCode: props.supplierCode })
    .then((response) => {
      info.value = response[0]
    })
    .finally(() => {
      showLoading.value = false
    })
}

const WebSiteUrl = (url) => {
  if (url?.toLowerCase().substr(0, 4) === 'http') {
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
