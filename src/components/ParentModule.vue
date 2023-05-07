<template>
  <li>
    <RouterLink :to="{ name: 'Module', params: { module: module.slug } }" v-if="module.is_dropdown == 0"
      style="display: flex" class="module" active-class="active">
      <div v-if="$route.params.module != module.slug">
        <i :class="module.icon"></i>
        <span>{{ module.title }}</span>
      </div>
      <div v-else>
        <div v-if="editableModule">
          <i :class="module.icon"></i>
          <span>{{ module.title }}</span>
        </div>
        <div style="display: flex" v-else>
          <div style="display: flex">
            <i class="fas fa-plus" style="color: #fff; cursor: pointer" data-toggle="modal" data-target="#editIcon"
              @click="$emit('editableIcon', module.icon)" v-if="previewEditIcon == ''"></i>
            <i style="color: white" :class="previewEditIcon || module.icon" v-else></i>
            <input type="text" class="edit-module-input" v-model="editModuleInput.title" />
          </div>
          <div style="background: #191919; padding: 0 5px; display: flex; margin-left: 5px" v-if="$route.params.module">
            <a href="#" class="edit-module-button" @click="editModule(module)">
              <i class="fas fa-check" style="font-size: 12px"></i>
            </a>
            <a href="#" class="delete-module-button" @click="closeEditableModule">
              <i class="fas fa-times text-danger" style="font-size: 12px"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="module-actions" v-if="$route.params.module == module.slug" v-show="editableModule">
        <a href="#" class="edit-module-button" @click="toggleEditableModule(module)">
          <i class="fas fa-pen" style="font-size: 12px"></i>
        </a>
        <a href="#" class="delete-module-button" @click.prevent="$emit('deleteModule', module)">
          <i class="fas fa-trash text-danger" style="font-size: 12px"></i>
        </a>
      </div>
    </RouterLink>
    <a :href="`#${module.slug}`" data-toggle="collapse" class="dropdown-module" :class="{
      collapsed: $route.params.module != module.slug,
      active: $route.params.module == module.slug,
    }" v-else style="display: flex; align-items: center">
      <div style="width: 100%" v-if="$route.params.module != module.slug">
        <i :class="module.icon"></i>
        <span>{{ module.title }}</span>
        <i class="icon-submenu lnr lnr-chevron-left"></i>
      </div>
      <div style="width: 100%" v-else>
        <div style="width: 100%" v-if="editableModule">
          <i :class="module.icon"></i>
          <span>{{ module.title }}</span>
          <i class="icon-submenu lnr lnr-chevron-left"></i>
        </div>
        <div style="display: flex" v-else>
          <div style="display: flex">
            <i class="fas fa-plus" style="color: #fff; cursor: pointer" data-toggle="modal" data-target="#editIcon"
              @click="$emit('editableIcon', module.icon)" v-if="previewEditIcon == ''"></i>
            <i style="color: white" :class="previewEditIcon || module.icon" v-else></i>
            <input type="text" class="edit-module-input" v-model="editModuleInput.title" />
          </div>
          <div style="background: #191919; padding: 0 5px; display: flex; margin-left: 5px">
            <a href="#" class="edit-module-button" @click="editModule(module)">
              <i class="fas fa-check" style="font-size: 12px"></i>
            </a>
            <a href="#" class="delete-module-button" @click="editableModule = true">
              <i class="fas fa-times text-danger" style="font-size: 12px"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="module-actions" v-if="$route.params.module == module.slug" v-show="editableModule">
        <a href="#" class="edit-module-button" @click="toggleEditableModule(module)">
          <i class="fas fa-pen" style="font-size: 12px"></i>
        </a>
        <a href="#" class="delete-module-button" @click.prevent="$emit('deleteModule', module)">
          <i class="fas fa-trash text-danger" style="font-size: 12px"></i>
        </a>
      </div>
    </a>
    <div :id="module.slug" class="collapse" :class="{ in: $route.params.module == module.slug }"
      v-show="module.is_dropdown == 1">
      <Draggable v-model="module.subModules" group="subModules" tag="ul" class="nav" item-key="id" @change="changeModule">
        <template #item="{ element }">
          <SubModule :module="module" :subModule="element" @emit-submodule="updateSubModule"
            @delete-submodule="deleteSubModule" />
        </template>
        <template #footer>
  <li style="padding: 10px 0 10px 60px; display: flex; align-items: center" v-show="showSubModuleInput">
    <input type="text" v-model="subModule.title" class="add-submodule-input" :class="{
      'error-input': validationSubModule == true,
    }" />
    <div>
      <i class="fas fa-check text-success" style="cursor: pointer; font-size: 12px" @click="addSubModule(module.id)"></i>
      <i class="fas fa-times text-danger" style="cursor: pointer; font-size: 12px" @click="closeSubModuleInput"></i>
    </div>
  </li>
  <li style="padding: 10px 0 10px 60px; display: flex">
    <button type="button" class="btn btn-sm rounded" @click="openSubModuleInput">
      <i class="fas fa-plus"></i>
      Alt Modül Ekle
    </button>
  </li>
  </template>
  </Draggable>
  </div>
  </li>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useModuleStore } from "../store/module";
