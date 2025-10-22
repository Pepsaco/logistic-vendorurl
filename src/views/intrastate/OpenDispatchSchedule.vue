<template>
    <div v-if="loading" class="page-loader">
        <!-- You can use a loading spinner or any other loading animation here -->
        <img src="../../../assets/images/loader/pepsagif.png" alt="" class="animate__heartBeat animate__infinite animate__animated">
    </div>
    <div class="">
        <div class="header sticky top-0 left-0 right-0 bg-white pl-[17px] pr-[18px] pt-3 pb-[13px] justify-center items-center flex" style="box-shadow: 0px 4px 4px 0px #00000040;">
            <div class="w-[10%] flex justify-start"> 
                <a href="#"  @click="navigateTo('/myportal/dashboard')" class="">
                    <img src="../../../assets/images/icons/arrow_back.png" alt="">
                </a>
            </div>
            <div class="w-[80%] flex justify-center">
                <img src="../../../assets/images/icons/line_bar.png" alt="">
            </div>
            <div class="w-[10%] flex justify-end"></div>
        </div>
        <div class=" px-4 grid font-josefin text-[14px] mt-[10px] max-h-[860px] h-full  mb-[100px]">
           <div class="mt-4"> <span class="font-bold text-[18px]">Instant Delivery</span> </div>
           <form action="" method="post"  @submit.prevent="ContnueProcessSendOrder()">
                 <InputPickupLocation  />
                 <InputDelivryLocation />
                <div class="flex w-full mt-2">
                    <div class="w-[50%] grid">
                        <label for="pickup_date" class="font-medium text-[18px] p-2 leading-[130%]">Date <span class="text-[#F00]">*</span></label>
                         <input type="date" name="" id="pickup_date" v-model="scheduledate" class="w-full border border-[#898F8F] rounded-[7px] p-3" required>
                    </div>
                    <div class="w-[5%]">&nbsp;</div>
                    <div class="w-[45%] grid">
                        <label for="pickup_time" class="font-medium text-[18px] p-2 leading-[130%]">Time <span class="text-[#F00]">*</span></label>
                         <input type="time" name="" id="pickup_time" v-model="scheduletime" class="w-full border border-[#898F8F] rounded-[7px] p-3" placeholder="HH:MM" required>
                    </div>
                </div>
                <div class="grid mt-2">
                    <label for="iem_category" class="font-medium text-[18px] p-2 leading-[130%]">Item Details <span class="text-[#F00]">*</span></label>
                    <select
                    name="category"
                    id="iem_category"
                    v-model="itemCategory"
                    @change="onChangeCategory"
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
                    <span class="font-bold text-[18px]">Vehicle Type</span>
                    <span class="font-poppins text-[10px] flex" v-if="ajaxloading">Loading....... <img src="../../../assets/images/loader/ajax-loader-white.gif" alt="" class="w-[10px]"></span>
                </div>
                <div v-if="transportOptions" class="radio-with-Icon flex mt-2 max-w-[330px] w-full overflow-x-scroll">
                    <p v-for="(label, value) in transportOptions" :key="value" class="radioOption-Item">
                        <input type="radio" name="BannerTypes" :id="value" :value="value" v-model="selectedTransport" @change="categoryType($event)" />
                        <label :for="value">
                        <i :class="getIconClass(value)"></i>
                        {{ label }}
                        </label>
                    </p>
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
        </div>
        <div v-if="showFlashSuccess" class="fixed bottom-[74px] left-0 right-0 bg-[#01947a] font-poppins font-bold text-[12px] w-full h-[40px] p-2 flex justify-center text-white">{{ showFlashSuccess }}</div>
        <div v-if="ShowFlashError" class="fixed bottom-[74px] left-0 right-0 bg-[#f12222] font-poppins font-bold text-[12px] w-full h-[40px] p-2 flex justify-center text-white">{{ ShowFlashError }}</div>

        <DashboardFooter/>
    </div>
</template>
<script setup>
 import { useRouter, useRoute } from 'vue-router'
