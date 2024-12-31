<template>
  <div class="card mb-1 w-full flex-row items-center p-1 px-2 text-sm">
    <span class="text-r-number mr-2">
      {{ index }}.
    </span>
    <span class="text-r-type">
      [{{ rule.type }}]
    </span>
    <div  class="w-rulecrad-name">
    <span v-if="rule.payload"
          class="text-r-name">
      {{ rule.payload }}
    </span>
    <span v-if="typeof rule.size === 'number' && rule.size !== -1"
          class="text-r-size badge badge-sm bg-base-200">
        {{ rule.size }}
    </span>
    </div>
    <span class="text-r-arrow">
      >
    </span>
    <span class="text-r-proxy" :style="getStyleFor(rule)">
      {{ rule.proxy }}
    </span>
  </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import type { Rule } from '@/types'
  
  const colorMap = {
    _default: '#4272FF',
    DIRECT: '#24a824',
    REJECT: '#F4606C',
  }
  
  function getStyleFor({ proxy }) {
    let color = colorMap._default
    if (colorMap[proxy]) {
      color = colorMap[proxy]
    }
    return { color }
  }
  
  defineProps<{
    rule: Rule
    index: number
  }>()
  </script>
  