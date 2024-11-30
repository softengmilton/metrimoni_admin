import { createRouter, createWebHistory } from 'vue-router'
import Storage from "@core/bits/Storage"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
          meta: {
            title: 'Dashboard',
            auth: true,
          },
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'all-customer',
          name: 'allCustomer',
          component: () => import('../pages/Customer/Customer/Index.vue'),
          meta: {
            title: 'All Customers', // Adjusted to reflect plural form
            auth: true,
          },
        },
        {
          path: 'bride',
          name: 'bride',
          component: () => import('../pages/Customer/Bride/Index.vue'),
          meta: {
            title: 'Bride', // Adjusted to reflect correct title for Bride page
            auth: true,
          },
        },
        {
          path: 'groom',
          name: 'groom',
          component: () => import('../pages/Customer/Groom/Index.vue'),
          meta: {
            title: 'Groom', // Adjusted to reflect correct title for Groom page
            auth: true,
          },
        },




        // {
        //   path: 'acl',
        //   children: [
        //     {
        //       path: 'roles',
        //       name: 'roles',
        //       component: () => import('@/pages/Acl/Group/index.vue'),
        //       meta: {
        //         title: 'Roles',
        //         auth: true,
        //       },
        //     },
        //     {
        //       path: 'permissions',
        //       name: 'permissions',
        //       component: () => import('@/pages/Acl/Permission/index.vue'),
        //       meta: {
        //         title: 'Permissions',
        //         auth: true,
        //       },
        //     },
        //     {
        //       path: 'users',
        //       name: 'users',
        //       component: () => import('@/pages/Acl/User/index.vue'),
        //       meta: {
        //         title: 'Users',
        //         auth: true,
        //       },
        //     },
        //   ],
        // },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/pages/Auth/Login.vue'),
          meta: {
            title: 'Login',
            guest: true,
          },
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/pages/Auth/Register.vue'),
          meta: {
            title: 'Register',
            guest: true,
          },
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

export default router

const DEFAULT_TITLE = import.meta.env.VITE_APP_TITLE

router.beforeEach(to => {
  document.title = to.meta.title ? `${to.meta.title} || ${DEFAULT_TITLE}` : DEFAULT_TITLE
})

/**
 * This is a guard to check if the route requires authentication
 */
router.beforeEach((to, from, next) => {
  const loggedIn = Storage.get('user')

  if (to.matched.some(record => record.meta.auth) && !loggedIn) {
    next('/login')
    
    return
  }
  next()
})

/**
 * This is a guard to check if the route requires guest
 */
router.beforeEach((to, from, next) => {
  const loggedIn = Storage.get('user')

  if (to.matched.some(record => record.meta.guest) && loggedIn) {
    next('/dashboard')

    return
  }
  next()
})
