<template>
    <div style="
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
    ">
        <div style="display: flex; align-items: center">
            <h3 class="page-title" style="margin: 0" v-if="editableTitle">
                {{ endpoint.title }}
            </h3>
            <input type="text" class="form-control" v-model="title" v-else />
            <a href="#" @click.prevent="editTitle(endpoint)" v-if="editableTitle">
                <i class="fas fa-pen text-primary" style="font-size: 16px; margin-left: 15px"></i>
            </a>
            <div style="display: flex" v-else>
                <a href="#" @click.prevent="updateTitle">
                    <i class="fas fa-check text-success" style="font-size: 16px; margin-left: 15px"></i>
                </a>
                <a href="#" @click.prevent="editableTitle = true">
                    <i class="fas fa-times text-danger" style="font-size: 16px; margin-left: 15px"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    endpoint: Object,
});
const emits = defineEmits(["emitTitle"]);

const title = ref("");

const editableTitle = ref(true);

const editTitle = (endpoint) => {
    title.value = endpoint.title;
    editableTitle.value = false;
};

const updateTitle = () => {
    emits("emitTitle", title.value);
    editableTitle.value = true;
};
</script>
