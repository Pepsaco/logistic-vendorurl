<template>
    <div v-if="loading" class="page-loader">
        <!-- You can use a loading spinner or any other loading animation here -->
        <img src="../../assets/images/loader/pepsagif.png" alt="" class="animate__heartBeat animate__infinite animate__animated">
    </div>
    <div class="bg-white">
        <div class="header sticky top-0 left-0 right-0 bg-white pl-[17px] pr-[18px] pt-3 pb-[13px] justify-center items-center flex" style="box-shadow: 0px 4px 4px 0px #00000040;">
            <div class="w-[10%] flex justify-start"> 
                <div @click="navigateTo(`/opendispatch/send-orders`)"  class="">
                    <img src="../../assets/images/icons/arrow_back.png" alt="">
                </div>
            </div>
            <div class="w-[80%] flex justify-center">
                <img src="../../assets/images/icons/line_bar.png" alt="">
            </div>
            <div class="w-[10%] flex justify-end"></div>
        </div>
         
        <div class="w-full mx-auto px-4 grid font-poppins text-[12px] mb-[150px]">
            <div class="mt-4"> <span class="font-bold text-[18px]">Confirm Details</span> </div>
            <div class="flex w-full mt-3">
                <div class="w-[5%] ">
                    <img src="../../assets/images/icons/location_two.png" alt="">
                </div>
                <div class="w-[85%] grid font-josefin px-4">
                    <span class="text-[#77869E]  text-[13.76px]">Pickup Location</span>
                    <span class="text-[#3A3A3A] font-medium mb-2 text-[14.05px]">{{selectedPickupLocation}}</span>
                    <span class="text-[#77869E]  text-[13.76px]">Delivery Location</span>
                    <span class="text-[#000] font-medium mb-4 text-[14.05px]">{{ selectedDeliveryLocation }}</span>
                </div>
                <div class="w-[10%] flex">
                    <div class="w-[36.69px] h-[36.69px] border border-wine p-2 rounded bg-[#FFEBEB]">
                        <i v-if="deliverymethod == 'Motorcycle'" class="fa fa-motorcycle text-wine"></i>
                        <i v-else-if="deliverymethod == 'Tricycle'" class="fa fa-truck-moving text-wine"></i>
                        <i v-else-if="deliverymethod == 'Tricycle'" class="fa fa-caravan text-wine"></i>
                        <i v-else-if="deliverymethod == 'car'" class="fa fa-car-side text-wine"></i>
                        <i v-else-if="deliverymethod == 'Van'" class="fa fa-truck-moving text-wine"></i>
                        <i v-else-if="deliverymethod == 'Truck'" class="fa fa-truck-fast text-wine"></i>
                        <i v-else-if="deliverymethod == 'Long truck'" class="fa fa-truck-fast text-wine"></i>
                      
                    </div>
                </div>
            </div>
            <div class="flex w-full mt-3">
                <div class="grid w-[50%] font-josefin">
                    <span class="text-[#77869E] text-[13.76px]">What you are sending</span>
                    <span class="font-medium text-[#111111] text-[16.05px]" v-if="itemCategory == 'grocery_food'">Grocery and Food</span>
                    <span class="font-medium text-[#111111] text-[16.05px]" v-else-if="itemCategory == 'pharm_items'">Pharmacy</span>
                    <span class="font-medium text-[#111111] text-[16.05px]" v-else-if="itemCategory == 'mail_parcels'">Mail and Parcel</span>
                    <span class="font-medium text-[#111111] text-[16.05px]" v-else-if="itemCategory == 'bulk_item'">Bulk items</span>
                     
                </div>
                <div class="grid w-[50%] font-josefin justify-end">
                    <span class="text-[#77869E] text-[13.76px]">Distance/Time</span>
                    <span class="font-medium text-[#111111] text-[13.05px]">{{distance}} from you</span>
                    <span class="font-medium text-[#111111] text-[13.05px]">{{time}} drive</span>
                </div>
            </div>
            <div class="flex w-full mt-3">
                <div class="grid w-[50%] font-josefin">
                    <span class="text-[#77869E] text-[13.76px]">Receipient</span>
                    <span class="font-medium text-[#111111] text-[16.05px] capitalize">{{pName}}</span>
                </div>
                <div class="grid w-[50%] font-josefin justify-end">
                    <span class="text-[#77869E] text-[13.76px]">Receipient contact</span>
                    <span class="font-medium text-[#111111] text-[16.05px]">{{pPhone}}</span>
                </div>
            </div>
            <div class="flex w-full mt-3">
                <div class="grid w-[50%] font-josefin">
                    <span class="text-[#77869E] text-[13.76px]">Receiver</span>
                    <span class="font-medium text-[#111111] text-[16.05px] capitalize">{{dName}}</span>
                </div>
                <div class="grid w-[50%] font-josefin justify-end">
                    <span class="text-[#77869E] text-[13.76px]">Receiver contact</span>
                    <span class="font-medium text-[#111111] text-[16.05px]">{{dPhone}}</span>
                </div>
            </div>
            <div class="mt-6 px-4 flex">
                <button 
                    @click.prevent="ContinuetoPayments()" 
                    class="font-poppin text-center bg-wine text-white text-[18px] font-semibold w-full rounded-[10px] p-3" 
                    :disabled="processing"
                >
                    {{ processing ? "Please wait" : `Pay ${$formatPrice(deliveryPrice)}` }}
                </button>
            </div>
        </div>
        <AuthenticationForm v-if="IsLoginForm" @CloseLoginform="IsLoginForm = false"/>
    </div>
   
