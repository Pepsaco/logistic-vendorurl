<template>
    <div v-if="loading" class="page-loader">
        <!-- You can use a loading spinner or any other loading animation here -->
        <img src="../../assets/images/loader/pepsagif.png" alt="" class="animate__heartBeat animate__infinite animate__animated">
    </div>
    <div class="bg-white">
        <div class="header sticky top-0 left-0 right-0 bg-white pl-[17px] pr-[18px] pt-3 pb-[13px] justify-center items-center flex" style="box-shadow: 0px 4px 4px 0px #00000040;">
            <div class="w-[10%] flex justify-start"> 
                <div @click="navigateTo(`/opendispatch/confirm-orders`)"  class="">
                    <img src="../../../assets/images/icons/arrow_back.png" alt="">
                </div>
            </div>
            <div class="w-[80%] flex justify-center">
                <img src="../../../assets/images/icons/line_bar.png" alt="">
            </div>
            <div class="w-[10%] flex justify-end"></div>
        </div>
        <div class="bg-white w-screen pt-[7px] pl-[21px] pb-[8px] pr-[21px] mt-[10px] ">
            <div class="mt-[20px] grid text-center justify-center border-b pb-3 border-[#eee]">
                <span class="text-[18px] font-semibold leading-[12px]">Delivery Payment</span>
                <span class="text-[25px] font-bold">{{ $formatPrice(amtData.mobilityPrice) }}  </span>
            </div>
            <div class="mt-[20px] grid text-center justify-center border-b pb-3 border-[#eee]">
                <span class="text-[18px] font-semibold leading-[12px]" >Name</span>
                <span class="text-[25px] font-bold">{{ authStore.user.data.fname }} {{ authStore.user.data.lname }} </span>
            </div>
            <div class="mt-[20px] grid text-center justify-center border-b pb-3 border-[#eee]">
                <span class="text-[18px] font-semibold leading-[12px]" >Phone</span>
                <span class="text-[25px] font-bold">{{ authStore.user.data.phone }}  </span>
            </div>
        </div>
        <button @click.prevent="ClickOtherPaymentMethod" class="font-poppin text-center text-wine text-[14px] font-semibold w-full p-3 mt-4 underline underline-offset-8" :disabled="processing"> {{ processing ? "Please wait" : "Make Payment" }}  </button> 

         <OrderCompleted v-if="IsdispatchConfirm" :ordComplete="completedOrder" />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Swal from "sweetalert2";
import { useAuthenticationStore } from '@/stores/authentication';
import { pickupKey, deliveryKey, itemDetailsKey, amtKey, merchantKey, schedulekey, SenderDetailKey } from "@/config.js";
import OrderCompleted from '@/components/IntraStateOrderCompleted.vue';
import { useNavigation } from '@/composables/useNavigation';
import axiosinstance from '@/auth';
import { useRouter, useRoute } from 'vue-router';
import { useSessionEncryption } from '@/composables/useSessionEncryption';

const { saveToSession, getFromSession, removeFromSession } = useSessionEncryption();

const router = useRouter();
const route = useRoute();
const { navigateTo } = useNavigation();
const authStore = useAuthenticationStore();

const amtData = ref({ mobilityPrice:null, distance:null, time:null });
const pickData = ref({
    address:null, area:null, areaone:null, city:null, country:null,email:null, landmark:null, latitude:null, longitude:null, name:null, phone:null, placeid:null, postalcode:null, state:null 
});
const DelivData = ref({
    address:null, area:null, areaone:null, city:null, country:null,email:null, landmark:null, latitude:null, longitude:null, name:null, phone:null, placeid:null, postalcode:null, state:null
});
const dmethod = ref({ category:null, Cmethods:null  });
const schedule = ref({ scheduledate:null, scheduletime:null  });

const senderdetails = ref({ enderid:null, sendername:null, senderemail:null, senderphone:null  });

