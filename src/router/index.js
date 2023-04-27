import { createRouter, createWebHistory } from 'vue-router'
import Project from '../views/Projects.vue'
import Main from '../layouts/Main.vue'

const routes = [
    {
        path: '/',
        name: 'Projects',
        component: Project,
    },
    {
        path: '/:project',
        name: 'Layout',
        component: Main,
        children: [
            {
                path: ':app',
                children: [
                    {
                        path: '',
                        name: 'Panel',
                        component: () => import('../views/Panel.vue'),
                    },
                ],
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
