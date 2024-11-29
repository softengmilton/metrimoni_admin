<template>
  <div>
    <VRow>
      <VCol cols="12">
        <ElCard class="data-table-wrapper">
          <template #header>
            <MvCardHeader />
          </template>

          <MvDataTable
            v-if="state.permissions.length"
            :columns="columns"
            :data="state.permissions"
          />

          <template
            v-if="state.permissions.length"
            #footer
          >
            <Pagination
              :hide-on-single="false"
              class="data-table-pagination"
              background
              layout="prev, pager, next"
              :pagination="state.paginate"
              @fetch="fetchPermissions"
            />
          </template>
        </ElCard>
      </VCol>
    </VRow>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useStore } from "vuex"
import Pagination from "@/components/Pagination.vue"
import { formatDate } from "@core/utils/formatters"

const store = useStore()

const pagination = computed(() => store.getters["permission/getPagination"])

const state = reactive({
  permissions: computed(() => store.getters["permission/getPermissions"]),
  loading: computed(() => store.getters["permission/isLoading"]),

  paginate: {
    total: 0,
    current_page: 1,
    per_page: 10,
    from: 0,
    to: 0,
  },
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
    label: 'Slug',
    prop: 'slug',
  },
  {
    label: 'Subject',
    prop: 'subject',
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

const fetchPermissions = async () => {
  await store.dispatch('permission/fetchPermissionData', {
    page: state.paginate.current_page,
    per_page: state.paginate.per_page,
  })
  populatePaginate(pagination.value)
}

const mounted = async () => {
  await fetchPermissions()
}

onMounted(mounted)
</script>