const getuserData = () => {
const slug = route.params.slug;
    // if(getFromSession(amtKey) === null || getFromSession(pickupKey) === null || getFromSession(deliveryKey) === null || getFromSession(itemDetailsKey) === null || getFromSession(schedulekey) === null || getFromSession(SenderDetailKey) === null)
    // {
    //     router.push('/vendor/'+slug+'/send/item');
    // }

    if (getFromSession(amtKey) !== null) {
        let storedObject = JSON.parse(getFromSession(amtKey));
        amtData.value = {
            mobilityPrice: Math.trunc(storedObject['total_amount']),
            distance: storedObject['distance'] ,
            time: storedObject['time'],
        }  
    }
    
    if (getFromSession(pickupKey) !== null) {
        let PickupObject = JSON.parse(getFromSession(pickupKey));
        pickData.value = {
            address:PickupObject['address'], area:PickupObject['area'], areaone:PickupObject['area_1'], city:PickupObject['city'], country:PickupObject['country'], email:PickupObject['email'], landmark:PickupObject['landmark'], latitude:PickupObject['latitude'], longitude:PickupObject['longitude'], name:PickupObject['name'], phone:PickupObject['phone'], placeid:PickupObject['placeid'], postalcode:PickupObject['postal_code'], state:PickupObject['state'] 
        }
    }
    
    if (getFromSession(deliveryKey) !== null) {
        let dObject = JSON.parse(getFromSession(deliveryKey));
        DelivData.value = {
            address:dObject['address'], area:dObject['area'], areaone:dObject['area_1'], city:dObject['city'], country:dObject['country'], email:dObject['address'], landmark:dObject['landmark'], latitude:dObject['latitude'], longitude:dObject['longitude'], name:dObject['name'], phone:dObject['phone'], placeid:dObject['placeid'], postalcode:dObject['postal_code'], state:dObject['state'] 
        }
         
    }
   
    if (getFromSession(itemDetailsKey) !== null) {
        let CatObject = JSON.parse(getFromSession(itemDetailsKey));
        dmethod.value ={ category:CatObject['category'], Cmethods:CatObject['method']  };
    }

    if (getFromSession(schedulekey) !== null) {
        let schdule = JSON.parse(getFromSession(schedulekey));
        console.log(schdule)
        schedule.value ={ scheduledate:schdule['scheduledate'], scheduletime:schdule['scheduletime']  };
    } 
    if (getFromSession(SenderDetailKey) !== null) {
        let senderData = JSON.parse(getFromSession(SenderDetailKey));
        senderdetails.value ={ senderid:senderData['senderid'],sendername:senderData['sendername'], senderemail:senderData['senderemail'] , senderphone:senderData['senderphone'] };
        console.log(senderdetails.value)
    } 

 }
onMounted(() =>{
    getuserData();
    
});
const getRandomNumber = (digit) =>{
    return Math.random().toFixed(digit).split('.')[1];
}

const processing = ref(false);


const ClickOtherPaymentMethod = async () => {
    processing.value = true;
   
    const pay_phone = authStore.user.data.phone
    const newNumber = parseInt(pay_phone.toString().slice(1)); // 2345
    var phone_num = "+234"+newNumber
    var merchantRef = getRandomNumber(16);

    //  const username = ref(authStore.user.data.name.split(" "));


       finalizeCheckoutPayment(phone_num);
 processing.value = false; return;
    const paymentOptions = {
        //removeCoin: true,
        // removeWalletpay: true,
        // removeBankdeposit: true,
        // removeCardpay: true,
        email : authStore.user.data.email, 
        firstname:firstname, 
        lastname:lastname, 
        phoneNumber:authStore.user.data.phone,
        fixedAmount:Math.trunc(amtData.value.mobilityPrice)
    };

    let handler = initializePepsaPay(
        paymentOptions,
        merchantRef,
        merchantKey,
        function onClose(response) {
            // Handle what happens when the iframe is closed
            // console.log("ONCLOSE DATA", response);
            if (response.error) {
                console.error("ONCLOSE ERROR:", response.error);
            } else {
                console.log("ONCLOSE DATA:", response);
            }
        },
        function callback(response) {
            // console.log("ONSUCCESS DATA -", response.data);
            if(response.data.transfer_status === "success"){
                finalizeCheckoutPayment(response);
            }
           processing.value = false;
        }.bind(this) //
    )
    
    handler;
}



