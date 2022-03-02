const singleView=[
    {
        path: '/singleNote',
        name: 'SingleNote',
        component: () => import(/* webpackChunkName: "about" */ '../views/Manager/NoteView/SingleNote')
    },

]

export default singleView
