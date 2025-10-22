<template>
    <div class="w-full fixed left-0 right-0 top-0 px-4 mx-auto py-4 bg-white z-10 overflow-y-scroll h-full mb-100">
       <div class="grid mx-auto px-4">
            <div class="flex w-full mt-[20px]">
               <div @click="$emit('handleAuthClose')" class="w-[10%]">X</div>
            </div> 
        </div>
        <div class="grid mx-auto px-4 my-3"> 
            <span class="font-bold text-[18px]">Create account</span> 
            <span class="text-[10px]">In order to see and review your order listings suply your details below.</span>
        </div>
        <form @submit.prevent="handleUserRegistration">
            <div class="flex w-full mb-3">
                <div class="form-group border border-gray-700 rounded-[5px] mx-1 px-2 w-[48%]">
                    <label for="onibara_irense" class="font-poppins text-[14px] font-medium leading-[35px]">First name</label>
                    <input type="text" class="form-control   w-[95%] px-3 py-1.5 font-poppins text-[12px] bg-white bg-clip-padding border-none rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" v-model="first_name" aria-describedby="emailHelp" placeholder="First name"  required>
                </div>    
                <div class="form-group border border-gray-700 rounded-[5px] mx-1 px-2 w-[48%]">
                    <label for="onibara_irense" class="font-poppins text-[14px] font-medium leading-[35px]">Last name</label>
                    <input type="text"  class="form-control   w-[95%] px-3 py-1.5 font-poppins text-[12px] bg-white bg-clip-padding border-none rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" v-model="last_name"
                        aria-describedby="emailHelp" placeholder="Last name"  required>
                </div>
            </div>
            <div class="flex w-full mb-3">
                <div class="form-group border border-gray-700 rounded-[5px] mx-1 px-2 w-[48%]"  :class="IsValid && 'not-valid'">
                    <label for="onibara_irense" class="font-poppins text-[14px] font-medium leading-[35px]">Phone number</label>
                    <input type="text"  class="form-control   w-[95%] px-3 py-1.5 font-poppins text-[12px] bg-white bg-clip-padding border-none rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"  v-model="phone_number"
                        aria-describedby="emailHelp" placeholder="Phone No: 0805700000000" inputmode="tel" @keyup="checkUserDetailsOnBloc()" required>
                    <div class="flex w-full" v-if="validatePhone">
                        <img src="../../assets/images/loader/ajax-loader-white.gif" alt="" class="w-[25px] px-3">
                        <span class="font-josefin text-[10px] text-[#000]">validating phone number</span>
                    </div>
                        <span class="font-josefin text-[10px] text-[#F00]" :class="IsActive && 'valid' ">{{ errorPhone }}</span>
                </div>
                <div class="form-group border border-gray-700 rounded-[5px] mx-1 px-2 w-[48%]">
                    <label for="onibara_irense" class="font-poppins text-[14px] font-medium leading-[35px]">Email</label>
                    <input type="email"  class="form-control   w-[95%] px-3 py-1.5 font-poppins text-[12px] bg-white bg-clip-padding border-none rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"  v-model="email"
                        aria-describedby="emailHelp" placeholder="Email: john@example.com"  >
                </div>
            </div>
            <div class="form-group mb-3 border border-gray-700 rounded-[5px] mx-1 px-2">
                <label for="onibara_kokoro" class="font-poppins text-[14px] font-medium leading-[35px]">Password</label>
                <div class="flex w-full">
                    <input v-if="showPassword" type="text" class="form-control   w-[95%] px-3 py-1.5 font-poppins text-[12px] bg-white bg-clip-padding border-none rounded transition
                    ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" v-model="password"
                    placeholder="***********" required>
                    <input v-else type="password" class="form-control   w-[95%] px-3 py-1.5 font-poppins text-[12px] bg-white bg-clip-padding border-none rounded transition
                    ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" v-model="password"
                    placeholder="***********" required>
                    <button class="button w-[5%]" @click="toggleShow" type="button">
                        <span class="icon is-small is-right">
                        <i class="fas" :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i>
                        </span>
                    </button>
                </div>
            </div>
            <button type="submit" class=" w-full px-6 py-2.5 bg-wine text-white font-medium text-xl leading-tight capitalize rounded-[10px] shadow-md active:bg-l-wine active:shadow-lg transition duration-150 ease-in-out" id="authenticate_Login_process" :disabled="processing" @click="login"> {{ processing ? "Please wait" : "Register" }}
            </button>
       </form>
        <div class="grid mx-auto px-4 my-3"> 
            <span class="font-bold text-[18px]">if you already have account ? Login account</span> 
             <span class="text-[10px]"></span>
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
    //////////REGISTER /////////
    const first_name = ref('');
    const last_name = ref('');
    const phone_number = ref('');
    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);

    const errorPhone = ref('');
    const validatePhone = ref(false);
    const processing = ref(false);
    const IsActive = ref(false);
    const IsValid = ref(false);

    const toggleShow = () => {
        showPassword.value = !showPassword.value;
    };
    

    const countDigit = (n) =>{
        let count = 0; 
        while (n != 0)  
        { 
            n = Math.floor(n / 10); 
            ++count; 
        } 
        return count; 
    }

    const checkUserDetailsOnBloc = async () => {
        const slug = route.params.slug
        IsActive.value = false
        errorPhone.value =''
        if(countDigit(phone_number.value) == 10){
            validatePhone.value = true
            const res = await axiosinstance.post('vendors/customer/check/phone',{
                phone:phone_number.value,
                id:slug,
            });
            if(res.data.NotRegistered){
                errorPhone.value = 'Approved'
                IsActive.value = true
                IsValid.value = false
                validatePhone.value = false
            }else{
            validatePhone.value = false
                IsValid.value = true
                errorPhone.value = 'Phone number already in use'
            }
        
        }else{
        IsValid.value = true
            errorPhone.value = 'Not complete'
            
        }
    }

    const handleUserRegistration = async () => {
        processing.value = true;
        const slug = route.params.slug
        try {
             const res = await authStore.register({fname:first_name.value, lname:last_name.value, email:email.value, phone:phone_number.value, password:password.value, id:slug });
  
            //  console.log(res); return;
            // const res = await axiosinstance.post('vendors/customer/register',{
            //     id:slug,
            //     fname:first_name.value,
            //     lname:last_name.value, 
            //     email:email.value, 
            //     phone:phone_number.value,
            //     password:password.value, 
            // });
             
            var fullname = first_name.value+" "+last_name.value;
            let lid = {
                'senderid':res.userid,
                'sendername':fullname,
                'senderphone':phone_number.value, 
                'senderemail':email.value,
            };
            saveToSession(SenderDetailKey, JSON.stringify(lid));
            Swal.fire({
                icon: "success",
                title: "Registration Successful",
                text: res.message,
                showConfirmButton: true,
                timer: 2500
            });
             setTimeout( () =>  {
           
                 router.push('/dispatch/'+slug+'/intrastate/order/payment'); //payyment
            }, 2500);
            processing.value = true;
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text: error,
                showConfirmButton: true,
                timer: 3500
            });
            console.error('Registration failed', error);
        }
        processing.value = false
    };

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
           
            let lid = {
                'senderid':res.userid.id,
                'sendername':res.userid.fname+" "+res.userid.lname,
                'senderphone':res.userid.phone, 
                'senderemail':res.userid.email,
            };
            saveToSession(SenderDetailKey, JSON.stringify(lid));
       
            setTimeout( () =>  {
                 router.push('/vendor/'+route.params.slug+'/interstate/confirm/orders'); //payyment
            }, 3500);
    
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