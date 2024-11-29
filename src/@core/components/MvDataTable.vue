<template>
  <ElTable
    class="data-table"
    :data="data"
    stripe
    style="width: 100%"
    :empty-text="emptyText"
  >
    <ElTableColumn
      v-for="(item, index) in columns"
      :key="`table-column-${index}`"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
    >
      <template #default="{ row }">
        <slot
          :name="item.prop"
          :row="row"
        >
          <span v-html="tableColumnFormatter(item.prop, row, item)" />
        </slot>
      </template>
    </ElTableColumn>
  </ElTable>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  emptyText: {
    type: String,
    default: 'No data found',
  },
})

const tableColumnFormatter = (prop, item, column) => {

  if (!column.formatter) {
    return item[prop]
  }

  return column.formatter(item[prop])
}
</script>