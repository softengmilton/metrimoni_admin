<template>
  <ElImage
      class="thumbnail-image"
    :style="formattedStyle"
    :src="src"
    fit="cover"
    alt="Brand Image"
  >
    <template #error>
      <div class="image-slot">
        <ElIcon>
          <Picture />
        </ElIcon>
      </div>
    </template>
  </ElImage>
</template>

<script setup>
import { computed, defineProps } from "vue"
import { Picture } from "@element-plus/icons-vue"

const props = defineProps({
  src: {
    type: String,
    default: null,
  },
  width: {
    type: [Number, String],
    default: 70,
  },
  height: {
    type: [Number, String],
    default: 70,
  },
})

const formattedStyle = computed(() => {
  return {
    width: `${props.width}px`,
    height: `${props.height}px`,
  }
})
</script>