import { defineStore } from 'pinia'
import apiClient from '../axios'

export const useModuleStore = defineStore('module', {
    state: () => {
        return {
            modules: [],
            module: {},
            endpoint: {},
        }
    },
    actions: {
        async getModules(subProject) {
            await apiClient.get(`/${subProject}/modules`).then((res) => {
                this.modules = res.data.modules
            })
        },
        async getModule(slug) {
            return await apiClient.get(`/modules/${slug}`).then((res) => {
                this.module = res.data.module
                this.endpoint = res.data.endpoint
                return res.data.module
            })
        },
        async storeModule({ parent_id, icon, title }, subProject) {
            return await apiClient
                .post(`/${subProject}/modules`, {
                    parent_id: parent_id,
                    icon: icon,
                    title: title,
                    order: 1,
                })
                .then((res) => {
                    this.getModules(subProject)
                    return res.data
                })
        },
        async updateModule({ icon, title }, slug, subProject) {
            let fd = new FormData()
            fd.append('icon', icon)
            fd.append('title', title)
            fd.append('_method', 'PUT')
            return await apiClient.post(`/modules/${slug}/`, fd).then((res) => {
                this.getModules(subProject)
                this.module = res.data.module
                return res.data
            })
        },
        async moveModule(order, slug, subProject) {
            let fd = new FormData()
            fd.append('order', order)
            fd.append('_method', 'PUT')
            return await apiClient
                .post(`/modules/${slug}/move`, fd)
                .then((res) => {
                    this.getModules(subProject)
                    this.module = res.data.module
                    return res.data
                })
        },
        async updateEndpointTitle(title, slug) {
            let fd = new FormData()
            fd.append('title', title)
            fd.append('_method', 'PUT')
            return await apiClient
                .post(`/modules/${slug}/endpoint-update-title`, fd)
                .then((res) => {
                    this.getModule(slug)
                    this.endpoint = res.data.endpoint
                    return res.data
                })
        },
        async updateEndpoint({ url, method }, slug, subProject) {
            let fd = new FormData()
            fd.append('url', url)
            fd.append('method', method)
            fd.append('_method', 'PUT')
            return await apiClient
                .post(`/modules/${slug}/endpoint-update`, fd)
                .then((res) => {
                    this.getModules(subProject)
                    this.module = res.data.module
                    this.endpoint = res.data.endpoint
                    return res.data
                })
        },
        async updateEndpointContent(result_content, slug) {
            let fd = new FormData()
            fd.append('result_content', result_content)
            fd.append('_method', 'PUT')
            return await apiClient
                .post(`/modules/${slug}/endpoint-update-content`, fd)
                .then((res) => {
                    this.getModule(slug)
                    this.endpoint = res.data.endpoint
                    return res.data
                })
        },
        async deleteModule(slug, subProject) {
            return await apiClient.delete(`/modules/${slug}`).then((res) => {
                this.getModules(subProject)
                return res.data
            })
        },
    },
})
