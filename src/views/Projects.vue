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
              <a
                href="#"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#createProject"
              >
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
                <Project />
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
            <a href="https://www.markapress.com" target="_blank"
              >Marka Press Digital Software Agency</a
            >. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
    <Modal
      id="createProject"
      title="Proje Oluştur"
      aria-labelledby="createProjectLabel"
      label-id="createProjectLabel"
    >
      <form>
        <div class="modal-body">
          <Input type="file" label="Logo" for-label="logo" />
          <Input type="text" label="Başlık" for-label="title" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Kapat
          </button>
          <button type="submit" class="btn btn-primary">Kaydet</button>
        </div>
      </form>
    </Modal>
    <Modal
      id="editProject"
      title="Proje Güncelle"
      aria-labelledby="editProjectLabel"
      label-id="editProjectLabel"
    >
      <form>
        <div class="modal-body">
          <Input type="file" label="Logo" for-label="logo" />
          <Input type="text" label="Başlık" for-label="title" />
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
</script>
