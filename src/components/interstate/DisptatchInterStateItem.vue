<template>
     <div class="w-screen fixed left-0 right-0 top-0 px-4 mx-auto py-4 bg-white z-10 overflow-y-scroll h-full mb-100">
        <div class="grid mx-auto px-4">
            <div class="flex w-full">
                <a href="" class="">
                    <!-- <img src="../../assets/images/Pepsa_logo_small.png" alt=""> -->
                </a> 
            </div>
            <div class="flex w-full mt-[20px]">
                <div @click="$emit('Closeform')" class="w-[10%]">X</div>
                <span class="font-poppins text-[14px] text-center w-[90%] font-semibold">Item Information</span>
            </div> 
        </div>
        <form action="" method="post" @submit.prevent="submitItemsDetails" class="mb-[100px]">
            <!-- <div class="mt-4"> <span class="font-bold text-[18px]">Pickup Details</span> </div> -->
            <div class="grid mt-2">
                <label for="name" class="font-medium text-[18px] p-2 leading-[130%]">Name <span class="text-[#F00]"></span></label>
                <input type="text" name="" id="name" v-model="name" class="w-full border border-[#898F8F] rounded-[7px] p-3" >
            </div>
            <div class="grid mt-2">
                <label for="weight" class="font-medium text-[18px] p-2 leading-[130%]">Weight (kg) <span class="text-[#F00]">*</span></label>
                <input type="text" inputmode="number" name="" id="weight" v-model="weight"  class="w-full border border-[#898F8F] rounded-[7px] p-3" required>
            </div>
            <div class="grid mt-2">
                <label for="dimension" class="font-medium text-[18px] p-2 leading-[130%]">Dimension (L × W × H) </label>
                <input type="text" name="" id="dimension" v-model="dimension" class="w-full border border-[#898F8F] rounded-[7px] p-3" >
            </div>
            <div class="grid mt-2">
                <label for="iem_handling" class="font-medium text-[18px] p-2 leading-[130%]">Handling <span class="text-[#F00]">*</span></label>
                <select
                name="Handling"
                id="iem_handling"
                v-model="itemHandling"
                class="my-[10px] px-[18px] h-[52px] items-center flex justify-between rounded-[10px] border-[2px] border-[#F3F3F3] bg-white w-full"
                required
                >
                    <option value="" selected>Select</option>
                    <option value="grocery_food">General</option>
                    <option value="pharm_items">Fragile</option>
                    <option value="mail_parcels">Perishable</option>
                    <option value="bulk_item">Hazardous</option>
                    <option value="bulk_item">Sensitive</option>
                    <option value="bulk_item">Oversize</option>
                </select> 
            </div>
           
            <div class="flex mt-2 w-full">
                <button @click="resetForm" class="w-[45%] font-josefin text-[15px] text-wine rounded p-2 font-light border border-wine bg-white">Back</button>
                <span>&nbsp;</span>
                <button class="w-[45%] font-josefin text-[15px] text-white p-2 rounded font-light border border-wine bg-wine">Submit</button>
            </div>
        </form>
        <AuthenticationForm v-if="IsLoginForm" @CloseLoginform="IsLoginForm = false"/>
    </div>
</template>

<script setup>
 import { useRouter, useRoute } from 'vue-router'
import { ref } from "vue";
import { useAuthenticationStore } from '@/stores/authentication';
import AuthenticationForm from "../authentication/AuthenticationFormInterState.vue";
import Swal from "sweetalert2";
import { InterStateItemInfoKey, SenderDetailKey } from "@/config.js";
import { useSessionEncryption } from '@/composables/useSessionEncryption';

const { saveToSession } = useSessionEncryption();
const router = useRouter();
const route = useRoute();
const authStore = useAuthenticationStore();


const name = ref('');
const weight = ref('');
const dimension = ref('');
const itemHandling = ref('');

const IsLoginForm = ref(false);

const submitItemsDetails = () =>{
    if(!weight.value || !itemHandling.value){
        Swal.fire({
            icon: "error",
            title: "Please enter the required fields",
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }

   
    let lid = {
        'name':name.value,
        'weight':weight.value, 
        'dimension':dimension.value,
        'itemHandling':itemHandling.value, 
    };
    saveToSession(InterStateItemInfoKey, JSON.stringify(lid));
    if(authStore.user === null){
        IsLoginForm.value = true;
    }else{
      
        let lid = {
            'senderid':authStore.user.data.id,
            'sendername':authStore.user.data.name,
            'senderphone':authStore.user.data.phone, 
            'senderemail':authStore.user.data.email,
        };
        saveToSession(SenderDetailKey, JSON.stringify(lid));
        router.push('/vendor/'+route.params.slug+'/interstate/confirm/orders');
    }
}

</script>

<style   scoped>

</style>