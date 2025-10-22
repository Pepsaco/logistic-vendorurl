<template>
    <div v-if="loading" class="page-loader">
        <!-- You can use a loading spinner or any other loading animation here -->
        <img src="../../assets/images/loader/pepsagif.png" alt="" class="animate__heartBeat animate__infinite animate__animated">
    </div>
    <div class="w-screen bg-[#f5f5f5] fixed left-0 right-0 bottom-0 px-4 mx-auto py-4 z-10 overflow-y-scroll h-full">
        <div class="grid mx-auto px-4">
            <div class="flex w-full"></div>
            <div class="flex w-full mt-[20px]">
                <div @click="$emit('closeOpm')" class="w-[10%] cursor-pointer">X</div>
            </div>
        </div>
         <div class="">
            <form @submit.prevent="OtherPaymentMethodfgf">
                <span class="text-[18px] font-semibold leading-[12px]">Payment Details</span>
                <div class="mt-[30px] grid">
                    <div class="grid ">
                        <label for="iem_category" class="text-[#000] leading-[130%]">Your Phone No. <span class="text-[#F00]">*</span></label>
                        <div class="flex w-full">
                            <select v-model="country_code" class="w-[40%] my-[10px] px-[18px] h-[52px] rounded-[10px] border-[2px] border-[#F3F3F3] bg-white " required>
                                <option v-for="country in country_code_list" :key="country.id" :value="country.phonecode">
                                    <span :class="['flag-icon', `flag-icon-${country.iso}`]"></span>
                                    +{{ country.phonecode }} {{ country.name }} 
                                </option>
                            </select>
                            <input type="text" class="w-[60%] my-[10px] px-[18px] h-[52px] rounded-[10px] border-[2px] border-[#F3F3F3] bg-white" name="" id="" v-model="pay_phone" autocomplete="off" readonly required>
                        </div>
                    </div>
                    <div class="grid mt-2">
                        <label for="iem_category" class="text-[#000] leading-[130%]">Your Full name <span class="text-[#F00]">*</span></label>
                        <div class="flex w-full">
                            <input type="text" class="w-[50%] my-[10px] px-[18px] h-[52px] rounded-[10px] border-[2px] border-[#F3F3F3] bg-white" name="" id="pay_first_name" v-model="pay_first_name" placeholder="First name" readonly required>
                            <input type="text" class="w-[50%] my-[10px] px-[18px] h-[52px] rounded-[10px] border-[2px] border-[#F3F3F3] bg-white" name="" id="pay_last_name" v-model="pay_last_name" placeholder="Last name" readonly required>
                        </div>
                    </div>
                    <div class="grid mt-2">
                        <label for="iem_category" class="text-[#000] leading-[130%]">Your Email <span class="text-[#F00]">*</span></label>
                        <input type="email" class="w-[100%] my-[10px] px-[18px] h-[52px] items-center rounded-[10px] border-[2px] border-[#F3F3F3] bg-white" name="" id="pay_email" v-model="pay_email" placeholder="example@example.com" readonly required>
                    </div>
                    <button type="submit" class="font-poppin text-center text-white text-[16px] font-semibold w-full p-3 mt-4 bg-wine" :disabled="processing"> {{ processing ? "Please wait" : "Pay now" }} </button>
                </div>
            </form>
         </div>
         <div v-if="showFlashSuccess" class="fixed bottom-[74px] left-0 right-0 bg-[#01947a] font-poppins font-bold text-[12px] w-full h-[40px] p-2 flex justify-center text-white">{{ showFlashSuccess }}</div>
        <div v-if="ShowFlashError" class="fixed bottom-[74px] left-0 right-0 bg-[#f12222] font-poppins font-bold text-[12px] w-full h-[40px] p-2 flex justify-center text-white">{{ ShowFlashError }}</div>
         <OrderCompleted v-if="IsdispatchConfirm" :ordComplete="completedOrder" />
    </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted  } from 'vue';
import axiosinstance from '@/auth';
 import country_code_list from '@/data/CountryList.json'
 import { pickupKey, deliveryKey, deliveryMethodKey, amtKey, merchantKey } from "@/config.js";
 import Swal from "sweetalert2";
import OrderCompleted from './OrderCompleted.vue';

const props = defineProps({ userData: Object });
const emit = defineEmits(["closeOpm"]);

const showFlashSuccess = ref(false);
const ShowFlashError = ref(false);

const pay_phone = ref("");
const pay_first_name = ref("");
const pay_last_name = ref("");
const pay_email = ref("");
const country_code = ref("234");

