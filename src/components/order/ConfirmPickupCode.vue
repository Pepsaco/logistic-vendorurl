<template>
    <div class="w-screen bg-[#f5f5f5] fixed left-0 right-0 top-0 px-4 mx-auto py-4 z-10 overflow-y-scroll h-full">
        <div class="grid mx-auto px-4">
            <div class="flex w-full"></div>
            <div class="flex w-full mt-[20px]">
            <div @click="$emit('Close')" class="w-[10%] cursor-pointer">X</div>
            </div>
        </div>
        <div class="w-full bg-[#f5f5f5] h-full">
            <form action="#" method="post" @submit.prevent="confirmRiderCodeForPickup">
                <div class="">
                    <div class="flex justify-center px-2 py-5">
                        <span class="font-poppins text-[14px] text-center w-[90%] font-semibold"> Pickup Confirmation</span>
                    </div>
                
                    <div class="grid px-4">
                        
                        <div class="mt-6 ">
                            <label for="" class="font-poppins text-[12px] font-medium">Confirmation code</label>
                            <input type="number" name="token_code_459" v-model.number="token_code_459" id="token_code_459" class="form-inputs" placeholder="Confirmation Code" required>
                        </div>
                        <div class="mt-4">
                            <button class="btn btn-trxn  w-full" id="confim_767_transfer" :disabled="processing" > {{ processing ? "Please wait" : "Confirm" }}</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, defineProps  } from 'vue';
import axiosinstance from '@/auth';
import Swal from "sweetalert2";
import { useRouter } from 'vue-router';
const props = defineProps({ orderNo: String });
const emit = defineEmits(["Close"]);

const processing = ref(false);
const token_code_459 = ref("");
const router = useRouter();

const confirmRiderCodeForPickup = async () => {
    processing.value = true;
    try {
        const res = await axiosinstance.post('/dispatch/order/i/pickup',{
            orderid:props.orderNo,
            pickupcode:token_code_459.value,
        });
        
        Swal.fire({
            icon: "success",
            title: "Confirmed",
            text: res.data.success,
            showConfirmButton: true,
            timer: 3500
        });
        emit("Close");
        window.location.reload();
        
    } catch (error) {
        
    }
    processing.value = false;
}
</script>

<style lang="scss" scoped>

</style>