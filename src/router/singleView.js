const singleView=[
    {
        path: '/singleNote',
        name: 'SingleNote',
        component: () => import(/* webpackChunkName: "about" */ '../views/Manager/NoteView/SingleNote')
    },
    {
        path: '/singleTask',
        name: 'SingleTask',
        component: () => import(/* webpackChunkName: "about" */ '../views/Manager/TaskView/SingleTask')
    },
]

export default singleView
