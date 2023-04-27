import { createRouter, createWebHistory } from 'vue-router'
import Project from '../views/Projects.vue'

const routes = [
    {
        path: '/',
        name: 'Projects',
        component: Project,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
