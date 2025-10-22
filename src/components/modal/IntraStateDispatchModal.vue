<template>
    <div class="w-full bg-[#f5f5f5] absolute left-0 right-0 top-0 px-4 mx-auto py-4 z-10 h-full">
        <div class="grid mx-auto px-4 mb-4">
            <!-- <div class="flex w-full"></div> -->
            <div class="flex w-full mt-[20px] justify-end">
                <div @click="$emit('handleIntraClose')" class="w-[10%] cursor-pointer">
                    <span class=" border rounded-full flex justify-center items-center w-[30px] h-[30px] font-bold bg-black text-white">X</span>
                </div>
            </div>
        </div>
        <div class="">
           <div class="grid mx-auto px-2 mb-4">
               <RouterLink :to="`/vendor/${company_slug}/intrastate/send/order`" class="w-full h-[128px] grid py-4 px-3 bg-[#FFA2A6] rounded">
                    <span class="flex px-1 py-1 font-josefin font-semibold text-[12px] text-[#000]">
                        <iconify-icon icon="ant-design:thunderbolt-outlined" width="36.69px" height="36.69px" style="color:#9D0208" ></iconify-icon>
                    </span>
                    <div class="grid">
                        <span class="font-josefin font-semibold text-[18.35px] text-[#111111]">Instant Delivery</span>
                        <span class="font-josefin font-light text-[13px] text-[#4F4F4F]">Agent takes only your package and delivers instantly</span>
                    </div>
                </RouterLink>
                <RouterLink :to="`/vendor/${company_slug}/intrastate/schedule/order`" class="mt-3 w-full h-[128px] grid py-4 px-3 bg-[#FFEBEB] rounded">
                    <span class="flex px-1 py-1 font-josefin font-semibold text-[12px] text-[#000]">
                        <img src="../../assets/images/icons/timer_24px.png" alt="">
                   </span>
                    <div class="grid">
                        <span class="font-josefin font-semibold text-[18.35px] text-[#111111]">Schedule Delivery</span>
                        <span class="font-josefin font-light text-[13px] text-[#4F4F4F]">Agent comes to pickup on your specified date & time</span>
                    </div>
                </RouterLink>
           </div>
        </div> 
        
    </div>
</template>
<script setup>
  import { ref, defineEmits, onMounted } from 'vue';
import { useEncryption } from '@/composables/useEncryption'
 import { useRoute } from 'vue-router'

const { getFromLocalStorage } = useEncryption();
const emit = defineEmits(['handleIntraClose']);
const route = useRoute()
const company_name = ref("");
const company_slug = ref("");

onMounted(() =>{
    const slug = route.params.slug
    const cachedVendor = getFromLocalStorage(`vendor_${slug}`)
    if (cachedVendor) {
        let companydata = JSON.parse(cachedVendor)
        company_name.value = companydata['company_name'];
        company_slug.value = companydata['slug'];
       
        return
    }
})
</script>