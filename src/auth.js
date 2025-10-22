import axios from 'axios'
import router from "./router";
import { AuthenticationKey } from '@/config.js'
import { useEncryption } from '@/composables/useEncryption';
const { getFromLocalStorage, removeFromLocalStorage } = useEncryption();

const instance = axios.create();
instance.defaults.baseURL = import.meta.env.VITE_BASE_URL;
instance.defaults.headers.common['Authorization'] = 'Bearer ' + getFromLocalStorage(AuthenticationKey);
 
 
instance.interceptors.response.use(
  (response) => response,
    (error) => {
      if (error.response) {
        if (error.response.status === 401 || error.response.data.message === "Unauthenticated") {
          removeFromLocalStorage(AuthenticationKey); // Clear stored token
          // router.push('/login'); // Redirect to login page
        }
      }
      if (error.code === "ERR_NETWORK") {
          // Retry the request after a delay
          console.error('Connection refused error:', error);
          // return new Promise(resolve => setTimeout(() => resolve(axiosInstance(error.config)), 1000));
      }
      else if (error.code === 'ECONNREFUSED') {
          // Handle connection refused error here
          console.error('Connection refused error:', error);
        router.push('welcome');
          // return new Promise(resolve => setTimeout(() => resolve(axiosInstance(error.config)), 1000));
          // You can redirect to an error page or show a specific message to the user
      }
      else if (error.code === 'ENOTFOUND') {
          // Handle connection refused error here
          console.error('Connection refused error:', error);
          // return new Promise(resolve => setTimeout(() => resolve(axiosInstance(error.config)), 1000));
          // You can redirect to an error page or show a specific message to the user
      }
      else if (error.code === 'ERR_TIMED_OUT') {
          // Handle connection refused error here
          console.error('Connection refused error:', error);
          // return new Promise(resolve => setTimeout(() => resolve(axiosInstance(error.config)), 1000));
          // You can redirect to an error page or show a specific message to the user
      }else if (error.response.data.message === "Unauthenticated") {
        // Retry the request after a delay
        removeFromLocalStorage(AuthenticationKey);
        // router.go('/');
      }
      else if (error.response.status === 400) {
        console.error('Wrong Detail:', error);
        // return error.response.data.message;
        // return new Promise(resolve => setTimeout(() => resolve(error.response.data.message), 1000));
      }
      
      return Promise.reject(error);
    }
    
 
);


instance.interceptors.request.use((config) => {
  return config;
});


// const onOnline = () => {
//   // Retry any failed requests when the device goes online
//   instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       const originalRequest = error.config;

//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         return instance(originalRequest);
//       }

//       return Promise.reject(error);
//     }
//   );
// };
  
// const onOffline = () => {
//   // Handle offline status if needed
  
// };
  
  
//   // Listen for online/offline events globally
//   window.addEventListener('online', onOnline);
//   window.addEventListener('offline', onOffline);
  




  export default instance;