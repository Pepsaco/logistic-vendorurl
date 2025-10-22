
<template>
    <div class="bg-white">
        <div class="header sticky top-0 left-0 right-0 bg-white pl-[17px] pr-[18px] pt-3 pb-[13px] justify-center items-center flex" style="box-shadow: 0px 4px 4px 0px #00000040;">
            <div class="w-[5%] flex justify-start"> 
                <RouterLink :to="'/myportal/dashboard'" ><img src="../../../assets/images/icons/arrow_back.png" alt=""></RouterLink>
                <!-- <a href="#" @click="navigateTo('/myportal/dashboard')" class="">
                    <img src="../../../assets/images/icons/arrow_back.png" alt="">
                </a> -->
            </div>
            <div class="w-[90%] flex justify-start pl-4">
                <span class="font-semibold text-center"> Welcome {{ authStore.user.data.name }}</span>
            </div>
            <div class="w-[5%] flex justify-end">
                <a href="#" class="">
                    <img src="../../../assets/images/icons/bar.png" alt="">
                </a>
            </div>
        </div>
        <div class="w-screen mx-auto px-4 mt-6">
           <div class="grid mx-auto px-2 mb-4">
               <RouterLink :to="'/opendispatch/send-orders'" class="w-full h-[128px] grid py-4 px-3 bg-[#FFA2A6] rounded">
                   <!-- <div class="flex w-full h-full justify-end  top-[74px] left-0 z-[9999]" style="position: relative;">
                        <iconify-icon icon="ant-design:thunderbolt-outlined" width="144.48px" height="144.48px" style="color:#fff" class=" opacity-25" ></iconify-icon>
                    </div> -->
                    <span class="flex px-1 py-1 font-josefin font-semibold text-[12px] text-[#000]">
                        <iconify-icon icon="ant-design:thunderbolt-outlined" width="36.69px" height="36.69px" style="color:#9D0208" ></iconify-icon>
                    </span>
                    <div class="grid">
                        <span class="font-josefin font-semibold text-[18.35px] text-[#111111]">Instant Delivery</span>
                        <span class="font-josefin font-light text-[13px] text-[#4F4F4F]">Agent takes only your package and delivers instantly</span>
                    </div>
                </RouterLink>
                <RouterLink :to="'/opendispatch/schedule/send-orders'" class="mt-3 w-full h-[128px] grid py-4 px-3 bg-[#FFEBEB] rounded">
                    <!-- <div class="flex w-full h-full justify-end fixed left-[-39px]">
                        <img src="../../../assets/images/icons/timer_big_24px.png" alt="" class="w-[100px] h-[100px]">
                    </div> -->
                    <span class="flex px-1 py-1 font-josefin font-semibold text-[12px] text-[#000]">
                        <img src="../../../assets/images/icons/timer_24px.png" alt="">
                   </span>
                    <div class="grid">
                        <span class="font-josefin font-semibold text-[18.35px] text-[#111111]">Schedule Delivery</span>
                        <span class="font-josefin font-light text-[13px] text-[#4F4F4F]">Agent comes to pickup on your specified date & time</span>
                    </div>
                </RouterLink>
           </div>
            <div >
                <div class="flex mb-4">
                    <span class="w-[80%] font-poppins text-[17.13px] font-bold leading-[25px]">History</span>
                    <!-- <div @click="navigateTo('/myportal/account/reports')" class="w-[20%] flex justify-end   ">
                        <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.09326 13L7 7L1.09326 1" stroke="#9D0208" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div> -->
                </div>
                <div class="recent-trnsactions max-h-[200px] h-[180px] overflow-y-scroll " style="overflow-y: scroll;">
                    <div class="" v-if="items" >
                        <div v-for="trxn in items" :key="trxn.index" >
                            <div  class="h-[74px] flex items-center px-[4px] w-full" style="border-radius: 6px;background: #FFF;box-shadow: 0px 2px 48px 0px rgba(0, 0, 0, 0.06);"  @click="navigateTo(`/opendispatch/order/auth/${trxn.master_slug}`)">
                                <!-- redirecto(trxn.master_slug) -->
                                <div class="flex justify-center items-center h-[46px] w-[45.285px] rounded-[6px] bg-[#F5F5F5] mr-[5px]">
                                
                                    <span  v-if="trxn.status == 'pending'">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.5767 0.330404C21.0172 -0.110135 21.7296 -0.110135 22.1654 0.330404L23.6652 1.83011C24.1057 2.27065 24.1057 2.98301 23.6652 3.41886L19.5878 7.49619L21.4156 9.32396C21.739 9.64733 21.8327 10.1301 21.6593 10.5518C21.4859 10.9736 21.0735 11.2455 20.6189 11.2455H13.8749C13.2516 11.2455 12.7501 10.744 12.7501 10.1207V3.37668C12.7501 2.92209 13.0219 2.50967 13.4437 2.33626C13.8655 2.16286 14.3482 2.25659 14.6716 2.57996L16.4994 4.40773L20.5767 0.330404ZM3.37693 12.7499H10.1256C10.7489 12.7499 11.2504 13.2513 11.2504 13.8746V20.6233C11.2504 21.0779 10.9786 21.4903 10.5568 21.6637C10.135 21.8371 9.65227 21.7434 9.32889 21.42L7.50112 19.5923L3.42379 23.6696C2.98326 24.1101 2.27089 24.1101 1.83504 23.6696L0.330648 22.1699C-0.109891 21.7293 -0.109891 21.017 0.330648 20.5811L4.40798 16.5038L2.58021 14.6714C2.25683 14.348 2.1631 13.8653 2.33651 13.4435C2.50991 13.0217 2.92233 12.7499 3.37693 12.7499Z" fill="#888888"/>
                                        </svg>
                                    </span>
                                    <span  v-else-if="trxn.status == 'accepted'">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.60024 19.2V10.8H6.00024V19.2H3.60024ZM10.8002 19.2V10.8H13.2002V19.2H10.8002ZM0.000244141 24V21.6H24.0002V24H0.000244141ZM18.0002 19.2V10.8H20.4002V19.2H18.0002ZM0.000244141 8.4V6L12.0002 0L24.0002 6V8.4H0.000244141Z" fill="#888888"/>
                                        </svg>
                                    </span>
                                    <span  v-else-if="trxn.status == 'Received'">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.5002 20L16.3602 10.27H13.0002V4L8.00024 13.73H11.5002V20ZM12.0002 2C14.7502 2 17.1002 3 19.0502 4.95C21.0002 6.9 22.0002 9.25 22.0002 12C22.0002 14.75 21.0002 17.1 19.0502 19.05C17.1002 21 14.7502 22 12.0002 22C9.25024 22 6.90024 21 4.95024 19.05C3.00024 17.1 2.00024 14.75 2.00024 12C2.00024 9.25 3.00024 6.9 4.95024 4.95C6.90024 3 9.25024 2 12.0002 2Z" fill="#888888"/>
                                        </svg>
                                    </span>
                                    <span  v-else-if="trxn.status == 'Delivered'">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.5662 19.152C10.3314 17.3545 6.92009 14.0408 5.00024 9.86003V9.85803L4.48124 8.71803C4.1382 7.96322 4.07425 7.11115 4.30079 6.3136C4.52732 5.51604 5.02964 4.82481 5.71824 4.36303L7.05124 3.46903C7.25887 3.32992 7.51108 3.2736 7.75817 3.31117C8.00527 3.34875 8.22933 3.47748 8.38623 3.67203L10.8162 6.68403C10.9008 6.78893 10.9633 6.90983 11 7.03949C11.0367 7.16914 11.0467 7.30487 11.0297 7.43853C11.0126 7.57218 10.9686 7.701 10.9005 7.81725C10.8324 7.93351 10.7415 8.03479 10.6332 8.11503L9.37624 9.04703C10.5578 11.4394 12.4946 13.3759 14.8872 14.557L15.8192 13.301C15.8995 13.1928 16.0008 13.1019 16.117 13.0337C16.2333 12.9656 16.3621 12.9217 16.4957 12.9046C16.6294 12.8875 16.7651 12.8976 16.8948 12.9343C17.0244 12.971 17.1453 13.0335 17.2502 13.118L20.2622 15.548C20.4568 15.7049 20.5855 15.929 20.6231 16.1761C20.6607 16.4232 20.6043 16.6754 20.4652 16.883L19.5772 18.207C19.1179 18.8917 18.4315 19.3923 17.6392 19.6204C16.8468 19.8485 15.9994 19.7896 15.2462 19.454L14.5662 19.151V19.152Z" fill="#888888"/>
                                            <path d="M13.7502 8.99997C13.7502 9.19889 13.8293 9.38965 13.9699 9.5303C14.1106 9.67096 14.3013 9.74997 14.5002 9.74997H18.3282C18.5272 9.74997 18.7179 9.67096 18.8586 9.5303C18.9992 9.38965 19.0782 9.19889 19.0782 8.99997C19.0782 8.80106 18.9992 8.6103 18.8586 8.46965C18.7179 8.32899 18.5272 8.24997 18.3282 8.24997H16.3112L19.4702 5.09098C19.5418 5.02176 19.5989 4.93897 19.6382 4.84745C19.6775 4.75593 19.6981 4.6575 19.6989 4.55792C19.6997 4.45833 19.6807 4.35958 19.643 4.26743C19.6052 4.17528 19.5495 4.09156 19.479 4.02118C19.4086 3.95079 19.3248 3.89514 19.2326 3.85747C19.1404 3.81981 19.0417 3.80088 18.9421 3.80179C18.8425 3.8027 18.7441 3.82344 18.6526 3.86279C18.5611 3.90214 18.4784 3.95931 18.4092 4.03098L15.2502 7.18798V5.17197C15.2502 4.97306 15.1712 4.7823 15.0306 4.64164C14.8899 4.50099 14.6992 4.42197 14.5002 4.42197C14.3013 4.42197 14.1106 4.50099 13.9699 4.64164C13.8293 4.7823 13.7502 4.97306 13.7502 5.17197V8.99997Z" fill="#888888"/>
                                        </svg>
                                    </span>
                                </div>
                                <div class="grid justify-start w-[40%]">
                                    <span class="font-poppins text-[14px] font-normal text-[#303841]"> {{trxn.order_no}}</span>
                                    
                                    <span class="text-[#7D8895] font-poppins font-nomal text-[10px]"> {{ $format_date(trxn.created_at) }} </span>
                                </div>
                                <div class="flex items-center justify-end w-[40%]">
                                    <span class="text-[#FF0000] font-poppins text-[14px] font-bold" v-if="trxn.status == 'pending'">Pending  </span>
                                    <span class="text-[#E87831] font-poppins text-[14px] font-bold" v-if="trxn.status == 'accepted'">Paired  </span>
                                    <span class="text-[#007ACC] font-poppins text-[14px] font-bold" v-if="trxn.status == 'Received'"> Route  </span>
                                    <span class="text-[#006854] font-poppins text-[14px] font-bold" v-if="trxn.status == 'Delivered'">Delivered  </span>
                                </div>
                            </div>
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
         
        <DashboardFooter />
    </div>
   
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useNavigation } from "@/composables/useNavigation";
import { ref, onMounted } from "vue";
import DashboardFooter from '@/components/headers/DashboardFooter.vue';
import axiosinstance from '@/auth';
import { useAuthenticationStore } from '@/stores/authentication';
// import { Icon } from "@iconify/vue";

