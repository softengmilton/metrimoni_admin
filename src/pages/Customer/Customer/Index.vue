<template>
  <div>
    <VRow>
      <VCol cols="12">
        <ElCard class="data-table-wrapper">
          <template #header>
            <MvCardHeader>
              <!-- <VBtn color="primary" variant="tonal" @click="handleShowCreateForm">
                <ElIcon class="mr-2" :size="14">
                  <Plus />
                </ElIcon>
                Add Bed Types
              </VBtn> -->

            </MvCardHeader>
          </template>
          <MvDataTable :columns="columns" :data="state.customers">
            <template #photo="{ row }">
              <img :src="row.primary_image_url" alt="icon" width="50" height="50">
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
              :pagination="state.paginate" @fetch="fetchBedType" />
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
})


const form = reactive({
  role: '',
  age: '',
  marital_status: '',
  citizen: '',
  region_id: '',
  community_id: '',
});


// const state = reactive({
 
// });


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
  state.selectedItem = item
  state.showCreateUpdateForm = true
}

const handleActionClose = () => {
  state.showCreateUpdateForm = false
  state.selectedItem = {}
}

const handleShowCreateForm = () => {
  state.showCreateUpdateForm = true
  state.selectedItem = {}
}

const fetchBedType = async () => {
  await store.dispatch('customer/fetchCustomerData', {
    page: state.paginate.current_page,
    per_page: state.paginate.per_page,
  })
  populatePaginate(pagination.value)
}

const handleDelete = async item => {
  await store.dispatch('customer/deleteBedType', item.id)
    .then(response => {
      notify.success(response.message || 'Bed Type deleted successfully')
      fetchBedType()
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
  fetchBedType()
}

const mounted = async () => {
  await fetchBedType()
}

onMounted(mounted)
</script>
<!-- 
<style scoped>
img {
  border-radius: 5px;
}
/* Main container styles */
.fil-mob-view {
  margin-top: 100px;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-x: auto;
  padding: 40px 30px;
  background-color: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border-radius: 0px 0 0 0;
  width: 100%;
  transform: translateY(0);
  opacity: 1;
  display: none;
  max-height: 90vh;
}

.fil-mob-view[style*="display: block"] {
  display: block;
}

/* Flex container for filters */
.filters-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  /* Adds space between items */
}

/* Filter component styles */
.filt-com {
  flex: 1 1 calc(30% - 20px);
  /* Adjust width and spacing */
  min-width: 250px;
  /* Ensures responsiveness */
}

.filter-clo {
  font-size: 28px;
  color: #333;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

/* General form group and select styles */
.form-group select {
  background-color: #fafafa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 10px;
}

.filt-send-query a {
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 30px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.filt-send-query a:hover {
  background-color: #0056b3;
}
</style> -->
