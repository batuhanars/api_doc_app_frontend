import { defineStore } from 'pinia'
import apiClient from '../axios'

export const useProjectStore = defineStore('project', {
    state: () => {
        return {
            projects: {},
            project: {},
            storeValidation: {
                logo: '',
                title: '',
            },
            updateValidation: {
                logo: '',
                title: '',
            },
        }
    },
    actions: {
        async getProjects() {
            await apiClient.get('/projects').then((res) => {
                this.projects = res.data.projects
            })
        },
        async getProject(slug) {
            return await apiClient.get(`/projects/${slug}`).then((res) => {
                this.project = res.data.project
                return res.data.project
            })
        },
        async storeProject({ logo, title }) {
            return await apiClient
                .post(
                    '/projects',
                    {
                        logo: logo,
                        title: title,
                    },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )
                .then((res) => {
                    this.getProjects()
                    this.project = res.data.project
                    return res.data
                })
                .catch((err) => {
                    this.storeValidation.logo = err.response.data.errors.logo[0]
                    this.storeValidation.title =
                        err.response.data.errors.title[0]
                })
        },
        async updateProject({ logo, title, slug }) {
            let fd = new FormData()
            fd.append('logo', logo)
            fd.append('title', title)
            fd.append('_method', 'PUT')
            return await apiClient
                .post(`/projects/${slug}/`, fd)
                .then((res) => {
                    this.getProjects()
                    this.project = res.data.project
                    return res.data
                })
                .catch((err) => {
                    this.updateValidation.title =
                        err.response.data.errors.title[0]
                    this.updateValidation.logo =
                        err.response.data.errors.logo[0] || ''
                })
        },
        async deleteProject(slug) {
            return await apiClient.delete(`/projects/${slug}`).then((res) => {
                this.getProjects()
                return res.data
            })
        },
    },
})
