<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
// import OfflineIndicator from "./components/OfflineIndicator.vue"

import axioss from './auth';
// import { useAuthenticationStore } from './stores/authentication';
// import { useDashboardDataStore } from './stores/dashboarddata';

// const authStore = useAuthenticationStore();
// const dashboardStore = useDashboardDataStore();
const isLoading = ref(true);



  onMounted(async () => {
    // if (!authStore.user) {
    //     const res = await authStore.getUser();   
    // }
    // if(authStore.user){
    //   await dashboardStore.getDashboard()
    // }
   
    isLoading.value = false;
});

</script>

<template>
  <div class="h-screen w-screen" id="main_page_dhdfnhg3453">
    <div v-if="isLoading"  class="page-loader">
      <!-- <img src="./assets/images/loader/pepsagif.png" alt="" class="animate__heartBeat animate__infinite animate__animated"> -->
    </div>
    <div v-else class="wrapper mmb:max-h-[1884px] smb:max-h-[1701px] relative h-full overflow-y-scroll bg-white">
      <!-- <Notification /> -->
      <RouterView></RouterView>
      <!-- <OfflineIndicator /> -->
    </div>
  </div>
 
</template>

<style scoped>
 
</style>
