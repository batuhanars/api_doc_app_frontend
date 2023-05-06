import { defineStore } from 'pinia'
import apiClient from '../axios'

export const useParameterStore = defineStore('parameter', {
    state: () => {
        return {
            parameters: {},
            storeValidation: {
                title: '',
                description: '',
            },
            updateValidation: {
                title: '',
                description: '',
            },
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
                .catch((err) => {
                    this.storeValidation.title =
                        err.response.data.errors.title[0]
                    this.storeValidation.description =
                        err.response.data.errors.description[0]
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
            return await apiClient
                .post(`/parameters/${id}`, fd)
                .then((res) => {
                    this.getParameters(module)
                    return res.data
                })
                .catch((err) => {
                    this.updateValidation.title =
                        err.response.data.errors.title[0]
                    this.updateValidation.description =
                        err.response.data.errors.description[0]
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
