<template>
    <div v-if="loader" class="page-loader">
       <!-- You can use a loading spinner or any other loading animation here -->
       <img src="../../assets/images/loader/pepsagif.png" alt="" class="animate__heartBeat animate__infinite animate__animated">
   </div>
 <div class="bg-white">
    <div class="main w-screen  rounded-[32px] bg-[#F5F5F5] max-h-[896px] h-screen overflow-scroll mb-[10px]"> 
        <IntrastateOrderDetails  @CloseIntrastate="handlecloseIntrastate" v-if="IsIntrastateOrderDetails" :MasterSlug="orderid"/>
        <InterstateOrderDetails @CloseInterstate="handlecloseInterstate" v-if="IsInterstateOrderDetails" :MasterSlug="orderid"/>
    </div>
</div>

   














    <!-- <div>
         <div class="w-screen bg-[#f5f5f5] fixed left-0 right-0 top-0 px-4 mx-auto py-4 z-10 overflow-y-scroll h-full">
            <div class="flex w-full h-full items-center justify-center">
                <div  class="text-[#F00] font-rubik text-[16px] font-semibold leading-[36px] capitalize grid" v-if="loader == true">
                    <span class="p-6">Processing dispatch ...</span> 
                    <img src="../../assets/images/loader/transfer-loader.gif" class="w-[50px]"/>
                </div>
               
            </div>
        </div>
    </div> -->
</template>

<script setup>
import {  ref, onMounted } from 'vue';
import axiosinstance from '@/auth';
import { useRouter,  useRoute } from 'vue-router';
import IntrastateOrderDetails from '../../components/order/IntrastateOrderDetails.vue';
import InterstateOrderDetails from '../../components/order/InterstateOrderDetails.vue';
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();
const loader = ref(true);

const IsIntrastateOrderDetails = ref(false);
const IsInterstateOrderDetails = ref(false);
const orderid = ref("");

onMounted( async () => {
   
    loader.value = true;
    try {
        const res = await axiosinstance.post('/vendor/dispatch/order/trace',{
            orderno:route.params.generatedcode
        });
        // console.log(res.data.slug_id)
        if (res.data.dispatch_type === "intrastate") {
             orderid.value =  res.data.slug_id
            IsIntrastateOrderDetails.value = true;

        } else if (res.data.dispatch_type === "interstate")  {
           orderid.value =  res.data.slug_id
            IsInterstateOrderDetails.value = true;
        }

    } catch (error) {
        if(error.response){
            Swal.fire({
                icon: "error",
                title: "Ooops....",
                text: error.response.data.message,
                showConfirmButton: true,
                timer: 3500
            });
            
        }else{
            Swal.fire({
                icon: "error",
                title: "Ooops....",
                text: error.message,
                showConfirmButton: true,
                timer: 3500
            });
                
        }
    }  
     loader.value = false;
});


const handlecloseIntrastate = () =>{
     router.push("/vendor/"+route.params.slug+"/send/item");
  IsIntrastateOrderDetails.value = false;
}

const handlecloseInterstate = () =>{
     router.push("/vendor/"+route.params.slug+"/send/item");
  IsInterstateOrderDetails.value = false;
}
</script>