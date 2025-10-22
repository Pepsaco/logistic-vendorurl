<template>
  <div class="mb-2 px-2 py-3">
    <button
      type="button"
      class="inset-shadow-sm w-full p-3 flex items-center justify-between cursor-pointer text-left"
      @click="toggle"
      :aria-expanded="isOpen.toString()"
    >
      <span class="font-poppins text-[#3A3A3A] text-[14px]">{{ title }}</span>
      <component :is="isOpen ? ChevronUpIcon : ChevronDownIcon" class="w-5 h-5" />
    </button>

    <transition name="fade">
      <div v-if="isOpen" class="p-3 border-t border-[#3A3A3A]">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  title: { type: String, required: true },
  defaultOpen: { type: Boolean, default: false } // 👈 Add this
})

const isOpen = ref(false)

onMounted(() => {
  isOpen.value = props.defaultOpen // 👈 Set initial state
})

function toggle() {
  isOpen.value = !isOpen.value
}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
