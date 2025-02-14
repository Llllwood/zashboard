<template>
  <CollapseCard :name="proxyGroup.name">
    <template v-slot:title>
      <div class="flex items-center gap-2 pr-6">
        <div class="flex flex-1 items-center gap-1">
          <ProxyIcon
            v-if="proxyGroup.icon"
            :icon="proxyGroup.icon"
          />
          <span class="text-lg font-medium">{{ proxyGroup.name }}</span>
          <span class="text-xs pg-all">({{ proxyGroup.all?.length }})</span>
          <span class="text-xs pg-type text-slate-500">: {{ proxyGroup.type }}</span>
          <span
            class="text-sm max-sm:hidden"
            v-if="proxyGroup.now"
          >
            -> {{ proxyGroup.now }}
          </span>
        </div>
        <div class="shrink-0">[{{ prettyBytesHelper(downloadTotal) }}/s]</div>
        <LatencyTag
          :class="twMerge('z-10 bg-base-200/40', isLatencyTesting ? 'animate-pulse' : '')"
          :name="proxyGroup.now"
          @click.stop="handlerLatencyTest"
        />
      </div>
      <div
        class="flex items-center gap-2 text-sm sm:hidden"
        v-if="proxyGroup.now"
      >
        -> {{ proxyGroup.now }}
      </div>
    </template>
    <template v-slot:preview>
      <ProxyPreview
        :nodes="sortedProxies"
        :now="proxyGroup.now"
      />
    </template>
    <template v-slot:content>
      <ProxyNodeGrid>
        <ProxyNodeCard
          v-for="node in sortedProxies"
          :key="node"
          :name="node"
          :active="node === proxyGroup.now"
          @click="selectProxy(proxyGroup.name, node)"
        />
      </ProxyNodeGrid>
    </template>
  </CollapseCard>
</template>

<script setup lang="ts">
import { prettyBytesHelper, sortAndFilterProxyNodes } from '@/helper'
import { activeConnections } from '@/store/connections'
import { proxyGroupLatencyTest, proxyMap, selectProxy } from '@/store/proxies'
import { twMerge } from 'tailwind-merge'
import { computed, ref } from 'vue'
import CollapseCard from '../common/CollapseCard.vue'
import LatencyTag from './LatencyTag.vue'
import ProxyIcon from './ProxyIcon.vue'
import ProxyNodeCard from './ProxyNodeCard.vue'
import ProxyNodeGrid from './ProxyNodeGrid.vue'
import ProxyPreview from './ProxyPreview.vue'

const props = defineProps<{
  name: string
}>()

const proxyGroup = computed(() => proxyMap.value[props.name])
const sortedProxies = computed(() => {
  return sortAndFilterProxyNodes(proxyGroup.value.all ?? [])
})
const isLatencyTesting = ref(false)
const handlerLatencyTest = async () => {
  if (isLatencyTesting.value) return

  isLatencyTesting.value = true
  try {
    await proxyGroupLatencyTest(props.name)
    isLatencyTesting.value = false
  } catch {
    isLatencyTesting.value = false
  }
}
const downloadTotal = computed(() => {
  const speed = activeConnections.value
    .filter((conn) => conn.chains.includes(props.name))
    .reduce((total, conn) => total + conn.downloadSpeed, 0)

  return speed
})
</script>
