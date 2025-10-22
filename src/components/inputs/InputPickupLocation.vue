
<template>
    <div class="grid mt-2">
        <label for="" class="font-medium text-[18px] p-2 leading-[130%]">Pickup Location <span class="text-[#F00]">*</span></label>
        <div class="flex w-full border border-[#898F8F] rounded-[7px] p-3">
            <span class="w-[10%]"><img src="../../assets/images/icons/location.png" alt=""></span>
            <input type="text"
            id="searchMapInput"
            ref="searchMapInput"
            placeholder="Select pickup location"
            autocomplete="off"
            class="w-[90%] mapControls bg-white">
        </div>
        <div @click="AddPiickupDetails" class="p-2 w-full">
            <span class="text-[#9D0208] text-[13px]">Add Pickup Details</span>
        </div>
        <AddPickupDetails v-if="IsDisplayForm" @Closeform="handleCloseform"  @addpickupaddress="handlepickupSubmited"/>
    </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import AddPickupDetails from "../AddPickupDetails.vue";
import Swal from "sweetalert2";
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

const IsDisplayForm = ref(false);
const AddPiickupDetails = () =>{ IsDisplayForm.value = true; }
const handleCloseform = () =>{ IsDisplayForm.value = false; }

const handlepickupSubmited = (pickup) =>{
    var deliverystate =""; var deliveryphone = "";
    
    if (getFromSession(deliveryKey) !== null) {
        let storedDelivery = JSON.parse(getFromSession(deliveryKey));
        // let storedDelivery = JSON.parse(localStorage.getItem(p));
        deliverystate = storedDelivery['state'];
        deliveryphone = storedDelivery['phone'];
    }else{
        deliverystate = '';
        deliveryphone = '';
    } 


 
    let lid = {
        'longitude':locationData.value.longitude,
        'latitude':locationData.value.latitude, 
        'placeid':locationData.value.place_id,
        'address':pickup.address, 
        'landmark':pickup.landmark,
        'area_1':locationData.value.location,
        'area':locationData.value.sublocality_level_1,
        'city':locationData.value.locality, 
        'state':locationData.value.administrative_area_level_1, 
        'postal_code':locationData.value.postal_code,
        'country':locationData.value.country,
        'name':pickup.full_name,
        'phone':pickup.phone_no,
        'email':pickup.email
    };
    if (locationData.value.location === null) {
      Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Search and select Pickup location first.",
            showConfirmButton: true,
            timer: 4500
        });
        IsDisplayForm.value = false;  
        return;

    }

    if(deliverystate === "" || deliveryphone === ""){
       saveToSession(pickupKey, JSON.stringify(lid))
      Swal.fire({
          icon: "success",
          title: "Successfully Saved",
          html: "Pickup details for <strong>"+locationData.value.location +"has been saved.",
          showConfirmButton: true,
          timer: 3500
      });
      IsDisplayForm.value = false;  
      return;   
    }

    if(deliverystate !== locationData.value.administrative_area_level_1){
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Deliveries are done within same state.",
          showConfirmButton: true,
          timer: 4500
      });
      return;
    }

    if(deliveryphone == pickup.phone_no){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Delivery phone number has to be different from Pickup nunber",
            showConfirmButton: true,
            timer: 4500
        });
        return;
    }

     saveToSession(pickupKey, JSON.stringify(lid))
    // localStorage.setItem(pickupKey, JSON.stringify(lid));
    Swal.fire({
        icon: "success",
        title: "Successfully Saved",
        html: "Pickup details for <strong>"+locationData.value.location +"has been saved.",
        showConfirmButton: false,
        timer: 1500
    });
    IsDisplayForm.value = false;  
    return;    
}
</script>

<style scoped>

</style>