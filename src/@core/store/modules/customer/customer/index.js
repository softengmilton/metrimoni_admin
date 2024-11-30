import api from "@core/utils/api"
import {CUSTOMER_LIST} from '@core/utils/apiEndpoints'
export default {
  namespaced: true,

  state: {
    allCustomers: [],
    customer: {},
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
    getCustomers: state => state.customer?.data || [],
    allCustomers: state => state.allCustomers || [],
    getPagination: state => state.pagination,
    isLoading: state => state.loading,
  },

  mutations: {
    SET_CUSTOMERS(state, data) {
      state.customer = data
    },

    SET_ALL_CUSTOMERS(state, data) {
      state.allCities = data
    },

    SET_PAGINATION(state, data) {
      state.pagination = data
    },

    SET_LOADING(state, value) {
      state.loading = value
    },
  },

  actions: {
    async fetchCustomerData({ commit }, data) {
      commit('SET_LOADING', true)

      return await api
        .get(CUSTOMER_LIST, data)
        .then(({ data }) => {

          const { customers } = data

          const pagination = {
            current_page: customers.current_page,
            last_page: customers.last_page,
            per_page: customers.per_page,
            total: customers.total,
            from: customers.from,
            to: customers.to,
          }

          commit('SET_CUSTOMERS', customers)
          commit('SET_PAGINATION', pagination)
          commit('SET_LOADING', false)

        }).catch(error => commit('SET_LOADING', false))
        .finally(() => commit('SET_LOADING', false))
    },

    async fetchAllCustomers({ commit }) {

      return await api
        .get(CITY_ALL)
        .then(({ data }) => {

          const { customers } = data

          commit('SET_ALL_CUSTOMERS', customers)
          commit('SET_LOADING', false)

        }).catch(error => commit('SET_LOADING', false))
        .finally(() => commit('SET_LOADING', false))
      },
    
    async updateCustomer({ commit }, { id, data }) {

      commit('SET_LOADING', true)

      return new Promise((resolve, reject) => {

        const url = CITY_UPDATE + `/${id}`

        api
          .put(url, data)
          .then(({ data }) => {
            commit('SET_LOADING', false)
            resolve(data)
          })
          .catch(error => {
            commit('SET_LOADING', false)
            reject(error)
          })
      })
    },

    async deleteCustomer({ commit }, id) {

      commit('SET_LOADING', true)

      return await api
        .delete(CITY_DELETE + `/${id}`)
        .then(response => response)
        .catch(error => error)
        .finally(() => {})
    },
  },
}