</template>

<script setup>
 import { useRouter, useRoute } from 'vue-router'
import { useNavigation } from "@/composables/useNavigation";
import { ref, onMounted } from "vue";
import axiosinstance from '@/auth';
import Swal from "sweetalert2";
import { pickupKey, deliveryKey, itemDetailsKey, amtKey, SenderDetailKey } from "@/config.js";
import { useSessionEncryption } from '@/composables/useSessionEncryption';
import { useAuthenticationStore } from '@/stores/authentication';
import AuthenticationForm from "@/components/authentication/AuthenticationForm.vue";
import { storeToRefs } from 'pinia'



const authStore = useAuthenticationStore();
const { user } = storeToRefs(authStore)

const { saveToSession, getFromSession } = useSessionEncryption();
const router = useRouter();
const route = useRoute();
const { navigateTo } = useNavigation();

const loading = ref(false);
const itemCategory = ref("");
const deliverymethod = ref("");
const selectedDeliveryLocation = ref("");
const selectedPickupLocation = ref("");

const dName = ref("");
const dPhone = ref("");
const pName = ref("");
const pPhone = ref("");

const getDataInLocalstorage = async () => {
    loading.value = true;
    // var it = "App_ID247005_Zj0KMXU2Lhr0mbEXOMu8WkEe3otVdCgPrTtXYpk";
    if (getFromSession(itemDetailsKey) !== null) {
        let storedObject = JSON.parse(getFromSession(itemDetailsKey));
        itemCategory.value = storedObject['category'];
        deliverymethod.value = storedObject['method'];
        
    }
    // var r = "App_ID079529_2y0$NLu0rrMhbrYSwRhTYZzoSo5edlqgBED/QC9xLT/wUuIvq8kEc5S";
    if (getFromSession(deliveryKey) !== null) {
        let storedObject = JSON.parse(getFromSession(deliveryKey));
        selectedDeliveryLocation.value = storedObject['area_1'];
        dName.value = storedObject['name'];
        dPhone.value = storedObject['phone'];
    }
    // var p = "App_ID120494_$NLu0rrMhbrYSwRhTYZzoSoXOMuGPAAvQMhbrYS";
    if (getFromSession(pickupKey) !== null) {
        let storedObject = JSON.parse(getFromSession(pickupKey));
        selectedPickupLocation.value = storedObject['area_1'];
        pName.value = storedObject['name'];
        pPhone.value = storedObject['phone'];
        
    }
    loading.value = false;
}
const processing = ref(true)
 const deliveryPrice = ref(null);
 const distance = ref(null);
 const time = ref(null);
 const slug = route.params.slug
