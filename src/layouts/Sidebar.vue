<template>
  <div>
    <div id="sidebar-nav" class="sidebar">
      <div class="sidebar-scroll">
        <nav>
          <Draggable v-model="modules" group="modules" tag="ul" class="nav" item-key="id" @change="changeModule">
            <template #header>
              <li>
                <RouterLink :to="{ name: 'Panel', params: { app: $route.params.app } }" exact-active-class="active"><i
                    class="lnr lnr-home"></i> <span>Anasayfa</span>
                </RouterLink>
              </li>
            </template>
            <template #item="{ element }">
              <ParentModule :module="element" :previewEditIcon="editIcon" @emit-module="updateModule"
                @delete-module="deleteModule" @editable-icon="editableIcon" />
            </template>
            <template #footer>
              <li style="
                  padding: 18px 30px 0 30px;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                " v-show="showModuleInput">
                <i class="fas fa-plus" style="color: #fff; cursor: pointer"
                  :class="{ 'error-icon': validationModule == true }" data-toggle="modal" data-target="#addIcon"
                  v-if="module.icon == ''"></i>
                <i v-else style="color: white" :class="module.icon"></i>
                <input type="text" class="add-module-input" :class="{ 'error-input': validationModule == true }"
                  v-model="module.title" />
                <div style="display: flex">
                  <i class="fas fa-check text-success" style="cursor: pointer; font-size: 12px" @click="addModule"></i>
                  <i class="fas fa-times text-danger" style="cursor: pointer; font-size: 12px"
                    @click="closeModuleInput"></i>
                </div>
              </li>
              <li style="padding: 18px 30px; display: flex">
                <button type="button" class="btn btn-sm rounded" @click="openModuleInput" style="flex-grow: 1">
                  <i class="fas fa-plus"></i>
                  Modül Ekle
                </button>
              </li>
            </template>
          </Draggable>
        </nav>
      </div>
    </div>
    <Modal id="addIcon" title="İkon Ekle" aria-labelledby="addIconLabel" label-id="addIconLabel">
      <div class="modal-body">
        <Input type="text" label="İkon" for-label="icon" v-model:modelValue="previewIcon" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">
          Kapat
        </button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addIcon">
          Onayla
        </button>
      </div>
    </Modal>
    <Modal id="editIcon" title="İkon Güncelle" aria-labelledby="editIconLabel" label-id="editIconLabel">
      <div class="modal-body">
        <Input type="text" label="İkon" for-label="icon" v-model:modelValue="previewEditIcon" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">
          Kapat
        </button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="applyEditIcon">
          Onayla
        </button>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useModuleStore } from "../store/module";
import ParentModule from "../components/ParentModule.vue";
import Modal from "../components/Modal.vue";
import Input from "../components/Input.vue";
import { useToast } from "vue-toast-notification";
import Swal from "sweetalert2";
import Draggable from "vuedraggable";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const storeModule = useModuleStore();
const toast = useToast();

const {
  modules,
  showModuleInput,
  editableModule,
  showSubModuleInput,
  editableSubModule,
} = storeToRefs(storeModule);

watch(
  () => route.params,
  () => {
    showModuleInput.value = false;
    editableModule.value = true;
    showSubModuleInput.value = false;
    editableSubModule.value = true;
  }
);

onMounted(() => {
  storeModule.getModules(route.params.app);
});

const module = reactive({
  parent_id: 0,
  icon: "",
  title: "Yeni Modül",
});

const validationModule = ref(false);

const previewIcon = ref("");
const previewEditIcon = ref("");
const editIcon = ref("");

const changeModule = (e) => {
  let item = e.moved;

  let index = item.newIndex;
  let prevModule = modules.value[index - 1];
  let nextModule = modules.value[index + 1];
  let module = modules.value[index];

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

const addIcon = () => {
  module.icon = previewIcon.value;
};

const applyEditIcon = () => {
  editIcon.value = previewEditIcon.value;
};

const addModule = () => {
  if (module.title != "" && module.icon != "") {
    storeModule.storeModule(module, route.params.app).then((data) => {
      showModuleInput.value = false;
      module.icon = "";
      previewIcon.value = ""
      module.title = "Yeni Modül";
      toast.success(data.success);
    });
  } else {
    validationModule.value = true;
  }
};

const editableIcon = (icon) => {
  previewEditIcon.value = icon;
};

const updateModule = (module) => {
  storeModule
    .updateModule(
      { title: module.title, icon: editIcon.value || module.icon },
      module.slug,
      route.params.app
    )
    .then((data) => {
      if (route.params.subModule)
        router.push({ name: "Panel", params: { app: route.params.app } });
      else router.push({ name: "Module", params: { module: data.module.slug } });
      toast.success(data.success);
      previewEditIcon.value = "";
      editIcon.value = "";
    });
};

const deleteModule = (module) => {
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
      storeModule.deleteModule(module.slug, route.params.app).then((data) => {
        router.push({ name: "Panel", params: { app: route.params.app } });
        toast.success(data.success);
      });
    }
  });
};

const openModuleInput = () => {
  showModuleInput.value = true;
  editableModule.value = true;
  showSubModuleInput.value = false;
  editableSubModule.value = true;
};

const closeModuleInput = () => {
  module.title = "Yeni Modül";
  module.icon = "";
  previewIcon.value = "";
  showModuleInput.value = false;
  previewEditIcon.value = "";
  editIcon.value = "";
};
</script>
<style>
.error-input {
  border: 1px solid red !important;
}

.error-icon {
  color: red !important;
}

.edit-module-button:hover i {
  color: #337ab7 !important;
}

.delete-module-button:hover i {
  color: #f9354c !important;
}

.module-actions {
  position: absolute;
  right: 0;
  background: #191919;
  padding: 0 5px;
  transform: translate(-10%, 0);
  opacity: 0;
  transition: 250ms all linear;
}

.module-actions-left {
  position: absolute;
  left: 0;
  background: #191919;
  padding: 0 5px;
  opacity: 0;
  transition: 250ms all linear;
}

.dropdown-module:hover .module-actions,
.dropdown-module:hover .module-actions-left {
  opacity: 1;
}

.module:hover .module-actions,
.module:hover .module-actions-left {
  opacity: 1;
}

.add-submodule-input,
.edit-module-input,
.edit-submodule-input {
  background: transparent;
  border: 1px solid #ccc;
  width: 135px;
  color: #fff;
  outline: none;
  margin-right: 5px;
}

.add-submodule-input {
  margin-right: 10px;
}

.edit-module-input,
.edit-submodule-input {
  margin-right: 5px;
}

.add-module-input {
  width: 100%;
  margin-right: 10px;
  background: transparent;
  border: 1px solid #ccc;
  color: #fff;
  outline: none;
}
</style>
