<template>
  <div class="card mb-1 w-full flex-row items-center p-1 px-2 text-sm">
    <div class="flex flex-row">
      <div class="flex items-center">
        <span class="text-p-number mr-2">
          {{ index }}.
        </span>
        <span class="text-rp-name">
          {{ ruleProvider.name }}
        </span>
        <span class="text-rp-size badge badge-sm bg-base-200">
          {{ ruleProvider.ruleCount }}
        </span>
        <span class="text-rp-type gap-2 text-slate-500">
          {{ ruleProvider.behavior }}-{{ ruleProvider.vehicleType }}-{{ $t('updated') }} {{ fromNow(ruleProvider.updatedAt) }}</span>
        <button
        :class="twMerge('text-rp-btn btn btn-circle btn-sm', isUpdating ? 'animate-spin' : '')"
        @click="updateRuleProviderClickHandler"
        >
        <ArrowPathIcon class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { updateRuleProviderAPI } from '@/api'
import { fromNow } from '@/helper'
import { fetchRules } from '@/store/rules'
import type { RuleProvider } from '@/types'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import { twMerge } from 'tailwind-merge'
import { ref } from 'vue'
const isUpdating = ref(false)
const props = defineProps<{
  ruleProvider: RuleProvider
  index: number
}>()

const updateRuleProviderClickHandler = async () => {
  if (isUpdating.value) return

  isUpdating.value = true
  await updateRuleProviderAPI(props.ruleProvider.name)
  fetchRules()
  isUpdating.value = false
}
</script>
