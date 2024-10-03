/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-06-09 17:24:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2024-10-27 23:28:41                               *
 * @FilePath              : sage-assistant-web/src/components/suppliers/SupplierNCColumns.js*
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

import { i18n } from '@/boot/i18n'
const { t } = i18n.global

export default [
  {
    label: '#',
    field: 'itemNO',
    align: 'center',
    headerClasses: 'bg-primary text-white',
    headerStyle: 'width: 30px'
  },
  {
    label: t('F.Site'),
    field: 'site',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.SupplierCode'),
    field: 'supplierCode',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.CustomerCode'),
    field: 'customerCode',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.ClaimNO'),
    field: 'NCNo',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.ClaimDate'),
    field: 'NCDate',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.ProjectNO'),
    field: 'projectNO',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.PN'),
    field: 'PN',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.Description'),
    field: 'description',
    align: 'left',
    headerClasses: 'bg-primary text-white',
    style: 'max-width: 300px; overflow: hidden'
  },
  // 0
  { label: t('F.Date'), field: 'NCDAT0', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.Category'), field: 'NCCAT0', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Type'), field: 'NCTYP0', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Criteria'), field: 'NCCRIT0', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Description'), field: 'NCDES0', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.CreatedBy'), field: 'createdBy0', align: 'left', headerClasses: 'bg-primary text-white' },
  // 1
  { label: t('F.Date'), field: 'NCDAT1', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.Category'), field: 'NCCAT1', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Type'), field: 'NCTYP1', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Criteria'), field: 'NCCRIT1', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Description'), field: 'NCDES1', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.CreatedBy'), field: 'createdBy1', align: 'left', headerClasses: 'bg-primary text-white' },
  // 2
  { label: t('F.Date'), field: 'NCDAT2', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.Category'), field: 'NCCAT2', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Type'), field: 'NCTYP2', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Criteria'), field: 'NCCRIT2', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Description'), field: 'NCDES2', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.CreatedBy'), field: 'createdBy2', align: 'left', headerClasses: 'bg-primary text-white' },
  // 3
  { label: t('F.Date'), field: 'NCDAT3', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.Category'), field: 'NCCAT3', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Type'), field: 'NCTYP3', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Criteria'), field: 'NCCRIT3', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Description'), field: 'NCDES3', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.CreatedBy'), field: 'createdBy3', align: 'left', headerClasses: 'bg-primary text-white' },
  // 4
  { label: t('F.Date'), field: 'NCDAT4', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.Category'), field: 'NCCAT4', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Type'), field: 'NCTYP4', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Criteria'), field: 'NCCRIT4', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Description'), field: 'NCDES4', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.CreatedBy'), field: 'createdBy4', align: 'left', headerClasses: 'bg-primary text-white' },
  // 5
  { label: t('F.Date'), field: 'NCDAT5', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.Category'), field: 'NCCAT5', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Type'), field: 'NCTYP5', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Criteria'), field: 'NCCRIT5', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Description'), field: 'NCDES5', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.CreatedBy'), field: 'createdBy5', align: 'left', headerClasses: 'bg-primary text-white' },
  // 6
  { label: t('F.Date'), field: 'NCDAT6', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.Category'), field: 'NCCAT6', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Type'), field: 'NCTYP6', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Criteria'), field: 'NCCRIT6', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Description'), field: 'NCDES6', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.CreatedBy'), field: 'createdBy6', align: 'left', headerClasses: 'bg-primary text-white' },
  // 7
  { label: t('F.Date'), field: 'NCDAT7', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.Category'), field: 'NCCAT7', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Type'), field: 'NCTYP7', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Criteria'), field: 'NCCRIT7', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Description'), field: 'NCDES7', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.CreatedBy'), field: 'createdBy7', align: 'left', headerClasses: 'bg-primary text-white' },
  // 8
  { label: t('F.Date'), field: 'NCDAT8', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.Category'), field: 'NCCAT8', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Type'), field: 'NCTYP8', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Criteria'), field: 'NCCRIT8', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Description'), field: 'NCDES8', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.CreatedBy'), field: 'createdBy8', align: 'left', headerClasses: 'bg-primary text-white' },
  // 9
  { label: t('F.Date'), field: 'NCDAT10', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.Date'), field: 'NCDAT9', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.Category'), field: 'NCCAT9', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Type'), field: 'NCTYP9', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Criteria'), field: 'NCCRIT9', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Description'), field: 'NCDES9', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.CreatedBy'), field: 'createdBy9', align: 'left', headerClasses: 'bg-primary text-white' },
  //10
  { label: t('F.Category'), field: 'NCCAT10', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Type'), field: 'NCTYP10', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Criteria'), field: 'NCCRIT10', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Description'), field: 'NCDES10', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.CreatedBy'), field: 'createdBy10', align: 'left', headerClasses: 'bg-primary text-white' },
  //11
  { label: t('F.Date'), field: 'NCDAT11', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.Category'), field: 'NCCAT11', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Type'), field: 'NCTYP11', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Criteria'), field: 'NCCRIT11', align: 'center', headerClasses: 'bg-primary text-white' },
  { label: t('F.Description'), field: 'NCDES11', align: 'left', headerClasses: 'bg-primary text-white' },
  { label: t('F.CreatedBy'), field: 'createdBy11', align: 'left', headerClasses: 'bg-primary text-white' }
]
