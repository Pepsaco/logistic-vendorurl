<template>
    <div class="w-full bg-[#f5f5f5] fixed left-0 right-0 bottom-0 px-4 mx-auto py-4 z-10 overflow-y-scroll h-[50%]">
        <div class="grid mx-auto px-4">
            <div class="flex w-full"></div>
            <div class="flex w-full mt-[20px]">
                <div @click="$emit('CloseReceiver')" class="w-[10%] cursor-pointer">X</div>
            </div>
        </div>
        <div class="">
            <div class="">
                <div class="flex justify-center px-2 py-5">
                    <span class="font-poppins text-[14px] text-center w-[90%] font-semibold"> Receivers Confirmation Code</span>
                </div>
                <div class="grid justify-center px-4 ">
                    <button @click="copyToClipboard" class="font-poppins text-[12px] font-bold">Copy</button>
                    <div class="mt-6 font-josefin font-bold text-[20px]"> {{custToken}} </div>
                </div>
            </div>
        </div>
        <div v-if="ShowFlashSuccess" class="fixed bottom-[74px] left-0 right-0 bg-[#01947a] font-poppins font-bold text-[12px] w-full h-[40px] p-2 flex justify-center text-white">{{ ShowFlashSuccess }}</div>
        <div v-if="ShowFlashError" class="fixed bottom-[74px] left-0 right-0 bg-[#f12222] font-poppins font-bold text-[12px] w-full h-[40px] p-2 flex justify-center text-white">{{ ShowMessage }}</div>
    </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted  } from 'vue';
import axiosinstance from '@/auth';
import Swal from "sweetalert2";

const props = defineProps({ orderno: String });
const emit = defineEmits(["CloseReceiver"]);


const ShowFlashSuccess = ref(false);
const ShowFlashError = ref(false);

const processing = ref(false);
const custToken = ref('');
onMounted(  async () => {
     try {
        const res = await axiosinstance.post('/dispatch/order/i/get/delivery/code',{
            orderid:props.orderno,
        });
        console.log(res)
        custToken.value = res.data.deliverycode
    } catch (error) {
        
    }
});
 
 const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(custToken.value)
        ShowFlashSuccess.value = "Copied"
        // // Reset success message after 2 seconds
        setTimeout(() => {
       ShowFlashSuccess.value = false
        }, 2000)
    } catch (err) {
        console.error('Failed to copy:', err)
    }
 }
</script>

<style lang="scss" scoped>

</style>