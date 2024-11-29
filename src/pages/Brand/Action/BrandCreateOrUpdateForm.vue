<template>
  <ElDialog
    v-model="actionState"
    modal
    :close-on-click-modal="false"
    class="user-add-form"
    :title="`${state.isUpdating ? 'Update' : 'Add new'} Brand`"
  >
    <ElForm
      v-loading="state.isLoading"
      label-width="120px"
      label-position="top"
      @submit.prevent="handleSubmit"
    >
      <ElFormItem
        label="Name"
        :error="handleError(state.errors?.name)"
      >
        <ElInput
          v-model="state.form.name"
          placeholder="Name"
          @input="state.errors.name = []"
        />
      </ElFormItem>

      <ElFormItem label="Brand Image">
        <ElUpload
          action="#"
          :on-change="handleImageSelect"
          :file-list="state.fileList"
          list-type="picture-card"
          :auto-upload="false"
          :limit="1"
        >
          <ElIcon>
            <Plus />
          </ElIcon>
          <template #file="{ file }">
            <div>
              <img
                class="el-upload-list__item-thumbnail"
                :src="file?.url"
                alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <ElIcon><ZoomIn /></ElIcon>
                </span>
                <span
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <ElIcon><Delete /></ElIcon>
                </span>
              </span>
            </div>
          </template>
        </ElUpload>
        <ElDialog v-model="dialogVisible">
          <ElImage
            w-full
            :src="dialogImageUrl"
            alt="Preview Image"
          />
        </ElDialog>
      </ElFormItem>
    </ElForm>

    <template #footer>
      <VBtn
        class="mr-2"
        size="small"
        color="error"
        variant="tonal"
        @click="handleActionClose"
      >
        Cancel
      </VBtn>
      <VBtn
        :disabled="state.isLoading"
        size="small"
        :loading="state.loading"
        color="primary"
        variant="tonal"
        @click="handleSubmit"
      >
        Submit
      </VBtn>
    </template>
  </ElDialog>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { isEmpty } from "lodash"
import { useStore } from "vuex"
import { useNotify } from "@core/composable/composable"
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue"

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  isUpdating: {
    type: Boolean,
    default: false,
  },

  item: {
    type: Object,
  },

  onAction: {
    type: Function,
  },
})

const emit = defineEmits(['update:modelValue'])

const store = useStore()
const { notify } = useNotify()

const formState = {
  id: null,
  name: '',
  image: null,
}

const state = reactive({
  isUpdating: false,
  isLoading: false,
  errors: {},
  treeSelectKey: 0,
  fileList: [],
  images: [],
  form: { ...formState },
})

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const actionState = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

const handleActionClose = () => {
  actionState.value = false
}

const handleError = error => {
  return error?.length ? error[0] : ''
}

const handleRemove = file => {
  state.fileList.splice(state.fileList.indexOf(file), 1)
  state.form.image = null
}

const handleImageSelect = (file, fileList) => {
  state.fileList = [...fileList]
  state.images = [...fileList]
  
  state.form.image = file.raw
}

const handlePictureCardPreview = file => {
  dialogImageUrl.value = file?.url
  dialogVisible.value = true
}

const handleSubmissionSuccess = response => {

  notify.success(response.message || `Brand ${state.isUpdating ? 'updated' : 'created'} successfully`)

  if (typeof props.onAction === 'function') {
    return props.onAction(response, state.isUpdating)
  }

  state.form = { ...formState }
  state.fileList = []
  state.images = []
  actionState.value = false
}

const createBrand = async data => {

  await store.dispatch('brand/store', data).then(response => {

    state.isLoading = false
    handleSubmissionSuccess(response)

  }).catch(error => {

    state.isLoading = false
    notify.error('Failed to create Brand')
    state.errors = error.response.data.errors

  })
}

const updateBrand = async data => {
  await store.dispatch('brand/update', { id: data.id, data })
    .then(response => {
      state.isLoading = false
      handleSubmissionSuccess(response)
    })
    .catch(error => {
      state.isLoading = false
      notify.error(error.response.data.message || 'Failed to update Brand')
      state.errors = error.response.data.errors
    })
}

const handleSubmit = async () => {
  state.isLoading = true

  if (state.isUpdating) {
    return updateBrand(state.form)
  }

  return await createBrand(state.form)
}

const populateBrandForm = item => {
  state.isLoading = true

  state.form = {
    id: item.id,
    name: item.name,
    image: null,
  }
  state.isUpdating = true
  state.isLoading = false
}

watch(() => props.item, newValue => {

  state.errors = {}

  if (!isEmpty(newValue)) {
    return populateBrandForm(newValue)
  }

  state.form = { ...formState }

  state.isUpdating = false
}, { immediate: true })

const mounted = () => {
  state.errors = {}
}

onMounted(mounted)
</script>