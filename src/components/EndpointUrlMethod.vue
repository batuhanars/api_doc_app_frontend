<template>
    <h4 class="page-title" style="display: flex; align-items: center">
        <div v-if="editEndpoint.status">
            <span style="margin-right: 7px" class="label label-default">{{
                endpoint.url
            }}</span>
            <span class="label" :class="{
                        'label-success': endpoint.method == 'GET',
                        'label-primary': endpoint.method == 'POST',
                        'label-info': endpoint.method == 'PUT',
                        'label-danger': endpoint.method == 'DELETE',
                    }">{{ endpoint.method }}</span>
        </div>
        <div v-else class="row">
            <div class="col-md-8" style="padding-right: 0">
                <input type="text" class="form-control" v-model="editEndpoint.url" />
            </div>
            <div class="col-md-4">
                <select class="form-control" v-model="editEndpoint.method">
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
            </div>
        </div>
        <a href="#" style="font-size: 16px; margin-left: 15px" v-if="editEndpoint.status"
            @click="editableEndpoint(endpoint)">
            <i class="fas fa-pen"></i>
        </a>
        <div style="display: flex" v-else>
            <a href="#" @click.prevent="updateEndpoint">
                <i class="fas fa-check text-success" style="font-size: 16px; margin-left: 15px"></i>
            </a>
            <a href="#" @click.prevent="editEndpoint.status = true">
                <i class="fas fa-times text-danger" style="font-size: 16px; margin-left: 15px"></i>
            </a>
        </div>
    </h4>
</template>

<script setup>
import { reactive } from "vue";

const props = defineProps({
    endpoint: Object,
});
const emits = defineEmits(["emitMethodUrl"]);

const editEndpoint = reactive({
    url: "",
    method: "",
    status: true,
});

const editableEndpoint = (endpoint) => {
    editEndpoint.url = endpoint.url;
    editEndpoint.method = endpoint.method;
    editEndpoint.status = false;
};

const updateEndpoint = () => {
    emits("emitMethodUrl", editEndpoint);
    editEndpoint.status = true;
};
</script>
