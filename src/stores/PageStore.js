/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-05-26 14:52:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2024-11-29 19:14:54                               *
 * @FilePath              : sage-assistant-web/src/stores/PageStore.js        *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { defineStore } from 'pinia'

export const usePageStore = defineStore('pages', {
  state: () => ({
    tabHeaderHeight: 36,
    pageHeight: 100,
    usingTabPage: false,
    leftDrawerOpen: false,
    miniState: true,
    site: 'ZHU',
    siteList: ['ZHU'],
    userInfo: '',
    language: 'en-US',
    activeId: 'Home',
    activeName: 'Home',
    activeQuery: {},
    activeParams: {},
    activeModel: {},
    activeSubTab: 'Tracking',
    pages: [
      {
        id: 'Home',
        name: 'Home',
        label: 'Home'
      }
    ],
    tabSubPage: 'Tracking'
  }),
  getters: {},
  persist: {
    enabled: true
  },

  actions: {
    setPageHeightStyle(pageOffset, screenHeight) {
      this.pageHeight = this.usingTabPage ? screenHeight - pageOffset - this.tabHeaderHeight : screenHeight - pageOffset
      return { height: `${this.pageHeight}px`, overflow: 'auto' }
    },
    setDomHeightStyle(domOffset) {
      return { height: `${this.pageHeight - domOffset - 10}px`, overflow: 'auto' }
    },
    getPageHeight() {
      return this.pageHeight
    },
    getDomHeight(domOffset) {
      return this.pageHeight - domOffset
    },
    openLeftDrawer() {
      this.leftDrawerOpen = true
    },
    closeLeftDrawer() {
      this.leftDrawerOpen = false
    },
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    setLeftDrawerOpen(open) {
      this.leftDrawerOpen = open
    },
    setLocale(language) {
      this.language = language
    },
    setSite(site) {
      this.site = site
    },
    setSiteList(siteList) {
      this.siteList = null
      this.siteList = siteList
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    getRouteById(pageId) {
      const idx = this.pages.findIndex((r) => r.id === pageId)

      return idx > -1
        ? {
            name: this.pages[idx].name,
            query: this.pages[idx].query,
            params: this.pages[idx].params
          }
        : {}
    },
    addPage(page) {
      this.pages.push(page)

      this.activeId = page.id
      this.activeName = page.name
      this.activeQuery = page.query
      this.activeParams = page.params
      this.activeModel = null
    },
    removePage(pageId) {
      if (pageId === this.activeId) {
        const idx = this.pages.findIndex((r) => r.id === pageId)

        if (idx + 1 == this.pages.length) {
          // it's the last page
          this.activeId = this.pages[idx - 1].id
          this.activeName = this.pages[idx - 1].name
          this.activeQuery = this.pages[idx - 1].query
          this.activeParams = this.pages[idx - 1].params
          this.activeModel = this.pages[idx - 1].model
        } else {
          // it's not the last page
          this.activeId = this.pages[idx + 1].id
          this.activeName = this.pages[idx + 1].name
          this.activeQuery = this.pages[idx + 1].query
          this.activeParams = this.pages[idx + 1].params
          this.activeModel = this.pages[idx + 1].model
        }
      }
      // remove the page
      this.pages.splice(
        this.pages.findIndex((r) => r.id === pageId),
        1
      )
    },
    setActivePage(pageId) {
      const pageFind = this.pages.find((r) => r.id === pageId)
      if (pageFind) {
        this.activeId = pageFind.id
        this.activeName = pageFind.name
        this.activeQuery = pageFind.query
        this.activeParams = pageFind.params
        this.activeModel = pageFind.model
      }
    },
    setPageModel(pageId, model) {
      const idx = this.pages.findIndex((r) => r.id === pageId)
      if (idx >= 0) {
        this.pages[idx].model = model
      }
    },
    hasPage(pageId) {
      const idx = this.pages.findIndex((r) => r.id === pageId)
      return idx < 0 ? false : true
    },
    setTabSubPage(tabSubPage) {
      this.tabSubPage = tabSubPage
    }
  }
})
