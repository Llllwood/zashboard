<template>
  <div class="card mb-1 block p-2 text-sm">
    <span class="text-r-number mr-2">{{ index }}.</span>
    <span class="text-r-type">[{{ rule.type }}]</span>
    <span
      class="text-r-name"
      v-if="rule.payload"
      >{{ rule.payload }}</span
    >
    <span class="text-r-arrow">></span>
    <span class="text-r-proxy">{{ rule.proxy }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Rule } from '@/types'

defineProps<{
  rule: Rule
  index: number
}>()
</script>
