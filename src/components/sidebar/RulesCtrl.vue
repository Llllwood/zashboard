<template>
  <div :class="twMerge(`flex flex-col gap-2 p-2`, horizontal && 'flex-row pb-0', tightMode ? 'flex-col' : '')">
    <div
      :class="twMerge('flex flex-col-reverse gap-2', horizontal && 'flex-row')"
      v-if="ruleProviderList.length"
    >
      <div
        role="tablist"
        class="tabs-boxed tabs tabs-sm"
      >
        <a
          role="tab"
          class="tab"
          v-for="type in RULE_TAB_TYPE"
          :key="type"
          :class="{ 'tab-active': rulesTabShow === type }"
          @click="rulesTabShow = type"
        >
          {{ $t(type) }}</a
        >
      </div>
      <div
        class="flex flex-col gap-2"
        v-if="rulesTabShow === RULE_TAB_TYPE.PROVIDER"
      >
        <button
          :class="twMerge('btn btn-sm', isUpgrading ? 'animate-pulse' : '')"
          @click="handlerClickUpgradeAllProviders"
        >
          {{ $t('updateAllProviders') }}
        </button>
      </div>
    </div>
    <div :class="twMerge('w-rules-f', horizontal ? 'w-rules-fh' : '', tightMode ? 'w-rules-fht' : '')">
    <TextInput v-model="rulesFilter" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { updateRuleProviderAPI } from '@/api'
import { rulesTabShow } from '@/composables/rules'
import { RULE_TAB_TYPE } from '@/config'
import { fetchRules, ruleProviderList, rulesFilter } from '@/store/rules'
import { twMerge } from 'tailwind-merge'
import { ref, computed } from 'vue'
import TextInput from '../common/TextInput.vue'
import { isMiddleScreen } from '@/helper/utils'

const tightMode = computed(() => isMiddleScreen.value )

defineProps<{
  horizontal?: boolean
}>()

const isUpgrading = ref(false)
const handlerClickUpgradeAllProviders = async () => {
  if (isUpgrading.value) return
  isUpgrading.value = true
  try {
    await Promise.all(
      ruleProviderList.value.map((provider) => updateRuleProviderAPI(provider.name)),
    )
    await fetchRules()
    isUpgrading.value = false
  } catch {
    await fetchRules()
    isUpgrading.value = false
  }
}
</script>
