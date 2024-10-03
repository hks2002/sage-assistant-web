<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2024-10-06 12:09:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-11-29 19:28:31
* @FilePath              : sage-assistant-web/src/components/workAction/WorkAction.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-list class="q-pa-none">
    <q-item class="q-gutter-sm row col-12">
      <q-input
        dense
        outlined
        debounce="1000"
        mask="date"
        type="date"
        class="col-1"
        :label="$t('S.FROM')"
        v-model="dateFrom"
        @update:model-value="doUpdate()"
      />
      <q-input
        dense
        outlined
        debounce="1000"
        mask="date"
        type="date"
        class="col-1"
        :label="$t('S.TO')"
        v-model="dateTo"
        @update:model-value="doUpdate()"
      />
      <q-input
        dense
        clearable
        outlined
        class="col-1"
        debounce="1000"
        input-class="text-uppercase"
        style="height: 20px; width: 250px"
        :label="$t('F.ProjectNO')"
        v-model="filterProjectNO"
        @update:model-value="doUpdate()"
      />
      <q-input
        dense
        clearable
        outlined
        class="col-1"
        debounce="1000"
        style="height: 20px"
        :label="$t('F.ActUser')"
        v-model="filterActUser"
        @update:model-value="doUpdate()"
      />
      <q-separator vertical />

      <q-btn dense flat icon="fas fa-file-excel" color="primary" @click="download()" />
      <q-btn dense flat icon="fas fa-file-pdf" color="primary" @click="printPdf()" />
    </q-item>
    <!-- ----------------------------------------------------------------------- -->
    <q-item class="col-12">
      <q-table
        dense
        flat
        bordered
        id="WorkActionTable"
        row-key="itemNO"
        class="col-12 action-table"
        :rows="rows"
        :loading="showLoading"
        :rows-per-page-options="[0]"
      >
        <template v-slot:top>
          <div class="text-h6 text-primary">{{ title }}</div>
        </template>
        <template v-slot:header="props">
          <!-- display row ------------------------------------- -->
          <q-tr :props="props">
            <q-th class="text-center bg-primary text-white" style="min-width: 20px"> # </q-th>
            <q-th class="text-left bg-primary text-white">
              {{ $t('F.ProjectNO') }}
            </q-th>
            <q-th class="text-left bg-primary text-white">
              {{ $t('F.PN') }}
            </q-th>
            <q-th class="text-left bg-primary text-white">
              {{ $t('F.SN') }}
            </q-th>
            <q-th class="text-center bg-primary text-white">
              {{ $t('F.Qty') }}
            </q-th>
            <q-th class="text-center bg-primary text-white">
              {{ $t('F.Result') }}
            </q-th>
            <q-th class="text-left bg-primary text-white" style="min-width: 150px">
              {{ $t('F.Note') }}
            </q-th>
            <q-th class="text-left bg-primary text-white">
              {{ $t('F.ActUser') }}
            </q-th>
            <q-th class="text-left bg-primary text-white">
              {{ $t('F.ActDate') }}
            </q-th>
            <q-th class="text-left bg-primary text-white" style="width: 300px" v-if="showActionColumn">
              {{ $t('F.RecordAction') }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <!-- display row ------------------------------------- -->
          <q-tr :props="props">
            <q-td auto-width class="text-center">
              {{ props.row['itemNO'] }}
            </q-td>
            <q-td>
              {{ props.row['project'] }}
            </q-td>
            <q-td>
              {{ props.row['pn'] }}
            </q-td>
            <q-td>
              {{ props.row['sn'] }}
            </q-td>
            <q-td class="text-center">
              {{ props.row['qty'] }}
            </q-td>
            <q-td class="text-center">
              {{ props.row['result'] }}
            </q-td>
            <q-td>
              {{ props.row['note'] }}
            </q-td>
            <q-td>
              {{ props.row['act_user'] }}
            </q-td>
            <q-td>
              {{ props.row['act_date'] }}
            </q-td>
            <q-td class="q-gutter-sm" v-if="showActionColumn">
              <q-btn
                dense
                outline
                no-caps
                color="white"
                icon="far fa-plus"
                class="q-mt-none"
                size="sm"
                text-color="primary"
                :label="$t('S.CREATE')"
                @click="() => add(props)"
              />
              <q-btn
                dense
                outline
                no-caps
                color="white"
                icon="far fa-edit"
                class="q-mt-none"
                size="sm"
                text-color="primary"
                :label="$t('S.MODIFY')"
                @click="() => modify(props)"
              />
              <q-btn
                dense
                outline
                no-caps
                color="white"
                icon="far fa-cut"
                class="q-mt-none"
                size="sm"
                text-color="primary"
                :label="$t('S.DELETE')"
                @click="() => remove(props)"
              />
            </q-td>
          </q-tr>
          <!-- expand edit----------------------------------------------------------------------- -->
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="9">
              <div class="row q-gutter-sm">
                <q-input
                  dense
                  outlined
                  class="col-1"
                  input-class="text-uppercase"
                  :label="$t('F.ProjectNO')"
                  v-model="obj['project']"
                />
                <q-input
                  dense
                  outlined
                  class="col-1"
                  input-class="text-uppercase"
                  :label="$t('F.PN')"
                  v-model="obj['pn']"
                />
                <q-input
                  dense
                  outlined
                  class="col-2"
                  input-class="text-uppercase"
                  :label="$t('F.SN')"
                  v-model="obj['sn']"
                />
                <q-input
                  dense
                  outlined
                  class="col-1"
                  input-class="text-uppercase"
                  type="number"
                  :label="$t('F.Qty')"
                  v-model.number="obj['qty']"
                />
                <q-select
                  dense
                  outlined
                  class="col-1"
                  v-model="obj['result']"
                  :options="['PASS', 'NC']"
                  :label="$t('F.Result')"
                />
                <q-input
                  dense
                  outlined
                  input-class="text-uppercase"
                  style="min-width: 300px"
                  :label="$t('F.Note')"
                  v-model="obj['note']"
                />
                <q-input dense outlined class="col-2" :label="$t('F.ActUser')" v-model="obj['act_user']" />
                <q-input
                  dense
                  outlined
                  mask="date"
                  type="date"
                  class="col-1"
                  input-class="text-uppercase"
                  :label="$t('F.ActDate')"
                  v-model="obj['act_date']"
                />
              </div>
            </q-td>
            <q-td class="q-gutter-sm">
              <q-btn
                dense
                outline
                no-caps
                color="primary"
                class="q-mt-none"
                icon="far fa-save"
                :label="$t('S.SAVE')"
                @click="() => save(props)"
              />
            </q-td>
          </q-tr>
        </template>
        <template v-slot:bottom-row v-if="rows.length === 0">
          <q-btn
            dense
            outline
            no-caps
            color="white"
            icon="far fa-plus"
            class="q-mt-none"
            size="sm"
            text-color="primary"
            :label="$t('S.CREATE')"
            @click="() => addFirstRow()"
          />
        </template>
        <template v-slot:loading>
          <q-inner-loading showing>
            <q-spinner-ios size="50px" color="primary" />
          </q-inner-loading>
        </template>
      </q-table>
    </q-item>
  </q-list>
</template>

<script setup>
import { axiosDelete, axiosGet, axiosModify } from '@/assets/axiosActions'
import { tableToPdf } from '@/assets/dataUtils'

import { date, Notify, SessionStorage } from 'quasar'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  site: String,
  actType: { type: String, default: 'TQC' }
})

