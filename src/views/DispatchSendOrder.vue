<template>
    <div class="bg-white">
        <div class="header sticky top-0 left-0 right-0 bg-white pl-[17px] pr-[18px] pt-3 pb-[13px] justify-center items-center flex" style="box-shadow: 0px 4px 4px 0px #00000040;">
            <div class="w-[5%] flex justify-start"> 
                <RouterLink :to="'/myportal/dashboard'" ><img src="../assets/images/icons/arrow_back.png" alt=""></RouterLink>
            </div>
            <div class="w-[90%] flex justify-start pl-4">
                <span v-if="isLoggedIn" class="font-semibold text-center"> Welcome {{ authStore.user.data.fname }}</span>
                <span v-else class="font-semibold text-center"> Welcome</span>
            </div>
            <div class="w-[5%] flex justify-end">
                <a  v-if="isLoggedIn"  href="#" @click="handleLogout()" class="">
                    <ArrowLeftStartOnRectangleIcon class="w-4 h-4 text-wine" />
                    <!-- <img src="../assets/images/icons/bar.png" alt=""> -->
                </a>
                <a  v-else href="#" @click="AuthenticateUser()" class="">
                    <UserIcon class="w-4 h-4 text-wine" />
                    <!-- <img src="../assets/images/icons/bar.png" alt=""> -->
                </a>
            </div>
        </div>
        <div class="main w-full  rounded-[32px] bg-[#F5F5F5] max-h-[896px] h-screen overflow-scroll mb-[10px]"> 
            <!-- <div class="w-screen mx-auto px-4 mt-6"> -->
            <div class="w-[90%] flex justify-start pl-4 mb-4 mt-4">
                <span class="font-[12px] text-[#111111]">How would you like to deliver an item?</span>
            </div>
            <div class="flex justify-center w-full mx-auto  mb-4">
                <div class="w-[30%] h-[73.95px] grid py-4 px-3 mx-1 bg-[#9D0208] rounded-[8px]" @click="IsIntraStateConfirm = true">
                    <span class="flex justify-center mb-2">
                        <img src="../assets/images/icons/city_delivery.png" alt="" class="w-[24px] h-[24px]">
                    </span>
                    <div class="grid">
                        <span class="font-josefin font-semibold text-[12.35px] text-[#fff]">City Delivery</span>
                    </div>
                </div>
                <div class="w-[30%] h-[73.95px] grid py-4 px-3 mx-1 bg-[#FAF9F7] rounded-[8px]"  @click="IsInterStateConfirm = true">
                    <span class="flex justify-center mb-2">
                        <img src="../assets/images/icons/city2city.png" alt="" class="w-[24px] h-[24px]">
                    </span>
                    <div class="grid">
                        <span class="font-josefin font-semibold text-[12.35px] text-[#000000]">City to City</span>
                    </div>
                </div>
                <div class="w-[30%] h-[73.95px] grid py-4 px-3 mx-1 bg-[#FAF9F7] rounded-[8px]"  @click="IsLargeCourierConfirm = true">
                    <span class="flex justify-center mb-2">
                        <img src="../assets/images/icons/large_courier.png" alt="" class="w-[24px] h-[24px]">
                    </span>
                    <div class="grid">
                        <span class="font-josefin font-semibold text-[12px] text-[#000000]">Large Courier</span>
                    </div>
                </div>
            </div>
            <InterStateDispatchModal @handleInterClose="closeInter" v-if="IsInterStateConfirm"/>
            <IntraStateDispatchModal  @handleIntraClose="closIntra" v-if="IsIntraStateConfirm"/>
            <LargeCourierModal  @handleLargeClose="closeLarge" v-if="IsLargeCourierConfirm"/>
            <AuthenticationForm v-if="IsLoginForm" @CloseLoginform="IsLoginForm = false"/>

             <div >
                <div class="flex mb-4">
                    <span class="w-[80%] mx-4 font-poppins text-[17.13px] font-bold leading-[25px]">History</span>
                    <!-- <div @click="navigateTo('/myportal/account/reports')" class="w-[20%] flex justify-end   ">
                        <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.09326 13L7 7L1.09326 1" stroke="#9D0208" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div> -->
                </div>
                <div class="recent-trnsactions max-h-[400px] h-[350px] overflow-y-scroll ">
                    <div class="" v-if="items" >
                        <div v-for="trxn in items" :key="trxn.index" class="w-full grid px-4  border-b border-[#3A3A3A] py-3 mb-3">
                            <RouterLink :to="`/vendor/order/${slug}/auth/${trxn.master_slug}`" >
                            <div class="flex w-full">
                                <div class="w-[70%] grid">
                                    <span class="font-poppins text-wine text-[14px]">{{trxn.order_no}}</span>
                                    <span class="font-poppins  text-[14px] text-[#3A3A3A]" v-if="trxn.dispatch_type == 'intrastate'">Type: City Delivery</span>
                                    <span class="font-poppins  text-[14px] text-[#3A3A3A]" v-if="trxn.dispatch_type == 'interstate'">Type: City to City</span>
                                </div>
                                <div class="w-[30%] flex justify-end">
                                   <div class="w-[100px] h-[35px] bg-wine py-2 text-white rounded text-center font-poppins text-[12px] capitalize"> {{trxn.order_status}} </div>
                                </div>
                            </div>
                            <div class="flex w-full mt-2">
                                 <div class="w-[20%] mx-2 flex items-center">
                                    <div class="rounded border border-wine bg-[#FFEBEB] p-2">
                                        <span class="">
                                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.5767 0.330404C21.0172 -0.110135 21.7296 -0.110135 22.1654 0.330404L23.6652 1.83011C24.1057 2.27065 24.1057 2.98301 23.6652 3.41886L19.5878 7.49619L21.4156 9.32396C21.739 9.64733 21.8327 10.1301 21.6593 10.5518C21.4859 10.9736 21.0735 11.2455 20.6189 11.2455H13.8749C13.2516 11.2455 12.7501 10.744 12.7501 10.1207V3.37668C12.7501 2.92209 13.0219 2.50967 13.4437 2.33626C13.8655 2.16286 14.3482 2.25659 14.6716 2.57996L16.4994 4.40773L20.5767 0.330404ZM3.37693 12.7499H10.1256C10.7489 12.7499 11.2504 13.2513 11.2504 13.8746V20.6233C11.2504 21.0779 10.9786 21.4903 10.5568 21.6637C10.135 21.8371 9.65227 21.7434 9.32889 21.42L7.50112 19.5923L3.42379 23.6696C2.98326 24.1101 2.27089 24.1101 1.83504 23.6696L0.330648 22.1699C-0.109891 21.7293 -0.109891 21.017 0.330648 20.5811L4.40798 16.5038L2.58021 14.6714C2.25683 14.348 2.1631 13.8653 2.33651 13.4435C2.50991 13.0217 2.92233 12.7499 3.37693 12.7499Z" fill="#888888"/>
                                        </svg>
                                        </span>
                                    </div>
                                 </div>
                                <div class="w-[80%] grid">
                                    <span class="font-poppins text-[10px] text-[#3A3A3A]">{{trxn.package}}</span>
                                    <span class="font-poppins text-[12px] text-wine">{{trxn.location}}</span>
                                    <span class="font-poppins  text-[10px] text-[#3A3A3A]">{{ $format_date(trxn.created_at) }}</span>
                                </div>
                            </div>
                            </RouterLink>
                        </div>
                        <div class="grid justify-center items-center mt-3">
                            <button @click="fetchItems" v-if="page <= totalPages && !loading" class="mt-4 text-white rounded w-[120px] border p-2 bg-wine">Load More</button>
                            <div class="font-poppins text-[20px]" v-if="loading" >Loading...</div>
                        </div>
                    </div>
                    <div class="mt-[10px] bgshadow-1 font-poppins font-medium text-[14px] text-[#4A4A4A] text-ellipsis overflow-hidden" v-else>No recent transaction</div>
                   
                </div>
            </div>
        </div>
 
    </div>
