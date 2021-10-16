import { createRouter, createWebHashHistory } from 'vue-router'
import manager from "./manager";
// import FastOpen from "../views/FileView/FastOpen";
let routes = [
  {path: '/', redirect: '/manager/fastopen'},
  // manager[1],
  // {
  //   path: '/',
  //   name: 'Index',
  //   component: () => import('../views/Manager/Index'),
  //   children:[
  //     {
  //       path: 'fastopen',
  //       component: () => import('../views/Manager/FileView/FastOpen')
  //     },
  //     {
  //       path: 'about',
  //       component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //     }
  //   ]
  // },

  // {
  //       path: '/fastopen',
  //       name: 'FastOpen',
  //       component: () => import('../views/Manager/FileView/FastOpen')
  //     }
  //   // ,
    {
        path: '/Dialog',
        name: 'Dialog',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Dialog/InfoDialog')
    },
    {
        path: '/SuspensionBar',
        name: 'SuspensionBar',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Applet/SuspensionBar')
    }
]
routes=routes.concat(manager)

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
