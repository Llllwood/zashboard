<template>
  <div class="card mb-1 w-full flex-row items-center p-1 px-2 text-sm">
    <span class="text-r-number mr-2"
          :style="{
              display: 'inline-block',
              width: '.88rem',
              color: '#696969'
            }">
      {{ index }}.
    </span>
    <span class="text-r-type"
          :style="{
              display: 'inline-block',
              width: '7rem',
              'margin-left': '.3rem',
              'margin-right': '.3rem',
              'line-height': '1.45rem',
              color: '#100000'
        }">
      [{{ rule.type }}]
    </span>
        <span v-if="rule.payload" 
          class="text-r-name"
          :style="{
              display: 'inline-block',
              width: '8rem',
              'margin-left': '.3rem',
              color: '#000080'
              }">
      {{ rule.payload }}
    </span>
    <span v-if="typeof rule.size === 'number' && rule.size !== -1"
          class="text-r-size badge badge-sm bg-base-200">
        {{ rule.size }}
    </span>
      <span class="text-r-arrow"
          :style="{
              display: 'inline-block',
              width: '.5rem',
              'margin-left': '.3rem',
              color: '#696969'
              }">
      >
    </span>
    <span class="text-r-proxy"
          :style="{
              display: 'inline-block',
              'min-width': '4rem',
              'margin-left': '1.2rem',
              ...getStyleFor(rule)
              }">
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
  