export default [
     

    {
        path: '/:slug',
        name: 'WelcomePage',
        meta: { title: 'Open Dispatch - Send within your states || Pepsa.co' },
        component: () => import('../views/WelcomePage.vue')
    },

    { 
        path: '/404', 
        name: 'NotFound', 
        meta: { title: 'Open Dispatch - Send within your states || Pepsa.co' },
        component: () => import('../views/NotFound.vue')
    },
  
    { 
        path: '/:catchAll(.*)', 
        redirect: '/404' 
    }, 
]