const IsdispatchConfirm = ref(false);
const loading = ref(false);
const completedOrder = ref({});
const finalizeCheckoutPayment = async (res) =>{
    loading.value = true
    // var r = "App_ID000493_mbEXOMu8GPAAQPAAvQMhbr0KM2LhrwdJTFYKCSWVd";
    // let storedObject = '';
    // if (localStorage.getItem(r) !== null) {
    //     storedObject = localStorage.getItem(r);
    // }
    if (getFromSession(schedulekey) !== null) {
        let schdule = JSON.parse(getFromSession(schedulekey));
        console.log(schdule)
        // schedule.value ={ scheduledate:schdule['scheduledate'], scheduletime:schdule['scheduletime']  };
        var delivery_type = "schedule";
        var scheduled_date = schedule.value.scheduledate;
        var scheduled_time = schedule.value.scheduletime;
    } else{
         var delivery_type = "instant";
        var scheduled_date = null;
        var scheduled_time = null;
    }

    // if(schedule.value.scheduledate != "" && schedule.value.scheduletime != ""){
    //     var delivery_type = "schedule";
    //     var scheduled_date = schedule.value.scheduledate;
    //     var scheduled_time = schedule.value.scheduletime;
    // }else{
    //     var delivery_type = "instant";
    //     var scheduled_date = null;
    //     var scheduled_time = null;
    // }

    try {
        const res = await axiosinstance.post('/vendor/order/intrastate/confirmation',{
            pAddress:pickData.value.address,
            pArea:pickData.value.area, 
            pAreaone:pickData.value.areaone, 
            pCity:pickData.value.city, 
            pCountry:pickData.value.country, 
            pEmail:pickData.value.email, 
            pLandmark:pickData.value.landmark, 
            pLatitude:pickData.value.latitude, 
            pLongitude:pickData.value.longitude, 
            pName:pickData.value.name, 
            pPhone:pickData.value.phone, 
            pPlaceid:pickData.value.placeid, 
            pPostalcode:pickData.value.postalcode, 
            pState:pickData.value.state,

            dAddress: DelivData.value.address,
            dArea: DelivData.value.area, 
            dAreaone: DelivData.value.areaone, 
            dCity: DelivData.value.city, 
            dCountry: DelivData.value.country, 
            dEmail: DelivData.value.email, 
            dLandmark: DelivData.value.landmark, 
            dLatitude: DelivData.value.latitude, 
            dLongitude: DelivData.value.longitude, 
            dName: DelivData.value.name, 
            dPhone: DelivData.value.phone, 
            dPlaceid: DelivData.value.placeid, 
            dPostalcode: DelivData.value.postalcode, 
            dState: DelivData.value.state,

            itemtype:dmethod.value.category, 
            image:dmethod.value.image, 
            description:dmethod.value.description, 
            distance:amtData.value.distance,
            time:amtData.value.time,
            type:"intrastate",////
            source:"vendor",
            slug:route.params.slug,

            vehicle_type:dmethod.value.Cmethods,
            amt:amtData.value.mobilityPrice, 
            delivery_type:delivery_type,
            pickup_date:scheduled_date,
            pickup_time:scheduled_time,

            senderid:senderdetails.value.senderid,
            sendername:senderdetails.value.sendername,
            senderemail:senderdetails.value.senderemail,
            senderphone:senderdetails.value.senderphone,
        });

        completedOrder.value = {
            status:res.data.status,
            orderNo:res.data.orderno,
            createdAt:res.data.created_at,
            generatedcode:res.data.generatedcode,
        }
        // status.value = res.data.status;
        // orderNo.value = res.data.orderno;
        // createdAt.value = res.data.created_at;
        // generatedcode.value = res.data.generatedcode
    
        IsdispatchConfirm.value = true;
 
        removeFromSession(pickupKey);
        removeFromSession(deliveryKey);
        removeFromSession(itemDetailsKey);
        removeFromSession(amtKey);
        removeFromSession(schedulekey);
        removeFromSession(SenderDetailKey);

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
}

</script>

<style lang="scss" scoped>

</style>