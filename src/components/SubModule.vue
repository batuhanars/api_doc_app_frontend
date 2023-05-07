<template>
  <li style="display: flex; align-items: center">
    <RouterLink :to="{ name: 'Module', params: { module: module.slug, subModule: subModule.slug } }" class="">
      <div v-if="$route.params.subModule != subModule.slug">
        {{ subModule.title }} &nbsp;
        <span class="label" :class="{
          'label-primary': subModule.endpoint.method == 'POST',
          'label-success': subModule.endpoint.method == 'GET',
          'label-info': subModule.endpoint.method == 'PUT',
          'label-danger': subModule.endpoint.method == 'DELETE',
        }">{{ subModule.endpoint.method }}</span>
      </div>
      <div v-else>
        <div v-if="editableSubModule">
          {{ subModule.title }} &nbsp;
          <span class="label" :class="{
            'label-primary': subModule.endpoint.method == 'POST',
            'label-success': subModule.endpoint.method == 'GET',
            'label-info': subModule.endpoint.method == 'PUT',
            'label-danger': subModule.endpoint.method == 'DELETE',
          }">{{ subModule.endpoint.method }}</span>
        </div>
        <div style="display: flex" v-else>
          <div style="display: flex">
            <input type="text" class="edit-submodule-input" v-model="subModule.title" />
          </div>
          <div style="padding: 0 5px; display: flex; margin-left: 5px" v-if="$route.params.subModule == subModule.slug">
            <a href="#" class="edit-module-button" @click.prevent="editSubModule(subModule)">
              <i class="fas fa-check" style="font-size: 12px"></i>
            </a>
            <a href="#" class="delete-module-button" @click.prevent="editableSubModule = true">
              <i class="fas fa-times text-danger" style="font-size: 12px"></i>
            </a>
          </div>
        </div>
      </div>
    </RouterLink>

    <div style="position: absolute; right: 0" v-if="$route.params.subModule == subModule.slug" v-show="editableSubModule">
      <a href="#" @click.prevent="toggleEditableSubModule">
        <i class="fas fa-pen" style="font-size: 12px"></i>
      </a>
      <a href="#" @click.prevent="$emit('deleteSubmodule', subModule)">
        <i class="fas fa-trash text-danger" style="font-size: 12px"></i>
      </a>
    </div>
  </li>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useModuleStore } from "../store/module";

const props = defineProps({
  module: Object,
  subModule: Object,
});
const emits = defineEmits(["emitSubModule"]);

const storeModule = useModuleStore();

const {
  showModuleInput,
  showSubModuleInput,
  editableModule,
  editableSubModule,
} = storeToRefs(storeModule);

const toggleEditableSubModule = () => {
  showModuleInput.value = false;
  editableSubModule.value = false;
  editableModule.value = true;
  showSubModuleInput.value = false;
};

const editSubModule = (subModule) => {
  emits("emitSubmodule", subModule);
  editableSubModule.value = true;
};
</script>
