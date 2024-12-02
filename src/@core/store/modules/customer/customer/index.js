import api from "@core/utils/api"
import {CUSTOMER_LIST,CUSTOMER_DETAILS, CUSTOMER_UPDATE, CUSTOMER_DELETE} from '@core/utils/apiEndpoints'
export default {
  namespaced: true,

  state: {
    allCustomers: [],
    customers: {},
    customerDetails: {},
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
    getCustomers: state => state.customers?.data || [],
    allCustomers: state => state.allCustomers || [],
    getCustomerDetails: state => state.customerDetails,
    getPagination: state => state.pagination,
    isLoading: state => state.loading,
  },

  mutations: {
    SET_CUSTOMERS(state, data) {
      state.customers = data
    },
        
    SET_ALL_CUSTOMERS(state, data) {
      state.allCustomers = data
    },

    SET_PAGINATION(state, data) {
      state.pagination = data
    },

    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_CUSTOMER_DETAILS(state, data) {
      state.customerDetails = data // Mutation to update customer details
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

    async fetchDetails({ commit }, id) { // New action to fetch customer details
      commit('SET_LOADING', true)
       const url = CUSTOMER_DETAILS.replace(':id',id)
      return await api
        .get(url) // Use the correct endpoint and pass the ID
        .then(({ data }) => {
          commit('SET_CUSTOMER_DETAILS', data.customer) // Commit the details to the state
          commit('SET_LOADING', false)
        })
        .catch(error => {
          commit('SET_LOADING', false)
          console.error("Failed to fetch customer details:", error)
        })
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

        const url = CUSTOMER_UPDATE.replace(':id',id)

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
      const url = CUSTOMER_DELETE.replace(':id',id)
      return await api
        .delete(url)
        .then(response => response)
        .catch(error => error)
        .finally(() => {})
    },
  },
}
