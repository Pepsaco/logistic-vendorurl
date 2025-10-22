<template>
    <div v-if="loading" class="page-loader">
        <!-- You can use a loading spinner or any other loading animation here -->
        <img src="../../assets/images/loader/pepsagif.png" alt="" class="animate__heartBeat animate__infinite animate__animated">
    </div>
    <div class="">
        <div class="header sticky top-0 left-0 right-0 bg-white pl-[17px] pr-[18px] pt-3 pb-[13px] justify-center items-center flex" style="box-shadow: 0px 4px 4px 0px #00000040;">
            <div class="w-[10%] flex justify-start"> 
                <a href="#"  @click="navigateTo('/dispatch/send/item')" class="">
                    <img src="../../assets/images/icons/arrow_back.png" alt="">
                </a>
            </div>
            <div class="w-[80%] flex justify-center">
                <img src="../../assets/images/icons/line_bar.png" alt="">
            </div>
            <div class="w-[10%] flex justify-end"></div>
        </div>
        <div class=" px-4 grid font-josefin text-[14px] mt-[10px] max-h-[860px] h-full  mb-[100px]">
            <div class="mt-4"> <span class="text-[18px]">City to City</span> </div>
            <form action="" method="post"  @submit.prevent="ContnueProcessSendOrder()">
                 <InterStateInputPickupLocation  />
                 <InterStateInputDeliveryLocation />
                
                <div class="grid mt-2">
                    <label for="iem_category" class="font-medium text-[18px] p-2 leading-[130%]">Item Details <span class="text-[#F00]">*</span></label>
                    <select
                    name="category"
                    id="iem_category"
                    v-model="itemCategory"
                    class="my-[10px] px-[18px] h-[52px] items-center flex justify-between rounded-[10px] border-[2px] border-[#F3F3F3] bg-white w-full"
                    required
                    >
                        <option value="" selected>Select category</option>
                        <option value="grocery_food">Grocery and food</option>
                        <option value="pharm_items">Pharmaceutical item</option>
                        <option value="mail_parcels">Mail and small parcel</option>
                        <option value="bulk_item">Bulk item</option>
                    </select>
                </div>
                <div class="grid mt-2">
                    <div
                        class="flex flex-col items-center justify-center bg-[#FFC6C8] rounded-xl p-6 cursor-pointer hover:bg-pink-200 transition"
                        @click="triggerFileInput"
                        >
                        <div class="p-2 rounded-full">
                            <img src="../../assets/images/icons/camera_icon.png" alt="" class="w-[24px] h-[24px]"/>
                        </div>
                        <p class="mt-2 text-gray-700 text-sm font-josefin">Take a picture of the package</p>

                        <!-- Hidden file input -->
                        <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        ref="fileInput"
                        class="hidden"
                        @change="handleFileChange"
                        />
                    </div>

                </div>
                <div class="grid mt-2">
                    <label for="iem_description" class="font-medium text-[18px] p-2 leading-[130%]">Package Description  <span class="text-[#F00]">*</span></label>
                    <div class="flex w-full border border-[#898F8F] rounded-[7px] p-2">
                        <textarea name="" id="iem_description" cols="40"  rows="3" placeholder="optional" class=" bg-white"bv-model="description"></textarea>
                    </div>
                </div>
               
                <div class="flex w-full mt-4">
                    <div class="w-[5%]"><input type="checkbox" name="termscondition" id="" v-model="acceptTerms"></div>
                    <div class="w-[95%] font-josefin text-[14px] font-light">
                        I accept all the Terms & Condition and there are no restricted items in the package.
                    </div>
                </div>
                <div class="flex mt-5">
                    <button type="submit" class="font-poppin text-center bg-wine text-white text-[18px] font-semibold w-full rounded-[15px] p-3" :disabled="processing" > {{ processing ? "Please wait" : "Continue" }}</button>
                </div>
            </form>
            <DisptatchInterStateItem @CloseItemform="showIntaStateItemForm = false" v-if="showIntaStateItemForm"/>
        </div>
        <div v-if="showFlashSuccess" class="fixed bottom-[74px] left-0 right-0 bg-[#01947a] font-poppins font-bold text-[12px] w-full h-[40px] p-2 flex justify-center text-white">{{ showFlashSuccess }}</div>
        <div v-if="ShowFlashError" class="fixed bottom-[74px] left-0 right-0 bg-[#f12222] font-poppins font-bold text-[12px] w-full h-[40px] p-2 flex justify-center text-white">{{ ShowFlashError }}</div>

        <!-- <div class="" v-if="authStore.user">
            <DashboardFooter/>
        </div> -->
    </div>
</template>
<script setup>
 import { useRouter, useRoute } from 'vue-router'
import { useNavigation } from "@/composables/useNavigation";
import { ref } from "vue";
import Swal from "sweetalert2";
import { pickupKey, deliveryKey, itemDetailsKey } from "@/config.js";
// import { useAuthenticationStore } from '@/stores/authentication';
// import DashboardFooter from '@/components/headers/DashboardFooter.vue';
import DisptatchInterStateItem from '@/components/interstate/DisptatchInterStateItem.vue';
import InterStateInputPickupLocation from '@/components/inputs/InterStateInputPickupLocation.vue';
import InterStateInputDeliveryLocation from '@/components/inputs/InterStateInputDeliveryLocation.vue';
import { useSessionEncryption } from '@/composables/useSessionEncryption';

