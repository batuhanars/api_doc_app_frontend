<template>
  <!-- WRAPPER -->
  <div id="wrapper">
    <!-- MAIN CONTENT -->
    <div class="main-content">
      <div class="container">
        <h3 class="page-title">
          {{ projectStore.project.title }}
          <small>
            <router-link :to="{ name: 'Projects' }">Projeler</router-link> /
            {{ projectStore.project.title }}
          </small>
        </h3>
        <div class="panel">
          <div class="panel-heading">
            <div style="display: flex; justify-content: space-between">
              <div style="display: flex">
                <h3 class="panel-title">
                  <input type="text" placeholder="Ara..." v-model="search" class="form-control" />
                </h3>
                <a href="#" class="btn btn-sm btn-light" style="margin-left: 10px" v-show="search != ''"
                  @click.prevent="search = ''">
                  <i class="fas fa-arrows-spin"></i>
                </a>
              </div>
              <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#createApp" @click="createSubProject">
                <i class="fas fa-plus"></i>
                Alt Proje Ekle
              </a>
            </div>
          </div>
          <div class="panel-body">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Proje</th>
                  <th>Kayıt Tarihi</th>
                  <th style="text-align: end"></th>
                </tr>
              </thead>
              <tbody>
                <SubProject v-for="subProject in subProjects" :key="subProject.id" :sub-project="subProject"
                  @emit-subproject="editSubProject" @delete-subproject="deleteSubProject" />
              </tbody>
            </table>
          </div>
        </div>
        <!-- END TABLE HOVER -->
      </div>
    </div>
    <!-- END MAIN CONTENT -->
    <div>
      <div class="clearfix"></div>
      <footer>
        <div class="container-fluid">
          <p class="copyright">
            &copy; 2022
            <a href="https://www.markapress.com" target="_blank">Marka Press Digital Software Agency</a>. All Rights
            Reserved.
          </p>
        </div>
      </footer>
    </div>
    <Modal id="createApp" title="Alt Proje Oluştur" aria-labelledby="createAppLabel" label-id="createAppLabel">
      <form @submit.prevent="addSubProject">
        <div class="modal-body">
          <Input type="text" label="Başlık" for-label="title" v-model:modelValue="subProject.title"
            :error="storeValidation" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Kapat
          </button>
          <button type="submit" class="btn btn-primary">Kaydet</button>
        </div>
      </form>
    </Modal>
    <Modal id="editApp" title="Alt Proje Güncelle" aria-labelledby="editAppLabel" label-id="editAppLabel">
      <form @submit.prevent="updateSubProject">
        <div class="modal-body">
          <Input type="text" label="Başlık" for-label="title" v-model:modelValue="subProject.title"
            :error="updateValidation" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Kapat
          </button>
          <button type="submit" class="btn btn-primary">Güncelle</button>
        </div>
      </form>
    </Modal>
  </div>
  <!-- END WRAPPER -->
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import Input from "../components/Input.vue";
import Modal from "../components/Modal.vue";
import SubProject from "../components/SubProject.vue";
import { useProjectStore } from "../store/project";
import { useRoute } from "vue-router";
import { useSubProjectStore } from "../store/subProject";
import { useToast } from "vue-toast-notification";
import Swal from "sweetalert2";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";

const projectStore = useProjectStore();
const subProjectStore = useSubProjectStore();
const route = useRoute();
const toast = useToast();
const { subProjects, storeValidation, updateValidation } = storeToRefs(subProjectStore);

const subProject = reactive({
  title: "",
  slug: "",
});

const search = ref("");

watch(search, (value) => {
  subProjectStore.getSubProjects(route.params.project, value);
});

const createSubProject = () => {
  subProject.title = "";
};

const addSubProject = () => {
  subProjectStore.storeSubProject(subProject.title, route.params.project).then((data) => {
    toast.success(data.success);
  });
};

const editSubProject = ({ title, slug }) => {
  subProject.title = title;
  subProject.slug = slug;
};

const updateSubProject = () => {
  subProjectStore
    .updateSubProject(subProject.title, subProject.slug, route.params.project)
    .then((data) => {
      toast.success(data.success);
    });
};

const deleteSubProject = (subProject) => {
  Swal.fire({
    title: "Emin misin?",
    text: "Bu alt projeyi silmek istiyor musunuz?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "İptal",
    confirmButtonText: "Evet! Sil",
  }).then((result) => {
    if (result.isConfirmed) {
      subProjectStore
        .deleteSubProject(route.params.project, subProject.slug)
        .then((data) => {
          toast.success(data.success);
        });
    }
  });
};

onMounted(() => {
  projectStore.getProject(route.params.project).then((data) => {
    useTitle(data.title);
  });
  subProjectStore.getSubProjects(route.params.project);
});
</script>
