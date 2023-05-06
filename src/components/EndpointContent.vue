<template>
    <div class="col-md-7">
        <!-- TABLE HOVER -->
        <div class="panel">
            <div class="panel-heading">
                <h3 class="panel-title">Response</h3>
            </div>
            <div class="panel-body">
                <Codemirror v-model="endpoint.result_content" :extensions="extensions" />
            </div>
            <div class="panel-footer" style="display: flex; justify-content: end">
                <button type="button" class="btn btn-pirmary" @click="$emit('emitContent', endpoint.result_content)">
                    Kaydet
                </button>
            </div>
        </div>
        <!-- END TABLE HOVER -->
    </div>
</template>

<script setup>
import { json } from "@codemirror/lang-json";
import { Codemirror } from "vue-codemirror";

const props = defineProps({
    endpoint: Object,
});

const extensions = [json()];
</script>