// common vars
const showLoading = ref(false)
const showActionColumn = ref(true)
const rows = ref([])
const obj = ref({})

const userName = SessionStorage.getItem('userProfiles').userName || 'UNK'

// page vars
const filterProjectNO = ref('')
const filterActUser = ref('')

const timeStamp = Date.now()
const dateToday = ref(date.formatDate(timeStamp, 'YYYY-MM-DD'))
const dateFrom = ref(date.formatDate(date.startOfDate(timeStamp, 'month'), 'YYYY-MM-DD'))
const dateTo = ref(date.formatDate(date.endOfDate(timeStamp, 'month'), 'YYYY-MM-DD'))

const { t } = useI18n()

const title = computed(() => {
  return `${props.site} ${t('S.' + props.actType)} ${t('S.LOG')} ${filterProjectNO.value} ${filterActUser.value} ${
    dateFrom.value
  } ~ ${dateTo.value}`
})

const doUpdate = () => {
  if (!props.site) return

  showLoading.value = true

  const siteClause = `Site=${props.site}`
  const actTypeClause = props.actType ? `&Type=${props.actType}` : ''
  const userClause = filterActUser.value ? `&User=${filterActUser.value}` : ''
  const projectNOClause = filterProjectNO.value ? `&ProjectNO=${filterProjectNO.value.toUpperCase()}` : ''
  const dateFromClause = dateFrom.value ? `&DateFrom=${dateFrom.value}` : ''
  const dateToClause = dateTo.value ? `&DateTo=${dateTo.value}` : ''

  const queryClause = `${siteClause}${actTypeClause}${userClause}${projectNOClause}${dateFromClause}${dateToClause}`

  axiosGet(`/Data/WorkAction?${queryClause}`)
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].itemNO = i + 1
      }
      rows.value = data
    })
    .finally(() => {
      showLoading.value = false
    })
}

const addFirstRow = () => {
  obj.value = {
    site: props.site,
    act: props.actType,
    qty: 1,
    result: 'PASS',
    act_date: dateToday.value,
    act_user: userName
  }
  rows.value.push(obj.value)
}

const add = (rowProps) => {
  if (props.site === 'CHINA') {
    Notify.create({
      type: 'warn',
      message: t('S.SITE_CAN_NOT_BE_CHINA')
    })
    return
  }

  rowProps.expand = true
  obj.value = {
    site: props.site,
    act: props.actType,
    qty: 1,
    result: 'PASS',
    act_date: dateToday.value,
    act_user: userName
  }
}

const modify = (rowProps) => {
  rowProps.expand = true
  obj.value = rowProps.row
}

const remove = (rowProps) => {
  axiosDelete('/Data/WorkActionById', { ActionId: rowProps.row['id'] }).then(() => {
    doUpdate()
  })
}

const save = (rowProps) => {
  axiosModify('/Data/WorkAction', obj.value).then(() => {
    rowProps.expand = false
    doUpdate()
  })
}

const printPdf = () => {
  showActionColumn.value = false
  nextTick(() => {
    tableToPdf('WorkActionTable', title.value, { orientation: 'portrait' }).then(() => {
      showActionColumn.value = true
    })
  })
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

<style lang="scss">
@import '@/css/app.scss';

.action-table {
  @extend .sticky-header-column--dense;
}
</style>