</template>
<script setup>
import Swal from "sweetalert2";
import { useNavigation } from "@/composables/useNavigation";
import axiosinstance from '@/auth';
import { ref, computed, onMounted, watch} from "vue";
import InterStateDispatchModal from "@/components/modal/InterStateDispatchModal.vue";
import IntraStateDispatchModal from "@/components/modal/IntraStateDispatchModal.vue";
import LargeCourierModal from "@/components/modal/LargeCourierModal.vue";
import { useAuthenticationStore } from '@/stores/authentication';
import AuthenticationForm from "@/components/authentication/AuthenticationFormDirect.vue";
import { useEncryption } from '@/composables/useEncryption';
import { AuthenticationKey } from '@/config.js'
import { UserIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/vue/24/outline"
 import {  useRoute } from 'vue-router'

 const route = useRoute();
const { getFromLocalStorage } = useEncryption();
const { navigateTo } = useNavigation();
const authStore = useAuthenticationStore();
const IsInterStateConfirm = ref(false)
const IsIntraStateConfirm = ref(false)
const IsLargeCourierConfirm = ref(false)
const IsLoginForm = ref(false)
// const ConfirmTelcoProduct = async () => {

// }

const closeInter = () =>{ IsInterStateConfirm.value = false }
const closIntra = () =>{ IsIntraStateConfirm.value = false }
const closeLarge = () =>{ IsLargeCourierConfirm.value = false }

const isLoggedIn = computed(() => !!authStore.user);

const AuthenticateUser = () =>{
IsLoginForm.value = true
}

const slug = ref('');
onMounted(async () =>{
    slug.value = route.params.slug;
   const token = getFromLocalStorage(AuthenticationKey);
    if (!authStore.user && token) {
      await authStore.getUser();
       
   }
});

watch(() => authStore.user, (val) => {
  if (val) {
    fetchItems();
  }
});

const items = ref([]);
// const items = ref([]);
const loading = ref(false);
const page = ref(1);
const totalPages = ref(1);
const selectedItem = ref(null);

const fetchItems = async () => {
    if (loading.value || page.value > totalPages.value) return;
    loading.value = true;
    try {
        const response = await axiosinstance.get(`/vendor/dispatch/order/list/${page.value}`);
       
        items.value.push(...response.data.trxn.data); // Append new data
        totalPages.value = response.data.trxn.last_page;
        page.value++;

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Not Logged in",
            text: error.response.data.message,
            showConfirmButton: true,
            timer: 3500
        });
        console.error("Error fetching items:", error.response.data.message);
    } finally {
        loading.value = false;
    }
};

 

const handleLogout = async () => {
    const res = await axiosinstance.post('/vendor/logout')
    .then((res) => {
            localStorage.removeItem('App_ID43049_2QyMZ36BU8FYKCSWkEe3otVdCgPrTtXYpkwI5');
            window.location.reload(); 
            // router.go('/');
    });
}
</script>