import SubModule from "./SubModule.vue";
import { useToast } from "vue-toast-notification";
import Swal from "sweetalert2";
import Draggable from "vuedraggable";
import { storeToRefs } from "pinia";

const props = defineProps({
  module: Object,
  previewEditIcon: String,
});
const emits = defineEmits(["emitModule"]);

const storeModule = useModuleStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const {
  showModuleInput,
  showSubModuleInput,
  editableModule,
  editableSubModule,
} = storeToRefs(storeModule);

const subModule = reactive({
  parent_id: 0,
  icon: "",
  title: "Yeni Alt Modül",
});

const editModuleInput = reactive({
  slug: "",
  icon: "",
  title: "",
});

const validationSubModule = ref(false);

const openSubModuleInput = () => {
  showSubModuleInput.value = true;
  showModuleInput.value = false;
  editableModule.value = true;
  editableSubModule.value = true;
};

const toggleEditableModule = (module) => {
  editModuleInput.slug = module.slug;
  editModuleInput.title = module.title;
  editModuleInput.icon = module.icon;
  editableModule.value = false;
  editableSubModule.value = true;
  showModuleInput.value = false;
  showSubModuleInput.value = false;
};

const closeSubModuleInput = () => {
  subModule.title = "Yeni Alt Modül";
  subModule.icon = "";
  showSubModuleInput.value = false;
};

const closeEditableModule = () => {
  editableModule.value = true;
};

const editModule = () => {
  emits("emitModule", editModuleInput);
  editableModule.value = true;
};

const addSubModule = (parent_id) => {
  if (subModule.title != "") {
    subModule.parent_id = parent_id;
    subModule.icon = "icon";
    storeModule.storeModule(subModule, route.params.app).then((data) => {
      toast.success(data.success);
    });
  } else {
    validationSubModule.value = true;
  }
};

const updateSubModule = (subModule) => {
  storeModule.updateModule(subModule, subModule.slug, route.params.app).then((data) => {
    router.push({
      name: "Module",
      params: { module: data.module.slug },
    });
    toast.success(data.success);
  });
};

const changeModule = (e) => {
  let item = e.moved;

  let index = item.newIndex;
  let prevModule = props.module.subModules[index - 1];
  let nextModule = props.module.subModules[index + 1];
  let module = props.module.subModules[index];

  let order = module.order;

  if (prevModule && nextModule) {
    order = (prevModule.order + nextModule.order) / 2;
  } else if (prevModule) {
    order = prevModule.order + prevModule.order / 2;
  } else if (nextModule) {
    order = nextModule.order / 2;
  }

  storeModule.moveModule(order, module.slug, route.params.app);
};

const deleteSubModule = (subModule) => {
  Swal.fire({
    title: "Emin misin?",
    text: "Bu modülü silmek istiyor musunuz?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "İptal",
    confirmButtonText: "Evet! Sil",
  }).then((result) => {
    if (result.isConfirmed) {
      storeModule.deleteModule(subModule.slug, route.params.app).then((data) => {
        router.push({
          name: "Panel",
          params: { app: route.params.app },
        });
        toast.success(data.success);
      });
    }
  });
};
</script>
<style>
.error-input {
  border: 1px solid red !important;
}
</style>
