<template>
    <div class="grid mt-2">
        <label for="" class="font-medium text-[18px] p-2 leading-[130%]">Delivery Location <span class="text-[#F00]">*</span></label>
        <div class="flex w-full border border-[#898F8F] rounded-[7px] p-3">
            <span class="w-[10%]"><img src="../../assets/images/icons/dropoff_green.png" alt=""></span>
            <input type="text" name=""
            id="searchMapInput"
            ref="searchMapInput"
            placeholder="Select delivery location"
            autocomplete="off"
             class="w-[90%] mapControls bg-white">
        </div>
        <div @click="AddNewDeliveryDetails" class="p-2 w-full">
            <span class="text-[#9D0208] text-[13px]">Add Drop off Details</span>
        </div>
        <AddDeliveryDetails v-if="IsDisplayDForm" @CloseDform="handleDCloseform"  @adddeliveryaddress="handleDeliverySubmited"/>
    </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import Swal from "sweetalert2";
import AddDeliveryDetails from "../AddDeliveryDetails.vue";
import { pickupKey, deliveryKey } from "@/config.js";
import { useSessionEncryption } from '@/composables/useSessionEncryption'

const { saveToSession, getFromSession } = useSessionEncryption()

const searchMapInput = ref(null);
const locationData = ref({
  longitude: null,
  latitude: null,
  place_id: null,
  location: null,
  sublocality_level_1: null,
  locality: null,
  administrative_area_level_1: null,
  postal_code: null,
  country: null
});

const initMap = () => {
  if (!window.google) {
    console.error("Google Maps API not loaded.");
    return;
  }

  const originAutoComplete = new google.maps.places.Autocomplete(searchMapInput.value, {
    bounds: new google.maps.LatLngBounds(new google.maps.LatLng(9.077751, 8.6774567)),
    componentRestrictions: { country: ["NG"] }
  });

  originAutoComplete.addListener("place_changed", () => {
    const place = originAutoComplete.getPlace();
    if (!place.geometry) return;

    // selectedLocation.value = place.formatted_address;
    locationData.value = {
      longitude: place.geometry.location.lng(),
      latitude: place.geometry.location.lat(),
      place_id: place.place_id,
      location: place.formatted_address,
      sublocality_level_1: null,
      locality: null,
      administrative_area_level_1: null,
      postal_code: null,
      country: null
    };

    for (const component of place.address_components) {
      const type = component.types[0];
      switch (type) {
        case "sublocality_level_1":
          locationData.value.sublocality_level_1 = component.long_name;
          break;
        case "locality":
          locationData.value.locality = component.long_name;
          break;
        case "country":
          locationData.value.country = component.long_name;
          break;
        case "administrative_area_level_1":
          locationData.value.administrative_area_level_1 = component.long_name;
          break;
        case "postal_code":
          locationData.value.postal_code = component.long_name;
          break;
      }
    }
  });
};
onMounted(initMap);

const IsDisplayDForm = ref(false);
const AddNewDeliveryDetails = () =>{ IsDisplayDForm.value = true; }
const handleDCloseform = () =>{ IsDisplayDForm.value = false; }

