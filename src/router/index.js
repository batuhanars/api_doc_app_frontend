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
        name: 'Apps',
        component: () => import('../views/Apps.vue'),
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
                    {
                        path: ':module/:subModule?',
                        name: 'Module',
                        component: () => import('../views/Module.vue'),
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