const amtData = ref({ mobilityPrice:null, distance:null, time:null });
const pickData = ref({
    address:null, area:null, areaone:null, city:null, country:null,email:null, landmark:null, latitude:null, longitude:null, name:null, phone:null, placeid:null, postalcode:null, state:null 
});
const DelivData = ref({
    address:null, area:null, areaone:null, city:null, country:null,email:null, landmark:null, latitude:null, longitude:null, name:null, phone:null, placeid:null, postalcode:null, state:null
});
const dmethod = ref({ category:null, Cmethods:null  });
const schedule = ref({ scheduledate:null, scheduletime:null  });

 const getuserData = () => {
    pay_phone.value = props.userData.phone;
     const username = ref(props.userData.name.split(" "));
     pay_first_name.value = username.value[0];
     pay_last_name.value = username.value[1];
     pay_email.value = props.userData.email;

    if (localStorage.getItem(amtKey) !== null) {
        let storedObject = JSON.parse(localStorage.getItem(amtKey));
        amtData.value = {
            mobilityPrice: Math.trunc(storedObject['total_amount']),
            distance: storedObject['distance'] ,
            time: storedObject['time'],
        }  
    }
    
    if (localStorage.getItem(pickupKey) !== null) {
        let PickupObject = JSON.parse(localStorage.getItem(pickupKey));
        pickData.value = {
            address:PickupObject['address'], area:PickupObject['area'], areaone:PickupObject['area_1'], city:PickupObject['city'], country:PickupObject['country'], email:PickupObject['email'], landmark:PickupObject['landmark'], latitude:PickupObject['latitude'], longitude:PickupObject['longitude'], name:PickupObject['name'], phone:PickupObject['phone'], placeid:PickupObject['placeid'], postalcode:PickupObject['postal_code'], state:PickupObject['state'] 
        }
    }
    
    if (localStorage.getItem(deliveryKey) !== null) {
        let dObject = JSON.parse(localStorage.getItem(deliveryKey));
        DelivData.value = {
            address:dObject['address'], area:dObject['area'], areaone:dObject['area_1'], city:dObject['city'], country:dObject['country'], email:dObject['address'], landmark:dObject['landmark'], latitude:dObject['latitude'], longitude:dObject['longitude'], name:dObject['name'], phone:dObject['phone'], placeid:dObject['placeid'], postalcode:dObject['postal_code'], state:dObject['state'] 
        }
         
    }
   
    if (localStorage.getItem(deliveryMethodKey) !== null) {
        let CatObject = JSON.parse(localStorage.getItem(deliveryMethodKey));
        dmethod.value ={ category:CatObject['category'], Cmethods:CatObject['method']  };
    }

    if (localStorage.getItem(schedulekey) !== null) {
        let schdule = JSON.parse(localStorage.getItem(schedulekey));
        schedule.value ={ scheduledate:schdule['scheduledate'], scheduletime:schdule['scheduletime']  };
    } 

 }
onMounted(() =>{
    getuserData();
    
})
const getRandomNumber = (digit) =>{
    return Math.random().toFixed(digit).split('.')[1];
}
const processing = ref(false);
const OtherPaymentMethodfgf = async () => {
    // console.log(Math.trunc(props.userData.price))
    if(pay_phone.value == "" || pay_first_name.value == "" || pay_last_name.value == "" ){
        ShowFlashError.value = "Kindly fill all required fields.";
        setTimeout(() => (ShowFlashError.value = false), 3500);
    }
   
    processing.value = true;
    
    let email = null;
    if(pay_email.value){ email = pay_email.value; }

    const  getRandomNumber = (digit) =>{
        return Math.random().toFixed(digit).split('.')[1];
    }
    const newNumber = parseInt(pay_phone.value.toString().slice(1)); // 2345
    var phone_num = country_code.value+newNumber
    var merchantRef = getRandomNumber(16);
    // var Apimerchant = merchantKey;
    const paymentOptions = {
        //removeCoin: true,
        // removeWalletpay: true,
        // removeBankdeposit: true,
        // removeCardpay: true,
        email : email, 
        firstname:pay_first_name.value, 
        lastname:pay_last_name.value, 
        phoneNumber:phone_num,
        fixedAmount:Math.trunc(props.userData.price)
    };
    // console.log(paymentOptions)
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

const loading = ref(false);
const status = ref("");
const orderNo = ref("");
const createdAt = ref("");
const generatedcode = ref("");

const IsdispatchConfirm = ref(false);
const completedOrder = ref({});
const finalizeCheckoutPayment = async (res) =>{
    loading.value = true
    var r = "App_ID000493_mbEXOMu8GPAAQPAAvQMhbr0KM2LhrwdJTFYKCSWVd";
    let storedObject = '';
    if (localStorage.getItem(r) !== null) {
        storedObject = localStorage.getItem(r);
    }

    if(schedule.value.scheduledate != "" && schedule.value.scheduletime != ""){
        var delivery_type = "schedule";
        var scheduled_date = schedule.value.scheduledate;
        var scheduled_time = schedule.value.scheduletime;
    }else{
        var delivery_type = "instant";
        var scheduled_date = null;
        var scheduled_time = null;
    }

    try {
        const res = await axiosinstance.post('/open-dispatch/checkout/order/success',{
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

            
            category:dmethod.value.category, 
            Cmethods:dmethod.value.Cmethods,
            
            amt:amtData.value.mobilityPrice, 
            distance:amtData.value.distance,
            time:amtData.value.time,
             
            delivery_type:delivery_type,
            pickup_date:scheduled_date,
            pickup_time:scheduled_time,

            or: getRandomNumber(12),
            r_method:"Pepsa_rider",
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

        localStorage.removeItem("App_ID079529_2y0$NLu0rrMhbrYSwRhTYZsvmscvd7sdnshdsd");
        localStorage.removeItem("App_ID30440_y$10$g7u0rrMhbrYSwRhTYZzoSo5edlqgBED/QC9xL");
        localStorage.removeItem("App_ID120494_$NLu0rrMhbrYSwRhTYZzoSoXOMuGPAAvQMhbrYS");
        localStorage.removeItem("App_ID079529_2y0$NLu0rrMhbrYSwRhTYZzoSo5edlqgBED/QC9xLT/wUuIvq8kEc5S");
        localStorage.removeItem("App_ID247005_Zj0KMXU2Lhr0mbEXOMu8WkEe3otVdCgPrTtXYpk");
        localStorage.removeItem("App_ID079529_2y0$NLu0rrMhbrYSwRhTYZ");
         localStorage.removeItem("App_ID261234_Zj0KMXU2Lhr0gfDE4AAwmbEXOMu8WkEe3otVdCg");
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