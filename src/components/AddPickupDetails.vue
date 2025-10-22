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
                <span class="font-poppins text-[14px] text-center w-[90%] font-semibold">Pickup details</span>
            </div> 
        </div>
        <form action="" method="post" @submit.prevent="submitPickupDetails" class="mb-[100px]">
            <!-- <div class="mt-4"> <span class="font-bold text-[18px]">Pickup Details</span> </div> -->
            <div class="grid mt-2">
                <label for="pickup_full_name" class="font-medium text-[18px] p-2 leading-[130%]">Name (shop, person) <span class="text-[#F00]">*</span></label>
                <input type="text" name="" id="pickup_full_name" v-model="full_name" class="w-full border border-[#898F8F] rounded-[7px] p-3" required>
            </div>
            <div class="grid mt-2">
                <label for="pickup_tel_phone" class="font-medium text-[18px] p-2 leading-[130%]">Phone Number <span class="text-[#F00]">*</span></label>
                <input type="text" inputmode="tel" name="" id="pickup_tel_phone" v-model="phone_no"  class="w-full border border-[#898F8F] rounded-[7px] p-3" required>
            </div>
            <div class="grid mt-2">
                <label for="pickup_email" class="font-medium text-[18px] p-2 leading-[130%]">Email </label>
                <input type="text" name="" id="pickup_email" v-model="email" class="w-full border border-[#898F8F] rounded-[7px] p-3" >
            </div>
            <div class="grid mt-2">
                <label for="pickup_house" class="font-medium text-[18px] p-2 leading-[130%]">Building/Floor Number <span class="text-[#F00]">*</span></label>
                <input type="text" name="" id="pickup_house" v-model="address"  class="w-full border border-[#898F8F] rounded-[7px] p-3" required>
            </div>
            <div class="grid mt-2">
                <label for="pickup_landmark" class="font-medium text-[18px] p-2 leading-[130%]">Landmark/Bus stop <span class="text-[#F00]">*</span></label>
                <input type="text" name="" id="pickup_landmark" v-model="landmark" class="w-full border border-[#898F8F] rounded-[7px] p-3" required>
            </div>
            <div class="flex mt-2 w-full">
                <button @click="resetForm" class="w-[45%] font-josefin text-[15px] text-wine rounded p-2 font-light border border-wine bg-white">Clear</button>
                <span>&nbsp;</span>
                <button class="w-[45%] font-josefin text-[15px] text-white p-2 rounded font-light border border-wine bg-wine">Submit</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
const emit = defineEmits(["Closeform", "addpickupaddress"]);
import { pickupKey } from "@/config.js";
import { useSessionEncryption } from '@/composables/useSessionEncryption'

const { saveToSession, getFromSession } = useSessionEncryption()

const phone_no = ref("");
const email = ref("");
const full_name = ref("");
const address = ref("");
const landmark = ref("");
const submitPickupDetails = () => {
    const pickup = {
        full_name:full_name.value,
        phone_no:phone_no.value,
        email:email.value,
        address:address.value,
        landmark:landmark.value,
    }
    emit('addpickupaddress', pickup);
}

function resetForm() {

     
    let user = JSON.parse(getFromSession(pickupKey) || '{}');

    if (user.phone && user.phone !== '') { user.phone = ''; }
    if (user.name && user.name !== '') { user.name = ''; }
    if (user.email && user.email !== '') { user.email = ''; }
    if (user.address && user.address !== '') { user.address = ''; }
    if (user.landmark && user.landmark !== '') { user.landmark = ''; }
    saveToSession(pickupKey, JSON.stringify(user));
    full_name.value = ""
    phone_no.value = ""
    email.value = ""
    address.value = ""
    landmark.value = ""
}


onMounted(() =>{
   
    if (getFromSession(pickupKey) !== null) {
        let storedObject = JSON.parse(getFromSession(pickupKey));
        full_name.value = storedObject['name'];
        phone_no.value = storedObject['phone'];
        email.value = storedObject['email'];
        address.value = storedObject['address'];
        landmark.value = storedObject['landmark'];
    }
    
});
</script>

<style   scoped>

</style>