const { navigateTo } = useNavigation();
const router = useRouter();
const authStore = useAuthenticationStore();

const activeTab = ref(0);
const items = ref([]);
// const items = ref([]);
const loading = ref(false);
const page = ref(1);
const totalPages = ref(1);
const selectedItem = ref(null);

const itemCategory = ref('');
const itemStatus = ref('');
const itemDate = ref('');
const isConfirmPin =ref(false);


const fetchItems = async () => {
    if (loading.value || page.value > totalPages.value) return;
    loading.value = true;
    try {
        const response = await axiosinstance.get(`/open-dispatch/order/list/${page.value}`);
       
        items.value.push(...response.data.trxn.data); // Append new data
        totalPages.value = response.data.trxn.last_page;
        page.value++;

    } catch (error) {
        console.error("Error fetching items:", error);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchItems);
</script>
  
<style scoped>
.pill-tabs {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #ddd;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.pill-tab {
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  width:100%;
  cursor: pointer;
  background-color: #fff;
  color: #333;
  transition: background-color 0.3s;
}

.pill-tab:hover {
  background-color: #ddd;
}

.pill-tab.active {
  background-color: #F6E4E4;
  color: #000;
}

.pill-content {
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
}
.pepsa-card{
   background-image: url('../../../assets/images/pepsa_card.png')
}
</style>