import { useNavigation } from "@/composables/useNavigation";
import { ref, onMounted } from "vue";
import axiosinstance from '@/auth';
import Swal from "sweetalert2";
import { useAuthenticationStore } from '@/stores/authentication';
import DashboardFooter from '@/components/headers/DashboardFooter.vue';
import InputPickupLocation from '@/components/Inputs/InputPickupLocation.vue';
import InputDelivryLocation from '@/components/Inputs/InputDelivryLocation.vue';
import { pickupKey, deliveryKey, itemDetailsKey, schedulekey } from "@/config.js";
import { useSessionEncryption } from '@/composables/useSessionEncryption';

const { saveToSession, getFromSession } = useSessionEncryption();
const router = useRouter();
const { navigateTo } = useNavigation();
const authStore = useAuthenticationStore();

const showFlashSuccess = ref(false);
const ShowFlashError = ref(false);
const processing  = ref(false);
const loading  = ref(false);

const scheduledate = ref("");
const scheduletime = ref("");

const itemCategory = ref("");
const transportOptions = ref({});
const selectedTransport = ref("");
const ajaxloading = ref(false);

const acceptTerms = ref(false);

const onChangeCategory = async () => {
    if (!itemCategory.value) return;
    ajaxloading.value = true
    try {
      const response = await axiosinstance.get(`/open-dispatch/display-vehicles/${itemCategory.value}`);
      transportOptions.value = response.data;
    //   selectedTransport.value = Object.keys(transportOptions.value)[0] || "";
    } catch (error) {
      console.error("Error fetching category data:", error);
    }   
    ajaxloading.value = false
} 

const getIconClass = (type) => {
  const icons = {
    Motorcycle: "fa fa-motorcycle",
    Tricycle: "fa fa-caravan",
    Car: "fa fa-car-side",
    Van: "fa fa-truck-pickup",
    Truck: "fa fa-truck-moving",
    "long truck": "fa fa-truck-fast",
  };
  return icons[type] || "fa fa-car";
};
const categoryType = (event) =>{
    var data = event.target.value;
    // console.log(data+'-'+this.itemCategory);
    var it = "App_ID247005_Zj0KMXU2Lhr0mbEXOMu8WkEe3otVdCgPrTtXYpk";
    let lid = {
    'category':itemCategory.value,
    'method':data,
    };
        // Check if the key 'exampleKey' exists in localStorage
    if (getFromSession(it) !== null) {
        saveToSession(it, JSON.stringify(lid));
    } else {
        saveToSession(it, JSON.stringify(lid));
    }
}


const ContnueProcessSendOrder = () => {
    if(acceptTerms.value){

        processing.value = true
      
        if (getFromSession(deliveryKey) !== null) {
            let storedObject = JSON.parse(getFromSession(r));
            var deliveryLocation = storedObject['area_1'];
        }
    
        if (getFromSession(pickupKey) !== null) {
            let storedObject = JSON.parse(getFromSession(p));
            var pickupLocation = storedObject['area_1'];
            
        }
    
        if (getFromSession(itemDetailsKey) !== null) {
            let storedObject = JSON.parse(getFromSession(it));
            var itemCategory = storedObject['category'];
            var methodselected = storedObject['method'];
            
        }

      
        let datetime = {
            'scheduledate':scheduledate.value,
            'scheduletime':scheduletime.value,
        };
        if (getFromSession(schedulekey) !== null) {
            saveToSession(schedulekey, JSON.stringify(datetime));
        } else {
            saveToSession(schedulekey, JSON.stringify(datetime));
        }


        if (deliveryLocation == null) {
            Swal.fire({
                icon: "error",
                title: "Location not found, Search delivery location again",
                showConfirmButton: false,
                timer: 1500
            });
        }else if (pickupLocation == null) {
            Swal.fire({
                icon: "error",
                title: "Location not found, Search delivery location again",
                showConfirmButton: false,
                timer: 1500
            });
        }else if (itemCategory == null) {
            Swal.fire({
                icon: "error",
                title: "Select item category.",
                showConfirmButton: false,
                timer: 1500
            });
        }else if (methodselected == null) {
            Swal.fire({
                icon: "error",
                title: "Pick your delivery method.",
                showConfirmButton: false,
                timer: 1500
            });
        }else{
            router.push('/opendispatch/confirm-orders');
        }
        processing.value  = false
    }else{
        ShowFlashError.value = "Kindly accept terms and condition";
        setTimeout(() => (ShowFlashError.value = false), 3500);
    }
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