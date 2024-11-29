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
                Add Role
              </VBtn>
            </MvCardHeader>
          </template>
            
          <MvDataTable
            v-if="state.roles.length"
            :data="state.roles"
            :columns="columns"
          >
            <template #permissions="{ row }">
              <span
                v-for="(permission, index) in row?.permissions"
                :key="index"
                class="mr-1"
              >
                <ElTag
                  type="primary"
                  size="small"
                >
                  {{ permission.name }}
                </ElTag>
              </span>
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
            v-if="state.roles.length"
            #footer
          >
            <Pagination
              :hide-on-single="false"
              class="data-table-pagination"
              background
              layout="prev, pager, next"
              :pagination="state.paginate"
              @fetch="fetchRoles"
            />
          </template>
        </ElCard>
      </VCol>
    </VRow>
  </div>

  <RoleCreateUpdateForm
    v-model="state.showCreateUpdateForm"
    :item="state.selectedItem"
    :permissions="permissions"
    :on-action="handleActionUpdated"
    @close="handleActionClose"
  />
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { Edit, Delete, Plus } from "@element-plus/icons-vue"
import { useStore } from "vuex"
import { formatDate } from "@core/utils/formatters"
import { useNotify, useMixin } from "@core/composable/composable"
import RoleCreateUpdateForm from "@/pages/Acl/Group/Action/RoleCreateUpdateForm.vue"
import Pagination from "@/components/Pagination.vue"
import { collect } from "collect.js"

const store = useStore()
const { notify } = useNotify()

const { handleError, confirmAndDelete } = useMixin()

const pagination = computed(() => store.getters["role/getPagination"])

const permissions = computed(()=>{

  let permissions = store.getters["permission/allPermissions"]
  if (!permissions.length) return

  const customizedPermissions = collect(permissions).groupBy('subject').all()
  let permissionWithGroup = []

  for (let permissionGroup in customizedPermissions){

    const permission = {
      label: permissionGroup,
      id: permissionGroup,
      children: customizedPermissions[permissionGroup].items.map(children => ({
        label: children.name,
        id: children.id,
      })),
    }

    permissionWithGroup.push(permission)
  }

  return permissionWithGroup

})

const state = reactive({
  roles: computed(() => store.getters["role/getRoles"]),
  loading: computed(() => store.getters["role/isLoading"]),

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
    prop: "created_at",
    label: "Date",
    width: 150,
    formatter: value => formatDate(value),
  },
  {
    prop: "name",
    label: "Name",
    width: 150,
  },
  {
    prop: "description",
    label: "Description",
  },
  {
    prop: "permissions",
    label: "Permissions",
  },
  {
    fixed: "right",
    label: "Actions",
    prop: "actions",
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

const fetchRoles = async () => {
  await store.dispatch('role/fetchRoleData', {
    page: state.paginate.current_page,
    per_page: state.paginate.per_page,
  })
  populatePaginate()
}

const fetchPermissions = async () => {
  await store.dispatch("permission/fetchAllPermissions")
}

const handleDelete = async item => {
  await store.dispatch('role/deleteRole', item.id)
    .then(response => {
      notify.success(response.message || 'Role deleted successfully')
      fetchRoles()
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
  fetchRoles()
}

const mounted = async () => {
  await fetchRoles()
  await fetchPermissions()
}

onMounted(mounted)
</script>