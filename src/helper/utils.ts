import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

const windowSize = useWindowSize()

export const isLargeScreen = computed(() => {
  return windowSize.width.value > 1280
})

export const isMiddleScreen = computed(() => {
  return windowSize.width.value < 768
})
