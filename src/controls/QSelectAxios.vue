<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-05-20 12:00:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-11-29 19:28:42
* @FilePath              : sage-assistant-web/src/controls/QSelectAxios.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<!--
If want to set value to one object prop, set optionValue to the name,
without set it, the model value is an object.

Note: 'multiple' can't with 'fill-input', 'hide-selected'
      'multiple' suggest with 'use-chip'
-->
<template>
  <q-select
    dense
    clearable
    outlined
    use-input
    fill-input
    hide-dropdown-icon
    emit-value
    options-dense
    input-debounce="500"
    v-model="model"
    :options="options"
    :option-label="optionLabel"
    :option-value="optionValue"
    :loading="showLoading"
    @filter="filterFn"
    @filter-abort="abortFilterFn"
  >
    <template v-slot:no-option v-if="!showLoading">
      <q-item>
        <q-item-section class="text-red"> {{ $t('S.NO_RESULTS') }} </q-item-section>
      </q-item>
    </template>
    <template v-slot:loading>
      <q-inner-loading showing>
        <q-spinner-ios size="50px" color="primary" />
      </q-inner-loading>
    </template>
  </q-select>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { ref, watch } from 'vue'

const props = defineProps({
  dataUrl: {
    type: String,
    required: true
  },
  optionLabel: {
    type: String,
    required: true
  },
  optionValue: {
    type: String,
    required: true
  },
  minQueryLen: {
    type: Number,
    default: 2,
    required: false
  }
})

const model = ref(null)
const options = ref([])
const showLoading = ref(false)

const filterFn = (inputVal, done, abort) => {
  if (inputVal.length < props.minQueryLen) {
    abort()
    return
  }

  let url = props.dataUrl
  const params = {}

  params[props.optionLabel] = inputVal.toUpperCase()
  showLoading.value = true

  axiosGet(url, params)
    .then((data) => {
      options.value = data
    })
    .finally(() => {
      showLoading.value = false
    })

  done()
}

const abortFilterFn = () => {
  console.debug('Delayed filter aborted')
}

// Don't use watchEffect, it run before Mounted.
watch(props, (value, oldValue) => {
  console.debug('watch:', oldValue, '--->', value)
})
</script>
<style lang="sass"></style>
