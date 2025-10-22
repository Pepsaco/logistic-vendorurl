<template>
  <div class="w-screen h-screen fixed left-0 right-0 top-0 px-4 py-4 z-10">
    <div class="grid mx-auto px-4">
      <div class="flex w-full mt-[20px]">
        <div @click="$emit('closemap')" class="w-[10%] cursor-pointer">X</div>
      </div>
    </div>
    <div ref="mapElement" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineProps, defineEmits } from 'vue'

const emit = defineEmits(["closemap"])
const props = defineProps({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
})

const map = ref(null)
const marker = ref(null)
const mapElement = ref(null)

const initMap = () => {
  if (!window.google || !window.google.maps) {
    console.error('Google Maps API is not loaded')
    return
  }

  const mapOptions = {
    center: { lat: props.lat, lng: props.lng },
    zoom: 17,
  }

  map.value = new google.maps.Map(mapElement.value, mapOptions)
  marker.value = new google.maps.Marker({
    position: { lat: props.lat, lng: props.lng },
    map: map.value,
  })
}

const updatePosition = (lat, lng) => {
  if (map.value && marker.value) {
    const newCenter = { lat, lng }
    map.value.setCenter(newCenter)
    marker.value.setPosition(newCenter)
  }
}

watch(() => props.lat, (newLat) => updatePosition(newLat, props.lng))
watch(() => props.lng, (newLng) => updatePosition(props.lat, newLng))

onMounted(() => {
  initMap()
})
</script>
