export default [
    {
        path: '/vendor/:slug/send/item',
        name: 'DispatchSendOrder',
        meta: { title: 'Open Dispatch - Send within your states || Pepsa.co' },
        component: () => import('../views/DispatchSendOrder.vue')
    },

    ////////inter state url ////////
    {
        path: '/vendor/:slug/dispatch/:packagetype',
        name: 'DispatchInterStateOrder',
        meta: { 
            title: 'Open Dispatch - Send items from your state to another || Pepsa.co' 
        },
        component: () => import('../views/interstate/DispatchInterStateOrder.vue')
    },

    {
        path: '/vendor/:slug/interstate/confirm/orders',
        name: 'DispatchInterstateProcess',
        meta: { 
            title: 'Open Dispatch - Send items from your state to another || Pepsa.co' 
        },
        component: () => import('../views/interstate/DispatchInterstateProcess.vue')
    },

    {
        path: '/vendor/:slug/interstate/order/:orderno',
        name: 'DispatchInterstateOrderDetails',
        meta: {title: 'Open Dispatch - Track your order || Pepsa' },
        component:  () => import('../views/dashboard/DispatchInterstateOrderDetails.vue')
    },

    //////intrastate ////////////
    {
        path: '/vendor/:slug/intrastate/send/order',
        name: 'OpenDispatchPage',
        meta: { 
            // requiresAuth: true, 
            title: 'Open Dispatch - Send within your city || Pepsa.co' 
        },
        component: () => import('../views/intrastate/OpenDispatchPage.vue')
    },

    {
        path: '/vendor/:slug/intrastate/schedule/order',
        name: 'OpenDispatchSchedule',
        meta: { 
            // requiresAuth: true, 
            title: 'Open Dispatch - Scheduled Items to Send || Pepsa.co' 
        },
        component: () => import('../views/intrastate/OpenDispatchSchedule.vue')
    },

    {
        path: '/vendor/:slug/intrastate/confirm/order',
        name: 'OpenDispatchConfirmPage',
        meta: {
            title: 'Open Dispatch - Confirm Order || Pepsa.co' 
        },
        component:  () => import('../views/intrastate/OpenDispatchConfirmPage.vue')
    },

    {
        path: '/dispatch/:slug/intrastate/order/payment',
        name: 'OpenDispatchPaymentList',
        meta: {
            requiresAuth: true, 
            title: 'Open Dispatch - Confirm Order || Pepsa.co' 
        },
        component:  () => import('../views/intrastate/OpenDispatchPaymentList.vue')
    },

    {
        path: '/vendor/order/:slug/auth/:generatedcode',
        name: 'OpenDispatchOrderDetailMainPage',
        meta: {
            requiresAuth: true, 
            title: 'Open Dispatch - Confirm Order || Pepsa.co' 
        },
        component:  () => import('../views/dashboard/OpenDispatchOrderDetailMainPage.vue')
    },

]