<template>
  <div>
    <VRow>
      <VCol cols="12">
        <ElCard class="data-table-wrapper">
          <template #header>
            <MvCardHeader>
              <VBtn color="primary" variant="tonal" @click="handleShowCreateForm">
                <ElIcon class="mr-2" :size="14">
                  <Plus />
                </ElIcon>
                Add Bed Types
              </VBtn>
            </MvCardHeader>
          </template>
          <MvDataTable  :columns="columns" :data="state.bedTypes">
            <template #icon="{ row }">
              <img :src="row.icon_url" alt="icon" width="50" height="50">
            </template>
            <template #country="{ row }">
              {{ row?.country?.name }}
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

          <template v-if="state.bedTypes.length" #footer>
            <Pagination :hide-on-single="false" class="data-table-pagination" background layout="prev, pager, next"
              :pagination="state.paginate" @fetch="fetchBedType" />
          </template>
        </ElCard>
      </VCol>
    </VRow>
  </div>

  <BedTypeCreateUpdateForm v-model="state.showCreateUpdateForm" :item="state.selectedItem"
    :on-action="handleActionUpdated" @close="handleActionClose" />
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useStore } from "vuex"
import Pagination from "@/components/Pagination.vue"
import MvDataTable from "@core/components/MvDataTable.vue"
import MvCardHeader from "@core/components/MvCardHeader.vue"
import { Delete, Edit, Plus } from "@element-plus/icons-vue"
import { useMixin, useNotify } from "@core/composable/composable"
import BedTypeCreateUpdateForm from "@/pages/Room/BedTypes/Action/BedTypeCreateUpdateForm.vue"
import { formatDate } from "@core/utils/helpers"

const store = useStore()
const { handleError, confirmAndDelete } = useMixin()
const { notify } = useNotify()

const pagination = computed(() => store.getters["bedTypes/getPagination"]) || [];

const state = reactive({
  bedTypes: '',
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
})

const columns = [
  {
    label: 'Date',
    prop: 'created_at',
    formatter: value => formatDate(value),
  },
  {
    label: 'Name',
    prop: 'name',
  },
  {
    label: 'Capacity',
    prop: 'capacity',
  },
  {
    label: 'Total Bed',
    prop: 'total_bed',
  },
  {
    label: 'Bed Size',
    prop: 'bed_size',
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
  await store.dispatch('bedTypes/fetchBedTypeData', {
    page: state.paginate.current_page,
    per_page: state.paginate.per_page,
  })
  populatePaginate(pagination.value)
}

const handleDelete = async item => {
  await store.dispatch('bedTypes/deleteBedType', item.id)
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
