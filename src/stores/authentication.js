import { defineStore } from 'pinia';
import axiosinstance from '../auth'
import { useEncryption } from '@/composables/useEncryption';
import {  AuthenticationKey } from "@/config.js";
const { saveToLocalStorage } = useEncryption();

export const useAuthenticationStore = defineStore('authentication', {

    state: () => ({
        user: null,
        vMesssage:'',
        uid:'',email:'',password:'',
        phone:'', lname:'',fname:''
    }),

    actions: {
        
        async getUser() {
            try {
                const { data } = await axiosinstance.get('/customer');
                console.log(data)
                this.user = data;
                
            } catch (error) {
                console.error(error)
                this.user = null;
            }
        },
        async login(credentials) {
            // console.log(credentials.email); return
            try {
                const response = await axiosinstance.post("/vendors/customer/login", credentials);

                // console.log("API Response:", response.data.customer); //
               
                this.user = response.data.customer;
                saveToLocalStorage(AuthenticationKey, response.data.token);
                return { success: true, message: "Login successful.", userid:response.data.customer };
            } catch (error) {
                  console.error("Login error:", error.response.data);
                return { success: false, message: error.response.data.message };
            }
        },

        async register(credentials) {
            try {
                const response = await axiosinstance.post("/vendors/customer/register", credentials);
                this.email = credentials.phone
                this.fname = credentials.first_name,
                this.lname = credentials.last_name, 
                this.email = credentials.email, 
                this.phone = credentials.phone_number,
            //    console.log(response.data.userid)
                saveToLocalStorage(AuthenticationKey, response.data.token);
                return { success: true, message: "Registration successful.",userid:response.data.userid };
            } catch (error) {
                return { success: false, message: error.response.data.message };
            }
        },

        async logout() {
            await axios.post('/api/logout');
            this.user = null;
        },

        async resendVerificationEmail() {
            try {
                await axiosinstance.post("/api/email/resend");
                alert("Verification email sent. Please check your inbox.");
            } catch (error) {
                console.error("Failed to send verification email:", error);
            }
        },
    },
});