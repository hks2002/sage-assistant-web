/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-05-26 17:31:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-01-24 18:30:36                               *
 * @FilePath              : sage-assistant-web/src/components/menu/menuItems.js*
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

/**
 * name: ❗️❗️❗️the name should match to xxxPage.vue name❗️❗️❗️.
 *       English text only, it used at router.push(), work with paras name
 *       and could be wrapped by i18n function also.
 *       such as $t(name), t(name)
 * title: Not necessary, mainly purpose is remind developer don't forget to write i18n translation text,
 *        when use global search t('*') to extracting all text needed by i18n files.
 */

export default [
  {
    name: 'Todo',
    caption: '',
    icon: 'fas fa-tasks',
    split: false,
    enable: true
  },
  {
    name: 'Dashboard',
    caption: '',
    icon: 'fas fa-chalkboard-teacher',
    split: false,
    enable: true
  },
  {
    name: 'Products',
    caption: '',
    icon: 'fas fa-cubes',
    split: false,
    enable: true
  },
  {
    name: 'Sales',
    caption: '',
    icon: 'fas fa-trophy',
    split: true,
    enable: true
  },
  {
    name: 'Customers',
    caption: '',
    icon: 'fas fa-users',
    split: false,
    enable: false
  },
  {
    name: 'Purchase',
    caption: '',
    icon: 'shopping_cart',
    split: false,
    enable: true
  },
  {
    name: 'Suppliers',
    caption: '',
    icon: 'fas fa-puzzle-piece',
    split: false,
    enable: false
  },
  {
    name: 'QC',
    caption: '',
    icon: 'rule',
    split: false,
    enable: true
  },
  {
    name: 'Delivery',
    caption: '',
    icon: 'fas fa-truck',
    split: false,
    enable: true
  },
  {
    name: 'Stock',
    caption: '',
    icon: 'fas fa-th',
    split: true,
    enable: true,
    children: [
      {
        name: 'StockHistory',
        caption: '',
        icon: 'fas fa-th',
        split: false,
        enable: true
      },
      {
        name: 'StockSummary',
        caption: '',
        icon: 'fas fa-th',
        split: false,
        enable: true
      }
    ]
  },
  {
    name: 'Financial',
    caption: '',
    icon: 'paid',
    split: true,
    enable: true,
    children: [
      {
        name: 'Fapiao',
        caption: '',
        icon: 'paid',
        split: false,
        enable: false
      },
      {
        name: 'InvoicePay',
        caption: '',
        icon: 'paid',
        split: false,
        enable: true
      },
      {
        name: 'Balance',
        caption: '',
        icon: 'paid',
        split: false,
        enable: true
      }
    ]
  },
  {
    name: 'SuspectDuplicateRecords',
    caption: '',
    icon: 'fas fa-user-nurse',
    split: true,
    enable: true
  },
  {
    name: 'LinesLink',
    caption: '',
    icon: 'fas fa-link',
    split: true,
    enable: true
  },
  {
    name: 'WorkAction',
    caption: '',
    icon: 'fas fa-pencil',
    split: false,
    enable: true
  },
  {
    name: 'Reports',
    caption: '',
    icon: 'fas fa-print',
    split: true,
    enable: true
  },
  {
    name: 'About',
    caption: '',
    icon: 'fas fa-info-circle',
    split: true,
    enable: true
  }
]
