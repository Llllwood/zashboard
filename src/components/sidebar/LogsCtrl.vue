<template>
  <div :class="twMerge('flex flex-col gap-2 p-2', horizontal && 'flex-row flex-wrap pb-0')">
    <div
    :class="twMerge('flex w-logs-l items-center gap-2', horizontal && 'sm:w-auto')"
     > 
    <span class="shrink-0 text-sm w-logs-ls"> {{ $t('logLevel') }}: </span>
    <select
      class="join-item select select-bordered select-sm"
      v-model="logLevel"
      @change="initLogs"
    >
      <option
        v-for="opt in Object.values(LOG_LEVEL)"
        :key="opt"
        :value="opt"
      >
        {{ $t(opt) }}
      </option>
    </select>
    </div>
    <div :class="twMerge(
    'flex w-logs-f items-center gap-2',
    horizontal ? 'w-logs-fh' : '',
    tightMode ? 'w-logs-fht' : ''
    )">
    <span class="shrink-0 text-sm w-logs-fi"> {{ $t('filter') }}: </span>
    <TextInput
      type="text"
      v-model="logFilter"
    />
    <button
      class="btn-bordered btn join-item btn-sm"
      @click="isPaused = !isPaused"
    >
      <component
        :is="!isPaused ? PauseIcon : PlayIcon"
        class="h-4 w-4"
      />
    </button>
   </div>
  </div>
</template>

<script setup lang="ts">
import { LOG_LEVEL } from '@/config'
import { initLogs, isPaused, logFilter, logLevel } from '@/store/logs'
import { PauseIcon, PlayIcon } from '@heroicons/vue/24/outline'
import { twMerge } from 'tailwind-merge'
import TextInput from '../common/TextInput.vue'
import { computed } from 'vue'
import { isMiddleScreen } from '@/helper/utils'

const tightMode = computed(() => isMiddleScreen.value )

defineProps<{
  horizontal?: boolean
}>()
</script>
