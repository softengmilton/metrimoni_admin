import api from "@core/utils/api"
// import { BRAND_LIST, BRAND_STORE, BRAND_UPDATE, BRAND_DELETE, BRAND_ALL } from "@core/utils/apiEndpoints"

export default {
  namespaced: true,

  state: {
    all: [],
    data: {},
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0,
      from: 0,
      to: 0,
    },
    loading: false,
    errors: {},
  },

  getters: {
    getData: state => state.data?.data || [],
    getAllData: state => state.all || [],
    getPagination: state => state.pagination,
    isLoading: state => state.loading,
  },

  mutations: {
    SET_ALL_BRAND(state, data) {
      state.allBrand = data
    },

    SET_BRANDS(state, data) {
      state.data = data
    },

    SET_PAGINATION(state, data) {
      state.pagination = data
    },

    SET_LOADING(state, value) {
      state.loading = value
    },
  },

  actions: {
    async fetchPaginated({ commit }, data) {
      commit('SET_LOADING', true)

      return await api
        .get(BRAND_LIST, data)
        .then(({ data }) => {

          const { brands } = data

          const pagination = {
            current_page: brands.current_page,
            last_page: brands.last_page,
            per_page: brands.per_page,
            total: brands.total,
            from: brands.from,
            to: brands.to,
          }

          commit('SET_BRANDS', data.brands)
          commit('SET_LOADING', false)
          commit('SET_PAGINATION', pagination)

        }).catch(error => {
          commit('SET_LOADING', false)
        }).finally(() => {
          commit('SET_LOADING', false)
        })
    },


    async all({ commit }) {

      return await api
        .get(BRAND_ALL)
        .then(({ data }) => {

          const { brands } = data

          commit('SET_ALL_BRAND', brands)
          commit('SET_LOADING', false)

        }).catch(error => commit('SET_LOADING', false))
        .finally(() => commit('SET_LOADING', false))
    },


    async store({ commit }, data) {
      
      return new Promise((resolve, reject) => {
        api
          .post(BRAND_STORE, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {})
      })
    },

    async update({ commit }, { id, data }) {
      return new Promise((resolve, reject) => {
        let url = BRAND_UPDATE + `/${id}`
        api
          .put(url, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {})
      })
    },

    async delete({ commit }, id) {
      return new Promise((resolve, reject) => {
        let url = BRAND_DELETE + `/${id}`
        api
          .delete(url)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {})
      })
    },
  },
}