const calculateDistanceTime = async () => {

    try {
        let DeliveryLocation = null;
        let PickupLocation = null;
        let state = null;
        let deliverymethod = null;

        // Retrieve delivery location from local storage 
        if (getFromSession(deliveryKey) !== null) {
            let storedObject = JSON.parse(getFromSession(deliveryKey));
            DeliveryLocation = storedObject['area_1'];
            state = storedObject['state'];
        }
        // Retrieve pickup location from local storage 
        if (getFromSession(pickupKey) !== null) {
            var storedObject = JSON.parse(getFromSession(pickupKey));
            PickupLocation = storedObject['area_1'];
        }
        
        if (getFromSession(itemDetailsKey) !== null) {
            let storedObject = JSON.parse(getFromSession(itemDetailsKey));
            deliverymethod = storedObject['method'];
            
        }
 
        // Ensure locations are available
        if (!PickupLocation || !DeliveryLocation) {
            router.push('/vendor/'+slug+'/send/item');
            throw new Error("Pickup or Delivery location not found.");
        }

        // Initialize Google Maps Directions Service
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();

        // Ensure `map` is defined before setting
        if (window.map) {
            directionsRenderer.setMap(window.map);
        }

        // Calculate route
        directionsService.route(
            {
                origin: PickupLocation,
                destination: DeliveryLocation,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            async (response, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(response);
                    const route = response.routes[0];

                    if (route && route.legs.length > 0) {
                        let distanceText = route.legs[0].distance.text;
                        let timeText = route.legs[0].duration.text;

                        // Call API to get cost estimate
                        try {
                            const res = await axiosinstance.post("/vendors/dispatch/delivery/cost", {
                                d: distanceText,
                                t: timeText,
                                s: state,
                                m: deliverymethod,
                                s: slug,
                            });

                            // console.log("API Response:", res.data);

                            let totalMobility = res.data.TotalMobility;
                            // let totalMobility = 10;
                            let lid = {
                                total_amount: totalMobility,
                                distance: distanceText,
                                time: timeText,
                            };

                            // Store data in localStorage
                            saveToSession(amtKey, JSON.stringify(lid));

                            // Update Vue 3 reactive refs
                            distance.value = distanceText;
                            time.value = timeText;
                            deliveryPrice.value = totalMobility;
                            processing.value = false
                        } catch (apiError) {
                            console.error("Error fetching mobility cost:", apiError.message);
                            window.alert("Failed to fetch delivery cost.");
                        }
                    }
                } else {
                    console.error("Directions request failed due to: " + status);
                    window.alert("Directions request failed due to " + status);
                }
            }
        
        );
    } catch (error) {
        console.error("Error in calculateDistanceTime:", error.message);
        window.alert(error.message);
    }
};

const IsLoginForm = ref(false);

const ContinuetoPayments = async () =>{
    const slug = route.params.slug;
    
     
    if(!user.value){
        IsLoginForm.value = true;
    }else{
        let lid = {
            'senderid':authStore.user.data.id,
            'sendername':authStore.user.data.name,
            'senderphone':authStore.user.data.phone, 
            'senderemail':authStore.user.data.email,
        };
        saveToSession(SenderDetailKey, JSON.stringify(lid));
        router.push('/dispatch/'+slug+'/intrastate/order/payment');
    }
}

onMounted(() =>{
    getDataInLocalstorage();
    calculateDistanceTime();
})
</script>

<style  scoped>
#map {
  height: 100%;
}
 
#floating-panel {
  position: absolute;
  top: 10px;
  left: 25%;
  z-index: 5;
  background-color: #fff;
  padding: 5px;
  border: 1px solid #999;
  text-align: center;
  font-family: "Roboto", "sans-serif";
  line-height: 30px;
  padding-left: 10px;
}
</style>