<template>
    <div class="w-full fixed left-0 right-0 top-0 px-4 mx-auto py-4 bg-white z-10 overflow-y-scroll h-full mb-100">
       <div class="grid mx-auto px-4">
            <div class="flex w-full mt-[20px]">
               <div @click="$emit('handleAuthClose')" class="w-[10%]">X</div>
            </div> 
        </div>
    
        <form @submit.prevent="handleUserLoginData">
            <div class="flex w-full mb-3">
                <div class="form-group border border-neutral-400 rounded-[5px] mx-1 px-2 w-[48%]">
                    <label for="onibara_irense" class="  font-poppins text-[14px] font-medium leading-[35px]">Email / Phone no.</label>
                    <input type="text" class="form-control w-full px-3 py-1.5 font-poppins text-[12px] bg-white bg-clip-padding border-none rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" v-model="login_email" aria-describedby="emailHelp" placeholder="example@example.com or 08057000000"  >
                </div>
                <div class="form-group border border-neutral-400 rounded-[5px] mx-1 px-2 w-[48%]">
                    <label for="onibara_kokoro" class="font-poppins text-[14px] font-medium leading-[35px]">Password</label>
                    <div class="flex w-full">
                        <input v-if="LoginshowPassword" type="text" class="form-control   w-[95%] px-3 py-1.5 font-poppins text-[12px] bg-white bg-clip-padding border-none rounded transition
                        ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" v-model="login_password"
                        placeholder="***********" required>
                        <input v-else type="password" class="form-control   w-[95%] px-3 py-1.5 font-poppins text-[12px] bg-white bg-clip-padding border-none rounded transition
                        ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" v-model="login_password"
                        placeholder="***********" required>
                        <button class="button w-[5%]" @click="logintoggleShow" type="button">
                            <span class="icon is-small is-right">
                            <i class="fas" :class="{ 'fa-eye-slash': LoginshowPassword, 'fa-eye': !LoginshowPassword }"></i>
                            </span>
                        </button>
                    </div>
                    <!-- <div class="text-[9px] text-wine" v-if="errors.password">{{ errors.password }}</div> -->
                </div>
            </div>
            <button type="submit" class="
                w-full
                px-6
                py-2.5
                bg-wine
                text-white
                font-medium
                text-xl
                leading-tight
                capitalize
                rounded-[10px]
                shadow-md
                hover:bg-l-wine hover:shadow-lg
                focus:bg-l-wine focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-l-wine active:shadow-lg
                transition
                duration-150
                ease-in-out" style="background-color:#9D0208" id="authenticate_Login_process" :disabled="loginprocessing" > {{ loginprocessing ? "Please wait" : "Login" }}
            </button>
        </form>
   </div>
</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { ref, computed } from 'vue';
    import axiosinstance from '../../auth'
    import Swal from "sweetalert2";
    import {  SenderDetailKey } from "@/config.js";
import { useSessionEncryption } from '@/composables/useSessionEncryption';
import { useAuthenticationStore } from '@/stores/authentication';

const authStore = useAuthenticationStore();
const { saveToSession, getFromSession } = useSessionEncryption();

    const emit = defineEmits(['handleAuthClose']);
    const router = useRouter();
    const route = useRoute()
 
    /////////////////LOGIN /////////
    const login_email = ref('');
    const login_password = ref('');
    const LoginshowPassword = ref(false);
    const loginprocessing = ref(false);
    const logintoggleShow = () => {
        LoginshowPassword.value = !LoginshowPassword.value;
    };
    const handleUserLoginData = async () => {
         const slug = route.params.slug
        loginprocessing.value = true
        try {
             const res = await authStore.login({id:slug, email: login_email.value, password: login_password.value});
            window.location.reload();    
    
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Not Logged in",
                text: error.response.data.message,
                showConfirmButton: true,
                timer: 3500
            });
            console.error('Login failed', error);
        }
        loginprocessing.value = false
    };
</script>