import {createRouter, createWebHistory} from 'vue-router'
import { useAuthenticationStore } from '@/stores/authentication';
import { AuthenticationKey } from '@/config.js'
import { useEncryption } from '@/composables/useEncryption';
const { getFromLocalStorage } = useEncryption();

import opendispatch from './opendispatch'
// import auth from './auths'
import welcome from './welcome'


const routes = [
    ...opendispatch ,
    // ...dashboard ,
    // ...auth ,
    ...welcome ,
    
]

 const router = createRouter({
    history: createWebHistory(),
    routes, 
});
router.beforeEach((to, from, next) => {
    // console.log(to);
    document.title = to.meta.title;
    next();
});
router.afterEach((to, from, failure) => {
  if (failure) {
    console.log(to, from,failure)
    // sendToAnalytics(to, from, failure)
  }
})
 
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title;
  const authStore = useAuthenticationStore();
  const token = getFromLocalStorage(AuthenticationKey);
  console.log(token);
    if (to.meta.requiresAuth) {
    // If user not in store but token exists, try restoring
    if (!authStore.user && token) {
      await authStore.getUser();
    }

    // If still no user or no token → force login
    if (!token || !authStore.user) {
      return next('/login');
    }

    
  }

  // otherwise allow navigation
  next();
});


export default router;
