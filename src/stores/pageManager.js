/*********************************************************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                                                            *
 * @CreatedDate           : 2022-05-26 14:52:00                                                                      *
 * @LastEditors           : Robert Huang<56649783@qq.com>                                                            *
 * @LastEditDate          : 2023-08-19 17:59:53                                                                      *
 * @FilePath              : sage-assistant-web/src/stores/pageManager.js                                             *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                                                          *
 ********************************************************************************************************************/

import { defineStore } from 'pinia'

const usePagesStore = defineStore('pages', {
  state: () => ({
    activeId: 'Home',
    activeName: 'Home',
    activeQuery: {},
    activeParams: {},
    activeModel: {},

    pages: [
      {
        id: 'Home',
        name: 'Home',
        label: 'Home'
      }
    ]
  }),
  getters: {},
  persist: {
    enabled: true
  },

  actions: {
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
    }
  }
})

export { usePagesStore }
