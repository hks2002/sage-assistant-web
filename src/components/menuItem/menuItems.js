/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-05-26 17:31:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2023-11-30 12:54:24                               *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { i18n } from '@/boot/i18n'

const { t } = i18n.global

/**
 * name: ❗️❗️❗️the name should match to xxxPage.vue name, blank will be ignored❗️❗️❗️.
 *       English text only, it used at router.push(), work with paras name
 *       and could be wrapped by i18n function also.
 *       such as $t(name), t(name)
 * title: Not necessary, mainly purpose is remind developer don't forget to write i18n translation text,
 *        when use global search t('*') to extracting all text needed by i18n files.
 */

export default [
  {
    path: '/',
    name: 'Dashboard',
    title: 'Dashboard',
    caption: '',
    icon: 'fas fa-chalkboard-teacher',
    split: false,
    expansion: false,
    enable: false
  },
  {
    path: '/Todo',
    name: 'Todo',
    title: t('S.TODO'),
    caption: '',
    icon: 'fas fa-tasks',
    split: false,
    expansion: false,
    enable: true
  },
  {
    path: '/Products',
    name: 'Products',
    title: t('S.PRODUCTS'),
    caption: '',
    icon: 'fas fa-cubes',
    split: false,
    expansion: false,
    enable: true
  },
  {
    name: 'Stock',
    title: t('S.STOCK'),
    caption: '',
    icon: 'fas fa-th',
    split: false,
    enable: true,
    expansion: true,
    children: [
      {
        path: '/Stock',
        name: 'Stock Summary',
        title: t('S.SUMMARY'),
        caption: '',
        icon: 'fas fa-th',
        split: false,
        enable: true
      },
      {
        path: '/Stock',
        name: 'Stock History',
        title: t('S.HISTORY'),
        caption: '',
        icon: 'fas fa-th',
        split: false,
        enable: true
      }
    ]
  },
  {
    path: '/Customers',
    name: 'Customers',
    title: t('S.CUSTOMERS'),
    caption: '',
    icon: 'fas fa-users',
    split: false,
    expansion: false,
    enable: true
  },
  {
    path: '/Sales',
    name: 'Sales',
    title: t('S.SALES'),
    caption: '',
    icon: 'fas fa-trophy',
    split: false,
    expansion: false,
    enable: false
  },
  {
    path: '/Suppliers',
    name: 'Suppliers',
    title: t('S.SUPPLIERS'),
    caption: '',
    icon: 'fas fa-puzzle-piece',
    split: false,
    expansion: false,
    enable: true
  },
  {
    path: '/Purchases',
    name: 'Purchases',
    title: t('S.PURCHASES'),
    caption: '',
    icon: 'fas fa-shopping-cart',
    split: false,
    expansion: false,
    enable: false
  },
  {
    path: '/Logistics',
    name: 'Logistics',
    title: t('S.LOGISTICS'),
    caption: '',
    icon: 'fas fa-truck',
    split: false,
    expansion: false,
    enable: false
  },
  {
    name: 'Financial',
    title: t('S.FINANCIAL'),
    caption: '',
    icon: 'fas fa-dollar-sign',
    split: false,
    enable: true,
    expansion: true,
    children: [
      {
        path: '/Fapiao',
        name: 'Fapiao',
        title: t('S.FAPIAO'),
        caption: '',
        icon: 'fas fa-dollar-sign',
        split: false,
        enable: true
      },
      {
        path: '/InvoicePay',
        name: 'Invoice Pay',
        title: t('S.INVOICE_PAY'),
        caption: '',
        icon: 'fas fa-dollar-sign',
        split: false,
        enable: true
      },
      {
        path: '/Balance',
        name: 'Balance',
        title: t('S.BALANCE'),
        caption: '',
        icon: 'fas fa-dollar-sign',
        split: false,
        enable: true
      }
    ]
  },
  {
    path: '/SuspectDuplicateRecords',
    name: 'Suspect Duplicate Records',
    title: t('S.SUSPECT_DUPLICATE_RECORDS'),
    caption: '',
    icon: 'fas fa-user-nurse',
    split: true,
    enable: true,
    expansion: false
  },
  {
    path: '/LinkSalesPurchaseReceiptDeliveryInvoice',
    name: 'Link Sales Purchase Receipt Delivery Invoice',
    title: t('S.LINK_SALES_PURCHASE_RECEIPT_DELIVERY_INVOICE'),
    caption: '',
    icon: 'fas fa-link',
    split: true,
    enable: true,
    expansion: false
  },
  //
  //   name: 'Analysis',
  //   title: t('S.ANALYSIS'),
  //   caption: '',
  //   icon: 'fas fa-search-dollar',
  //   split: false,
  //   expansion: true,
  //   enable: true,
  //   children: [
  //     {
  //       path: '/QuoteSalesCost',
  //       name: 'Quote Sales Cost',
  //       title: t('S.QUOTE_SALES_COST'),
  //       caption: '',
  //       icon: 'fas fa-search-dollar',
  //       split: false,
  //       enable: true
  //     }
  //   ]
  // },
  {
    path: '/Reports',
    name: 'Reports',
    title: t('S.REPORTS'),
    caption: '',
    icon: 'fas fa-print',
    split: true,
    expansion: false,
    enable: true
  },
  {
    path: '/About',
    name: 'About',
    title: t('S.ABOUT'),
    caption: '',
    icon: 'fas fa-info-circle',
    split: true,
    expansion: false,
    enable: true
  }
]