const handleDeliverySubmited = (delivery) =>{
    var pickupstate =""; var pickuphone = "";
    if (getFromSession(pickupKey) !== null) {
      let storedPickup = JSON.parse(getFromSession(pickupKey));
        // let storedPickup = JSON.parse(localStorage.getItem(p));
        pickupstate = storedPickup['state'];
        pickuphone = storedPickup['phone'];
    }else{
        pickupstate = '';
        pickuphone = '';
    }



    
    let lid = {
        'longitude':locationData.value.longitude,
        'latitude':locationData.value.latitude, 
        'placeid':locationData.value.place_id,
        'address':delivery.address, 
        'landmark':delivery.landmark,
        'area_1':locationData.value.location,
        'area':locationData.value.sublocality_level_1,
        'city':locationData.value.locality, 
        'state':locationData.value.administrative_area_level_1, 
        'postal_code':locationData.value.postal_code,
        'country':locationData.value.country,
        'name':delivery.full_name,
        'phone':delivery.phone_no,
        'email':delivery.email
    };
    if (locationData.value.location === null) {
      Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Search and select delivery location first.",
            showConfirmButton: true,
            timer: 4500
        });
        IsDisplayDForm.value = false;  
        return;

    }

    if(pickupstate === "" || pickuphone === ""){
       saveToSession(deliveryKey, JSON.stringify(lid))
      Swal.fire({
          icon: "success",
          title: "Successfully Saved",
          html: "Pickup details for <strong>"+locationData.value.location +"has been saved.",
          showConfirmButton: false,
          timer: 1500
      });
      IsDisplayDForm.value = false;  
      return;   
    }

    if(pickupstate !== locationData.value.administrative_area_level_1){
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Deliveries are done within same state.",
          showConfirmButton: true,
          timer: 4500
      });
      return;
    }

    if(pickuphone == delivery.phone_no){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Delivery phone number has to be different from Pickup nunber",
            showConfirmButton: true,
            timer: 4500
        });
        return;
    }


    saveToSession(deliveryKey, JSON.stringify(lid))
    // localStorage.setItem(deliveryKey, JSON.stringify(lid));
    Swal.fire({
        icon: "success",
        title: "Successfully Saved",
        html: "Delivery details for <strong>"+locationData.value.location +"has been saved.",
        timer: 1500
    });
    IsDisplayDForm.value = false;  
    return;   

    // if(pickupstate !="" || pickuphone != ""){
    //     if(pickupstate != locationData.value.administrative_area_level_1){
    //         Swal.fire({
    //             icon: "error",
    //             title: "Oops...",
    //             text: "Deliveries are done within same state.",
    //             showConfirmButton: true,
    //             timer: 4500
    //         });
    //     }else if(pickuphone == pickuphone.phone_no){
    //         Swal.fire({
    //             icon: "error",
    //             title: "Oops...",
    //             text: "Delivery phone number has to be different from Pickup nunber",
    //             showConfirmButton: true,
    //             timer: 4500
    //         });
    //     }else{
    //         var r = "App_ID079529_2y0$NLu0rrMhbrYSwRhTYZzoSo5edlqgBED/QC9xLT/wUuIvq8kEc5S";
    //         let lid = {
    //             'longitude':locationData.value.longitude,
    //             'latitude':locationData.value.latitude, 
    //             'placeid':locationData.value.place_id,
    //             'address':delivery.address, 
    //             'landmark':delivery.landmark,
    //             'area_1':locationData.value.location,
    //             'area':locationData.value.sublocality_level_1,
    //             'city':locationData.value.locality, 
    //             'state':locationData.value.administrative_area_level_1, 
    //             'postal_code':locationData.value.postal_code,
    //             'country':locationData.value.country,
    //             'name':delivery.full_name,
    //             'phone':delivery.phone_no,
    //             'email':delivery.email
    //             };
 
    //         if (localStorage.getItem(r) !== null) {
    //             localStorage.setItem(r, JSON.stringify(lid));
    //         } else {
    //              localStorage.setItem(r, JSON.stringify(lid));
    //         }
    //         Swal.fire({
    //             icon: "success",
    //             title: "Delivery details has been saved.",
    //             showConfirmButton: false,
    //             timer: 1500
    //         });
    //     }
    // }else{
    //     var r = "App_ID079529_2y0$NLu0rrMhbrYSwRhTYZzoSo5edlqgBED/QC9xLT/wUuIvq8kEc5S";
    //     let lid = {
    //         'longitude':locationData.value.longitude,
    //         'latitude':locationData.value.latitude, 
    //         'placeid':locationData.value.place_id,
    //         'address':delivery.address, 
    //         'landmark':delivery.landmark,
    //         'area_1':locationData.value.location,
    //         'area':locationData.value.sublocality_level_1,
    //         'city':locationData.value.locality, 
    //         'state':locationData.value.administrative_area_level_1, 
    //         'postal_code':locationData.value.postal_code,
    //         'country':locationData.value.country,
    //         'name':delivery.full_name,
    //         'phone':delivery.phone_no,
    //         'email':delivery.email
    //     };
       
    //     if (localStorage.getItem(r) !== null) {
    //          localStorage.setItem(r, JSON.stringify(lid));
    //     } else {
    //         localStorage.setItem(r, JSON.stringify(lid));
    //     }
    //     Swal.fire({
    //         icon: "success",
    //         title: "Delivery details has been saved.",
    //         showConfirmButton: false,
    //         timer: 1500
    //     });
        
    // }
    // IsDisplayDForm.value = false;         
}
</script>

<style lang="scss" scoped>

</style>