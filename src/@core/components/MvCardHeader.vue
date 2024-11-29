<template>
  <div class="card-header">
    <slot name="title">
      <h2>{{ cardTitle }}</h2>
    </slot>
      
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  title: String,
})

const route = useRoute()

const cardTitle = computed(() => props.title ?? route?.meta?.title)
</script>