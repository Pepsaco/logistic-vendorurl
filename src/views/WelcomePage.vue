<template>
    <div class="w-full h-screen overflow-hidden bg-white
    items-center grid">
        <div v-if="loading" class="text-gray-500">Loading vendor...</div>

        <div v-else-if="error" class="text-red-600">
          {{ error }}
        </div>
     <div class=" h-[60%] w-full grid justify-center items-bottom">
        <span class=" w-full flex justify-center rounded-full">
          <img v-if="company_logo" :src="`${company_logo}`" alt="" class="w-[100px] h-[100px]">
          <img v-else src="../assets/images/pepsa_logo.png" alt="" class="w-[100px] h-[100px]">
        </span>
            <span class="font-rubik font-bold text-[18px]">Welcome to {{company_name}}</span>
      </div>
      <!-- Buttons Section -->
      <div class="w-full h-[20%] flex  px-4 mx-auto">
        <div class="w-[46%] mr-[34px]">
          <a href="#" @click="navigateTo('/login')" class="flex justify-center gap-[6px] py-[8px] px-[11px] rounded-[6px] bg-[#9D0208] text-white font-darker text-[16px] font-semibold">
                Trace Package
          </a>
        </div>
        <div class="w-[46%] ">
          <RouterLink  :to="`/vendor/${company_slug}/send/item`" class="flex justify-center border border-[#9D0208] py-2 px-[11px] text-[#9D0208] font-darker text-[16px] font-semibold rounded-[6px]">
             Send Item
          </RouterLink>
        </div>
      </div>
      <div class=" h-[20%] w-full grid justify-center items-end">
            <span>Powered by Pepsa.co</span>
      </div>
    </div>
  </template>
  
<script setup>
  import { useNavigation } from '@/composables/useNavigation';
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import axios from 'axios'
  import { useHead } from '@vueuse/head' // For SEO
import { useEncryption } from '@/composables/useEncryption'

const { saveToLocalStorage, getFromLocalStorage } = useEncryption()

 
const { navigateTo } = useNavigation();


const route = useRoute()
const router = useRouter()

const vendor = ref(null)
const loading = ref(true)
const error = ref(null)
const company_name = ref("");
const company_slug = ref("");
const company_logo = ref("");
const fetchVendor = async () => {
  const slug = route.params.slug

  // ✅ Step 1: Try to get from localStorage
  const cachedVendor = getFromLocalStorage(`vendor_${slug}`)
  if (cachedVendor) {
    let companydata = JSON.parse(cachedVendor)
    vendor.value = JSON.parse(cachedVendor)
    company_name.value = companydata['company_name']
    company_slug.value = companydata['slug']
    company_logo.value = companydata['profile_photo']
    loading.value = false
    setSEO(vendor.value)
    return
  }

  // ✅ Step 2: Otherwise fetch from API
  try {
    const res = await axios.get(`http://127.0.0.1:8080/api/vendors/${slug}`)
    // console.log(res.data.data.company_name);return
    vendor.value = res.data.data
    company_name.value = res.data.data.company_name
    company_logo.value = res.data.data.profile_photo
    // ✅ Step 3: Cache it for future use
    saveToLocalStorage(`vendor_${slug}`, JSON.stringify(vendor.value))

    // ✅ Step 4: Set SEO metadata
    setSEO(vendor.value)
  } catch (err) {
    console.error(err)
    // router.replace('/404') // Redirect to 404 page
  } finally {
    loading.value = false
  }
}

const setSEO = (vendorData) => {
  useHead({
    title: `${vendorData.name} | Vendor`,
    meta: [
      { name: 'description', content: vendorData.description || 'View vendor details and products.' },
      { property: 'og:title', content: vendorData.name },
      { property: 'og:description', content: vendorData.description || '' },
      { property: 'og:image', content: vendorData.logo },
    ],
  })
}
 
onMounted(() =>{
    fetchVendor(); 
    // getCountryCodes()
})

</script>
  