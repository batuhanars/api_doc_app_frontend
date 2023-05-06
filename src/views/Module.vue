<template>
  <div class="container-fluid">
    <EndpointTitle :endpoint="endpoint" @emit-title="updateEndpointTitle" />
    <EndpointUrlMethod :endpoint="endpoint" @emit-method-url="updateEndpoint" />
    <div class="row">
      <ParameterTable />
      <EndpointContent :endpoint="endpoint" @emit-content="updateEndpointContent" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useModuleStore } from "../store/module";
import { useRoute } from "vue-router";
import EndpointTitle from "../components/EndpointTitle.vue";
import EndpointUrlMethod from "../components/EndpointUrlMethod.vue";
import EndpointContent from "../components/EndpointContent.vue";
import ParameterTable from "../components/ParameterTable.vue";
import { useToast } from "vue-toast-notification";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";

const moduleStore = useModuleStore();
const route = useRoute();
const toast = useToast();
const { endpoint } = storeToRefs(moduleStore);

watch(
  () => route.params,
  (value) => {
    if (value.subModule) {
      moduleStore.getModule(value.subModule).then((data) => {
        useTitle(data.title);
      });
    } else {
      moduleStore.getModule(value.module).then((data) => {
        useTitle(data.title);
      });
    }
  }
);

onMounted(() => {
  if (route.params.subModule) {
    moduleStore.getModule(route.params.subModule).then((data) => {
      useTitle(data.title);
    });
  } else {
    moduleStore.getModule(route.params.module).then((data) => {
      useTitle(data.title);
    });
  }
});

const updateEndpoint = (editEndpoint) => {
  if (route.params.subModule) {
    moduleStore
      .updateEndpoint(
        { url: editEndpoint.url, method: editEndpoint.method },
        route.params.subModule,
        route.params.app
      )
      .then((data) => {
        toast.success(data.success);
      });
  } else {
    moduleStore
      .updateEndpoint(
        { url: editEndpoint.url, method: editEndpoint.method },
        route.params.module
      )
      .then((data) => {
        toast.success(data.success);
      });
  }
};

const updateEndpointTitle = (title) => {
  if (route.params.subModule) {
    moduleStore.updateEndpointTitle(title, route.params.subModule).then((data) => {
      toast.success(data.success);
    });
  } else {
    moduleStore.updateEndpointTitle(title, route.params.module).then((data) => {
      toast.success(data.success);
    });
  }
};

const updateEndpointContent = (result_content) => {
  if (route.params.subModule) {
    moduleStore
      .updateEndpointContent(result_content, route.params.subModule)
      .then((data) => {
        toast.success(data.success);
      });
  } else {
    moduleStore
      .updateEndpointContent(result_content, route.params.module)
      .then((data) => {
        toast.success(data.success);
      });
  }
};
</script>
