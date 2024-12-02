<template>
  <div>
    <VRow>
      <VCol cols="12">
        <ElCard class="data-table-wrapper">
          <template #header>
            <MvCardHeader>
              <div class="ms-5 d-flex">
                <!-- Search Input -->
                <VTextField v-model="state.customerID" label="Search" outlined size="medium" @input="filterData"
                  placeholder="Search by customer ID" class="mb-4" />
                <!-- Search Icon Button -->
                <VBtn icon="mdi-magnify" @click="fetchCustomer" variant="text"
                  color="primary"
                  class="search-icon-btn mt-1"
                  />

              </div>
            </MvCardHeader>
          </template>
          <MvDataTable :columns="columns" :data="state.customers">
            <template #photo="{ row }">
              <img :src="row.primary_image_url" alt="icon" width="50" height="50" class="profile-img">
            </template>
            <template #info="{ row }">
              <p><strong>Name:</strong>{{ row?.profile?.name }}</p>
              <p><strong>Email:</strong>{{ row?.email }}</p>
              <p><strong>Phone:</strong>{{ row?.phone }}</p>
            </template>
            <template #personal="{ row }">
              <p><strong>Citizenship:</strong>{{ row?.profile?.citizenship }}</p>
              <p><strong>Education:</strong>{{ row?.profile?.education }}</p>
              <p><strong>Profession:</strong>{{ row?.profile?.profession }}</p>
            </template>
            <template #status="{ row }">
              <p>{{ row?.user_type }}</p>
            </template>
            <template #actions="{ row }">
              <VBtn class="mr-2" type="reset" size="small" color="primary" variant="tonal"
                @click="handleAction('update', row)">
                <ElIcon :size="14">
                  <Edit />
                </ElIcon>
              </VBtn>

              <VBtn type="reset" size="small" color="error" variant="tonal" @click="handleAction('delete', row)">
                <ElIcon :size="14">
                  <Delete />
                </ElIcon>
              </VBtn>
            </template>
          </MvDataTable>

          <template v-if="state.customers.length" #footer>
            <Pagination :hide-on-single="false" class="data-table-pagination" background layout="prev, pager, next"
              :pagination="state.paginate" @fetch="fetchCustomer" />
          </template>
        </ElCard>
      </VCol>
    </VRow>
  </div>

  <!-- <BedTypeCreateUpdateForm v-model="state.showCreateUpdateForm" :item="state.selectedItem"
    :on-action="handleActionUpdated" @close="handleActionClose" /> -->
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useStore } from "vuex"
import Pagination from "@/components/Pagination.vue"
import MvDataTable from "@core/components/MvDataTable.vue"
import MvCardHeader from "@core/components/MvCardHeader.vue"
import { Delete, Edit, Plus } from "@element-plus/icons-vue"
import { useMixin, useNotify } from "@core/composable/composable"

import { formatDate } from "@core/utils/helpers"
import { useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute();

const store = useStore()
const { handleError, confirmAndDelete } = useMixin()
const { notify } = useNotify()

const pagination = computed(() => store.getters["customer/getPagination"]) || [];

const state = reactive({
  customers: computed(() => store.getters['customer/getCustomers']),
  loading: '',

  paginate: {
    total: 0,
    current_page: 1,
    per_page: 10,
    from: 0,
    to: 0,
  },

  showCreateUpdateForm: false,
  selectedItem: {},
  selector: [],
  regions: [],
  councils: [],
  customerID:'',
})

const columns = [
  // {
  //   label: 'Date',
  //   prop: 'created_at',
  //   formatter: value => formatDate(value),
  // },
  {
    label: 'Photo',
    prop: 'photo',
  },
  {
    label: 'Customer Id',
    prop: 'customerId',
  },

  {
    label: 'Info',
    prop: 'info',
  },
  {
    label: 'Personal Details',
    prop: 'personal',
  },
  {
    label: 'Status',
    prop: 'status',
  },
  {
    fixed: "right",
    label: "Actions",
    prop: "actions",
  },
]

const populatePaginate = pagination => {
  state.paginate = {
    total: pagination.total,
    current_page: pagination.current_page,
    per_page: pagination.per_page,
    from: pagination.from,
    to: pagination.to,
  }
}

const handleUpdate = item => {
  return router.push({ name: 'editCustomer', params: { id: item.id } });
}


const handleActionClose = () => {
  state.showCreateUpdateForm = false
  state.selectedItem = {}
}

const handleShowCreateForm = () => {
  state.showCreateUpdateForm = true
  state.selectedItem = {}
}

const fetchCustomer = async () => {
  await store.dispatch('customer/fetchCustomerData', {
    page: state.paginate.current_page,
    per_page: state.paginate.per_page,
    customerID: state.customerID || [],
  })
  populatePaginate(pagination.value)
}

const handleDelete = async item => {
  await store.dispatch('customer/deleteCustomer', item.id)
    .then(response => {
      notify.success(response.message || 'Bed Type deleted successfully')
      fetchCustomer()
    })
    .catch(handleError)
}

const handleAction = (action, item) => {

  if (!['update', 'delete'].includes(action)) {
    return
  }

  if (action === 'update') {
    return handleUpdate(item)
  }


  return confirmAndDelete({ confirmCallback: () => handleDelete(item) })
}

const handleActionUpdated = () => {
  state.showCreateUpdateForm = false
  fetchCustomer()
}

const mounted = async () => {
  await fetchCustomer()
}

onMounted(mounted)
</script>

<style scoped>

.profile-img{
  width: 100px !important;
  height: 100px !important;
  border-radius: 10px;
}
</style>
