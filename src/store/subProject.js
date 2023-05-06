import { defineStore } from 'pinia'
import apiClient from '../axios'

export const useSubProjectStore = defineStore('sub-project', {
    state: () => {
        return {
            subProjects: {},
            subProject: {},
            storeValidation: '',
            updateValidation: '',
        }
    },
    actions: {
        async getSubProjects(project) {
            await apiClient.get(`${project}/sub-projects`).then((res) => {
                this.subProjects = res.data.subProjects
            })
        },
        async getSubProject(slug) {
            return await apiClient.get(`/sub-projects/${slug}`).then((res) => {
                this.subProject = res.data.subProject
                return res.data.subProject
            })
        },
        async storeSubProject(title, project) {
            return await apiClient
                .post(`${project}/sub-projects`, {
                    title: title,
                })
                .then((res) => {
                    this.getSubProjects(project)
                    this.subProject = res.data.subProject
                    return res.data
                })
                .catch((err) => {
                    this.storeValidation = err.response.data.errors.title[0]
                })
        },
        async updateSubProject(title, subProject, project) {
            let fd = new FormData()
            fd.append('title', title)
            fd.append('_method', 'PUT')
            return await apiClient
                .post(`/sub-projects/${subProject}`, fd)
                .then((res) => {
                    this.getSubProjects(project)
                    this.subProject = res.data.subProject
                    return res.data
                })
                .catch((err) => {
                    this.updateValidation = err.response.data.errors.title[0]
                })
        },
        async deleteSubProject(project, subProject) {
            return await apiClient
                .delete(`/sub-projects/${subProject}`)
                .then((res) => {
                    this.getSubProjects(project)
                    return res.data
                })
        },
    },
})
