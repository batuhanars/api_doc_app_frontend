<template>
  <!-- WRAPPER -->
  <div id="wrapper">
    <!-- MAIN CONTENT -->
    <div class="main-content">
      <div class="container">
        <h3 class="page-title">Projeler</h3>
        <div class="panel">
          <div class="panel-heading">
            <div style="display: flex; justify-content: space-between">
              <h3 class="panel-title">
                <input type="text" placeholder="Ara..." class="form-control" />
              </h3>
              <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#createProject" @click="createProject">
                <i class="fas fa-plus"></i>
                Proje Ekle
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
                <Project v-for="project in projects" :key="project.id" :project="project" @emit-project="editProject"
                  @delete-project="deleteProject" />
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
    <Modal id="createProject" title="Proje Oluştur" aria-labelledby="createProjectLabel" label-id="createProjectLabel">
      <form @submit.prevent="addProject">
        <div class="modal-body">
          <Input type="file" label="Logo" for-label="logo" :modelValue="project.logo" @update:modelValue="uploadLogo"
            :error="storeValidation.logo" />
          <Input type="text" label="Başlık" for-label="title" v-model:modelValue="project.title"
            :error="storeValidation.title" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Kapat
          </button>
          <button type="submit" class="btn btn-primary">Kaydet</button>
        </div>
      </form>
    </Modal>
    <Modal id="editProject" title="Proje Güncelle" aria-labelledby="editProjectLabel" label-id="editProjectLabel">
      <form @submit.prevent="updateProject">
        <div class="modal-body">
          <img :src="previewLogo || project.logo" alt="" style="width: 250px; margin-bottom: 10px" />
          <Input type="file" label="Logo" for-label="logo" :modelValue="project.logo" @update:modelValue="uploadLogo"
            :error="updateValidation.logo" />
          <Input type="text" label="Başlık" for-label="title" v-model:modelValue="project.title"
            :error="updateValidation.title" />
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
import Input from "../components/Input.vue";
import Modal from "../components/Modal.vue";
import Project from "../components/Project.vue";
import { onMounted, reactive, ref } from "vue";
import { useProjectStore } from "../store/project";
import { useToast } from "vue-toast-notification";
import Swal from "sweetalert2";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";

useTitle("Projeler");

const projectStore = useProjectStore();
const toast = useToast();
const { projects, storeValidation, updateValidation } = storeToRefs(projectStore);

const project = reactive({
  slug: "",
  logo: "",
  title: "",
});
const previewLogo = ref();

const uploadLogo = (value) => {
  project.logo = value;
  previewLogo.value = URL.createObjectURL(value);
};

const createProject = () => {
  project.logo = "";
  project.title = "";
};

const addProject = () => {
  projectStore.storeProject(project).then((data) => {
    toast.success(data.success);
  });
};

const editProject = ({ title, logo, slug }) => {
  project.slug = slug;
  project.logo = logo;
  project.title = title;
};

const updateProject = () => {
  projectStore.updateProject(project).then((data) => {
    toast.success(data.success);
  });
};

const deleteProject = (project) => {
  Swal.fire({
    title: "Emin misin?",
    text: "Bu projeyi silmek istiyor musunuz?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "İptal",
    confirmButtonText: "Evet! Sil",
  }).then((result) => {
    if (result.isConfirmed) {
      projectStore.deleteProject(project.slug).then((data) => {
        toast.success(data.success);
      });
    }
  });
};

onMounted(() => {
  projectStore.getProjects();
});
</script>
