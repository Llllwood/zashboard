<template>
  <div
    ref="cardRef"
    :class="
      twMerge(
        'relative flex cursor-pointer flex-wrap items-center justify-end gap-1 rounded-md bg-base-200 p-2',
        active ? 'bg-primary text-primary-content' : 'sm:hover:bg-base-300',
        isTruncated && 'tooltip tooltip-bottom',
      )
    "
    :data-tip="node.name"
    @mouseenter="checkTruncation"
  >
    <ProxyIcon
      v-if="node.icon"
      :icon="node.icon"
      :fill="active ? 'fill-primary-content' : 'fill-base-content'"
    />
    <div
      :class="
        twMerge(
          'flex-1 whitespace-nowrap text-xs md:text-sm',
          truncateProxyName && 'truncate',
          tightMode && 'pr-6',
        )
      "
      ref="nameRef"
    >
      {{ node.name }}
    </div>
    <span
      :class="[
        'text-xs tracking-tight',
        tightMode ? 'absolute text-type-bottom text-type-right scale-75' : '',
        active? 'text-type-t' : 'text-type-f'
    ]">
      {{ typeDescription }}
    </span>
    <LatencyTag
      :class="['w-8', isLatencyTesting ? 'animate-pulse' : '', tightMode ? 'absolute right-2 top-1' : '']"
      :name="node.name"
      @click.stop="handlerLatencyTest"
    />
  </div>
</template>

<script setup lang="ts">
import { isMiddleScreen } from '@/helper/utils'
import { getIPv6ByName, proxyLatencyTest, proxyMap } from '@/store/proxies'
import { IPv6test, truncateProxyName, twoColumnProxyGroup } from '@/store/settings'
import { twMerge } from 'tailwind-merge'
import { computed, ref } from 'vue'
import LatencyTag from './LatencyTag.vue'
import ProxyIcon from './ProxyIcon.vue'

const props = defineProps<{
  name: string
  active?: boolean
}>()

const nameRef = ref<HTMLDivElement | null>(null)
const isTruncated = ref(false)
const checkTruncation = () => {
  if (nameRef.value) {
    const { scrollWidth, clientWidth } = nameRef.value

    isTruncated.value = scrollWidth > clientWidth
  }
}

const node = computed(() => proxyMap.value[props.name])
const isLatencyTesting = ref(false)
const typeFormatter = (type: string) => {
  type = type.toLowerCase()
  type = type.replace('shadowsocks', 'ss')
  type = type.replace('hysteria', 'hy')
  type = type.replace('wireguard', 'wg')

  return type
}
const typeDescription = computed(() => {
  const type = typeFormatter(node.value.type)
  const isV6 = IPv6test.value && getIPv6ByName(node.value.name) ? 'IPv6' : ''
  const isUDP = node.value.udp ? 'udp' : ''

  return [type, isUDP, isV6].filter(Boolean).join('/')
})
const handlerLatencyTest = async () => {
  if (isLatencyTesting.value) return

  isLatencyTesting.value = true
  try {
    await proxyLatencyTest(props.name)
    isLatencyTesting.value = false
  } catch {
    isLatencyTesting.value = false
  }
}
const tightMode = computed(() => isMiddleScreen.value )
</script>

<style scoped>
.tooltip:before {
  z-index: 20;
}
</style>
