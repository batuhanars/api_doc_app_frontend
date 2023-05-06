<template>
    <nav class="navbar navbar-default navbar-fixed-top" style="display: flex; align-items: center">
        <div class="brand">
            <a href="index"><img style="width: 170px; height: 55px" :src="projectStore.project.logo"
                    :alt="projectStore.project.title" class="img-responsive logo" /></a>
        </div>
        <RouterLink :to="{ name: 'Apps', params: { project: $route.params.project } }" exact-active-class="active"
            style="padding: 0 30px; color: #fff"><i class="lnr lnr-arrow-left" style="margin-right: 5px"></i>
            <span>Geri Dön</span>
        </RouterLink>
    </nav>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProjectStore } from "../store/project";

const route = useRoute();

const projectStore = useProjectStore();

onMounted(() => {
    projectStore.getProject(route.params.project);
});
</script>