const { saveToSession, getFromSession } = useSessionEncryption();

// const router = useRouter();
const route = useRoute();
const { navigateTo } = useNavigation();
// const authStore = useAuthenticationStore();

const showFlashSuccess = ref(false);
const ShowFlashError = ref(false);
const processing  = ref(false);
const loading  = ref(false);
const showIntaStateItemForm = ref(false);

const itemCategory = ref("");
const transportOptions = ref({});
const selectedTransport = ref("");
const ajaxloading = ref(false);

const acceptTerms = ref(false);

const fileInput = ref(null)
const uploads = ref(null)
const handleFileChange = (event) => {
  const files = Array.from(event.target.files);

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      uploads.value.push(imageData);
      
    };
    reader.readAsDataURL(file); // encode as Base64
  });
};

const description = ref("")
const triggerFileInput = () => {
  fileInput.value.click()
}


const ContnueProcessSendOrder = () => {
    if(!acceptTerms.value){
        ShowFlashError.value = "Kindly accept terms and condition";
        setTimeout(() => (ShowFlashError.value = false), 3500);
        return;
    }
    processing.value = true

     if (getFromSession(deliveryKey) !== null) {
        let storedObject = JSON.parse(getFromSession(deliveryKey));
        var deliveryLocation = storedObject['area_1'];
    }

   
    if (getFromSession(pickupKey) !== null) {
        let storedObject = JSON.parse(getFromSession(pickupKey));
        var pickupLocation = storedObject['area_1'];
        
    }

    if (deliveryLocation == null) {
        Swal.fire({
            icon: "error",
            title: "Location not found, Search delivery location again",
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }
    if (pickupLocation == null) {
        Swal.fire({
            icon: "error",
            title: "Location not found, Search delivery location again",
            showConfirmButton: false,
            timer: 1500
        });
            return;
    }
    if (itemCategory == null  || !itemCategory.value) {
        Swal.fire({
            icon: "error",
            title: "Select item category.",
            showConfirmButton: false,
            timer: 1500
        });
            return;
    }

   
   

 
   
    let lid = {
        'category':itemCategory.value,
        'image':uploads.value,
        'description':description.value,
        'package_type':route.params.packagetype
    };
    if (getFromSession(itemDetailsKey) !== null) {
        saveToSession(itemDetailsKey, JSON.stringify(lid));
    } else {
        saveToSession(itemDetailsKey, JSON.stringify(lid));
    }


    showIntaStateItemForm.value = true;
    processing.value  = false
        
}

</script>
<style scoped>
/* div.radio-with-Icon {
  display: block;
} */
div.radio-with-Icon p.radioOption-Item {
  display: inline-block;
  /* width: 100px;
  height: 100px; */
  box-sizing: border-box;
  margin: 2px 5px;
  border: none;
}
div.radio-with-Icon p.radioOption-Item label {
  display: block;
  height: 100px;
  width: 100px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #9D0208;
  background-color: #FFEBEB;
  color: #9D0208;
  cursor: pointer;
  opacity: .8;
  transition: none;
  font-size: 13px;
  padding-top: 25px;
  text-align: center;
  margin: 0 !important;
}
div.radio-with-Icon p.radioOption-Item label:hover, div.radio-with-Icon p.radioOption-Item label:focus, div.radio-with-Icon p.radioOption-Item label:active {
  opacity: .5;
  background-color: #9D0208;
  color: #fff;
  margin: 0 !important;
}
div.radio-with-Icon p.radioOption-Item label::after, div.radio-with-Icon p.radioOption-Item label:after, div.radio-with-Icon p.radioOption-Item label::before, div.radio-with-Icon p.radioOption-Item label:before {
  opacity: 0 !important;
  width: 0 !important;
  height: 0 !important;
  margin: 0 !important;
}
div.radio-with-Icon p.radioOption-Item label i.fa {
  display: block;
  font-size: 30px;
}
div.radio-with-Icon p.radioOption-Item input[type="radio"] {
  opacity: 0 !important;
  width: 0 !important;
  height: 0 !important;
}
div.radio-with-Icon p.radioOption-Item input[type="radio"]:active ~ label {
  opacity: 1;
}
div.radio-with-Icon p.radioOption-Item input[type="radio"]:checked ~ label {
  opacity: 1;
  border: none;
  background-color: #9D0208;
  color: #fff;
}
div.radio-with-Icon p.radioOption-Item input[type="radio"]:hover, div.radio-with-Icon p.radioOption-Item input[type="radio"]:focus, div.radio-with-Icon p.radioOption-Item input[type="radio"]:active {
  margin: 0 !important;
}
div.radio-with-Icon p.radioOption-Item input[type="radio"] + label:before, div.radio-with-Icon p.radioOption-Item input[type="radio"] + label:after {
  margin: 0 !important;
}
</style>