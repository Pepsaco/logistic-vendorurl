<template>
    <div>
         <div class="w-screen bg-[#f5f5f5] fixed left-0 right-0 top-0 px-4 mx-auto py-4 z-10 overflow-y-scroll h-full">
            <div class="flex w-full h-full items-center justify-center">
                <div  class="text-[#F00] font-rubik text-[16px] font-semibold leading-[36px] capitalize grid" v-if="loader == true">
                    <span class="p-6">Processing dispatch ...</span> 
                    <img src="../../assets/images/loader/transfer-loader.gif" class="w-[50px]"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {  ref, onMounted } from 'vue';
import axiosinstance from '@/auth';
import { useRouter,  useRoute } from 'vue-router';
import { pickupKey, deliveryKey, itemDetailsKey , InterStateItemInfoKey, SenderDetailKey} from "@/config.js";
import { useSessionEncryption } from '@/composables/useSessionEncryption'
import Swal from "sweetalert2";

const { removeFromSession, getFromSession } = useSessionEncryption()


const router = useRouter();
 const route = useRoute()

const pickData = ref({
    address:null, area:null, areaone:null, city:null, country:null,email:null, landmark:null, latitude:null, longitude:null, name:null, phone:null, placeid:null, postalcode:null, state:null 
});
const DelivData = ref({
    address:null, area:null, areaone:null, city:null, country:null,email:null, landmark:null, latitude:null, longitude:null, name:null, phone:null, placeid:null, postalcode:null, state:null
});
const dmethod = ref({ category:null, image:null, description:null, package_type:null});

const interstateitem = ref({ packagename:null, weight:null, dimension:null , handling:null, category:null });
const senderdetails = ref({ sendername:null, senderemail:null, senderphone:null  });

const loader = ref(true);

onMounted(() =>{
    calculateDistanceTime();
   
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
        dmethod.value ={ package_type:CatObject['package_type'], image:CatObject['image'] , description:CatObject['description'] ,category:CatObject['category'] };
    } 

    if (getFromSession(InterStateItemInfoKey) !== null) {
        let itemData = JSON.parse(getFromSession(InterStateItemInfoKey));
        interstateitem.value ={ packagename:itemData['name'], weight:itemData['weight'] ,dimension:itemData['dimension'] , handling:itemData['itemHandling'] };
    } 
    if (getFromSession(SenderDetailKey) !== null) {
        let senderData = JSON.parse(getFromSession(SenderDetailKey));
        senderdetails.value ={ senderid:senderData['senderid'],sendername:senderData['sendername'], senderemail:senderData['senderemail'] , senderphone:senderData['senderphone'] };
    } 

})

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
        
        // var it = "App_ID247005_Zj0KMXU2Lhr0mbEXOMu8WkEe3otVdCgPrTtXYpk";
        if (getFromSession(itemDetailsKey) !== null) {
            let storedObject = JSON.parse(getFromSession(itemDetailsKey));
            deliverymethod = storedObject['method'];
            
        }
 
        // Ensure locations are available
        if (!PickupLocation || !DeliveryLocation) {
            router.push('/vendor/'+route.params.slug+'/send/item');
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

                        finalizeCheckoutPayment(distanceText, timeText)   
                       
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

const finalizeCheckoutPayment = async (distance, time) => {
    loader.value = true
    const slug = route.params.slug
    try {
        const res = await axiosinstance.post('/vendor/order/interstate/confirmation',{
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
            distance:distance,
            time:time,
            type:"interstate",////
            source:"vendor",
            slug:route.params.slug,
            ////item info
            package_type: dmethod.value.package_type, //standard-package
            itemname:interstateitem.value.itemname,
            weight:interstateitem.value.weight,
            dimension:interstateitem.value.dimension,
            handling:interstateitem.value.handling,
            /////sender
            senderid:senderdetails.value.senderid,
            sendername:senderdetails.value.sendername,
            senderemail:senderdetails.value.senderemail,
            senderphone:senderdetails.value.senderphone,
        });

         Swal.fire({
            icon: "success",
            title: "Order Completed",
            text: res.message,
            showConfirmButton: true,
            timer: 3500
        });
        loader.value=false
    
        removeFromSession(pickupKey);
        removeFromSession(deliveryKey);
        removeFromSession(itemDetailsKey);
        removeFromSession(InterStateItemInfoKey);
        removeFromSession(SenderDetailKey);
  
       
        setTimeout( () =>  {
            router.push("/vendor/order/"+slug+"/auth/"+res.data.master_slug);
        }, 3500);
        
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