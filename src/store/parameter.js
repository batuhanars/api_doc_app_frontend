import { defineStore } from 'pinia'
import apiClient from '../axios'

export const useParameterStore = defineStore('parameter', {
    state: () => {
        return {
            parameters: {},
        }
    },
    actions: {
        async getParameters(module) {
            await apiClient.get(`${module}/parameters`).then((res) => {
                this.parameters = res.data.parameters
            })
        },
        async storeParameter({ title, type, status, description }, module) {
            return await apiClient
                .post(`${module}/parameters`, {
                    title: title,
                    type: type,
                    status: status,
                    description: description,
                })
                .then((res) => {
                    this.getParameters(module)
                    return res.data
                })
        },
        async updateParameter(
            { id, title, type, status, description },
            module
        ) {
            let fd = new FormData()
            fd.append('title', title)
            fd.append('type', type)
            fd.append('status', status)
            fd.append('description', description)
            fd.append('_method', 'PUT')
            return await apiClient.post(`/parameters/${id}`, fd).then((res) => {
                this.getParameters(module)
                return res.data
            })
        },
        async deleteParameter(id, module) {
            return await apiClient.delete(`/parameters/${id}`).then((res) => {
                this.getParameters(module)
                return res.data
            })
        },
    },
})
