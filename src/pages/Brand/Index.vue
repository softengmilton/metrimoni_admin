<template>
  <div>
    <VRow>
      <VCol cols="12">
        <ElCard class="data-table-wrapper">
          <template #header>
            <MvCardHeader>
              <VBtn
                color="primary"
                variant="tonal"
                @click="handleShowCreateForm"
              >
                <ElIcon
                  class="mr-2"
                  :size="14"
                >
                  <Plus />
                </ElIcon>
                Add Brand
              </VBtn>
            </MvCardHeader>
          </template>
            
          <MvDataTable
            v-if="state.brands.length"
            :columns="columns"
            :data="state.brands"
          >
            <template #image="{ row }">
              <MvThumnail
                :src="row?.logo?.url"
                width="60"
                height="60"
              />
            </template>
            <template #actions="{ row }">
              <VBtn
                class="mr-2"
                type="reset"
                size="small"
                color="primary"
                variant="tonal"
                @click="handleAction('update', row)"
              >
                <ElIcon :size="14">
                  <Edit />
                </ElIcon>
              </VBtn>

              <VBtn
                type="reset"
                size="small"
                color="error"
                variant="tonal"
                @click="handleAction('delete', row)"
              >
                <ElIcon :size="14">
                  <Delete />
                </ElIcon>
              </VBtn>
            </template>
          </MvDataTable>
            
          <template
            v-if="state.brands.length"
            #footer
          >
            <Pagination
              :hide-on-single="false"
              class="data-table-pagination"
              background
              layout="prev, pager, next"
              :pagination="state.paginate"
              @fetch="fetchBrands"
            />
          </template>
        </ElCard>
      </VCol>
    </VRow>
  </div>

  <BrandCreateUpdateForm
    v-model="state.showCreateUpdateForm"
    :item="state.selectedItem"
    :on-action="handleActionUpdated"
    @close="handleActionClose"
  />
</template>

<script setup>
import { computed, reactive, onMounted } from 'vue'
import { Edit, Picture, Delete, Plus } from "@element-plus/icons-vue"
import { useStore } from "vuex"
import { formatDate } from "@core/utils/formatters"
import { useNotify, useMixin } from "@core/composable/composable"
import BrandCreateUpdateForm from "@/pages/Brand/Action/BrandCreateOrUpdateForm.vue"
import Pagination from "@/components/Pagination.vue"

const store = useStore()
const { notify } = useNotify()

const { formatNumber, handleError, confirmAndDelete } = useMixin()

const pagination = computed(() => store.getters["brand/getPagination"])

const state = reactive({
  brands: computed(() => store.getters["brand/getData"]),
  loading: computed(() => store.getters["brand/isLoading"]),

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
    formatter: data => formatDate(data),
  },
  {
    label: 'Image',
    prop: 'image',
  },
  {
    label: 'Name',
    prop: 'name',
  },
  {
    label: 'Slug',
    prop: 'slug',
  },
  {
    label: 'Actions',
    prop: 'actions',
    fixed: 'right',
  },
]

const handleShowCreateForm = () => {
  state.showCreateUpdateForm = true
  state.selectedItem = {}
}

const handleActionClose = () => {
  state.showCreateUpdateForm = false
  state.selectedItem = {}
}

const handleUpdate = item => {
  state.selectedItem = item
  state.showCreateUpdateForm = true
}

const populatePaginate = () => {
  state.paginate = {
    total: pagination.value.total,
    current_page: pagination.value.current_page,
    per_page: pagination.value.per_page,
    from: pagination.value.from,
    to: pagination.value.to,
  }
}

const fetchBrands = async () => {
  await store.dispatch('brand/fetchPaginated', {
    page: state.paginate.current_page,
    per_page: state.paginate.per_page,
  })
  populatePaginate()
}

const handleDelete = async item => {
  await store.dispatch('brand/delete', item.id)
    .then(response => {
      notify.success(response.message || 'Brand deleted successfully')
      fetchBrands()
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
  fetchBrands()
}

const mounted = async () => {
  await fetchBrands()
}

onMounted(mounted)
</script>