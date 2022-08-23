/***
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-05-26 17:31:51
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-05-28 23:10:20
 * @FilePath       : \web2\src\components\menuItem\menuItems.js
 * @CopyRight      : Dedienne Aerospace China ZhuHai
 */
import { i18n } from '@/boot/i18n'

const { t } = i18n.global

/**
 * name: English text only, it used at router.push(),
 *       and cloulc be erapped by i18n function also.
 *       such as $t(name), t(name)
 * title: Not neccesary, mainly purpose is remaind developer don't foget to write i18n translation text,
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
    title: 'Todo',
    caption: '',
    icon: 'fas fa-tasks',
    split: false,
    expansion: false,
    enable: true
  },
  {
    path: '/Products',
    name: 'Products',
    title: 'Products',
    caption: '',
    icon: 'fas fa-cubes',
    split: false,
    expansion: false,
    enable: true
  },
  {
    name: 'Stock',
    title: 'Stock',
    caption: '',
    icon: 'fas fa-th',
    split: false,
    enable: true,
    expansion: true,
    children: [
      {
        path: '/Stock',
        name: 'Stock Summary',
        title: 'Summary',
        caption: '',
        icon: 'fas fa-th',
        split: false,
        enable: true
      },
      {
        path: '/Stock',
        name: 'Stock History',
        title: 'History',
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
    title: 'Customers',
    caption: '',
    icon: 'fas fa-users',
    split: false,
    expansion: false,
    enable: true
  },
  {
    path: '/Sales',
    name: 'Sales',
    title: 'Sales',
    caption: '',
    icon: 'fas fa-trophy',
    split: false,
    expansion: false,
    enable: false
  },
  {
    path: '/Suppliers',
    name: 'Suppliers',
    title: 'Suppliers',
    caption: '',
    icon: 'fas fa-puzzle-piece',
    split: false,
    expansion: false,
    enable: true
  },
  {
    path: '/Purchases',
    name: 'Purchases',
    title: 'Purchases',
    caption: '',
    icon: 'fas fa-shopping-cart',
    split: false,
    expansion: false,
    enable: false
  },
  {
    path: '/Logistics',
    name: 'Logistics',
    title: 'Logistics',
    caption: '',
    icon: 'fas fa-truck',
    split: false,
    expansion: false,
    enable: false
  },
  {
    name: 'Financials',
    title: 'Financials',
    caption: '',
    icon: 'fas fa-dollar-sign',
    split: false,
    enable: true,
    expansion: true,
    children: [
      {
        path: '/Fapiao',
        name: 'Fapiao',
        title: 'Fapiao',
        caption: '',
        icon: 'fas fa-dollar-sign',
        split: false,
        enable: true
      },
      {
        path: '/InvoicePay',
        name: 'Invoice Pay',
        title: 'InvoicePay',
        caption: '',
        icon: 'fas fa-dollar-sign',
        split: false,
        enable: true
      },
      {
        path: '/Balance',
        name: 'Balance',
        title: 'Balance',
        caption: '',
        icon: 'fas fa-dollar-sign',
        split: false,
        enable: true
      }
    ]
  },
  {
    name: 'Analysis',
    title: 'Analysis',
    caption: '',
    icon: 'fas fa-search-dollar',
    split: false,
    expansion: true,
    enable: true,
    children: [
      {
        path: '/QuoteSalesCost',
        name: 'Quote Sales Cost',
        title: 'Quote Sales Cost',
        caption: '',
        icon: 'fas fa-search-dollar',
        split: false,
        enable: true
      }
    ]
  },
  {
    path: '/Reports',
    name: 'Reports',
    title: 'Reports',
    caption: '',
    icon: 'fas fa-print',
    split: false,
    expansion: false,
    enable: true
  },
  {
    path: '/About',
    name: 'About',
    title: 'About',
    caption: '',
    icon: 'fas fa-info-circle',
    split: true,
    expansion: false,
    enable: true
  }
]
