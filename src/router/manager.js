

const manager=[
    {
        path: '/fastopen',
        name: 'FastOpen',
        component: () => import('../views/Manager/FileView/FastOpen')
    }
    ,
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]


manager.forEach(item=>item.path='/manager'+item.path)

export default manager