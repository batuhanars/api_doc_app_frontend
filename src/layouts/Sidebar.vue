<template>
  <div id="sidebar-nav" class="sidebar">
    <div class="sidebar-scroll">
      <nav>
        <ul class="nav">
          <li>
            <RouterLink :to="{ name: 'Panel', params: { app: 'kurumsal' } }"
              ><i class="lnr lnr-home"></i>
              <span>Anasayfa</span>
            </RouterLink>
          </li>
          <li>
            <a
              href="#subPages"
              data-toggle="collapse"
              class="collapsed dropdown-module"
              style="display: flex; align-items: center"
            >
              <div
                class="module-actions-left"
                v-if="$route.params.module"
                v-show="editModule"
              >
                <a href="#" class="edit-module-button" @click="toggleEditModule">
                  <i class="fas fa-pen" style="font-size: 12px"></i>
                </a>
              </div>
              <div style="width: 100%" v-if="editModule">
                <i class="lnr lnr-enter"></i>
                <span>Oturum İşlemleri</span>
                <i class="icon-submenu lnr lnr-chevron-left"></i>
              </div>
              <div style="display: flex" v-else>
                <div style="display: flex">
                  <i class="lnr lnr-enter"></i>
                  <input type="text" class="edit-module-input" value="Oturum İşlemleri" />
                </div>
                <div
                  style="
                    background: #191919;
                    padding: 0 5px;
                    display: flex;
                    margin-left: 5px;
                  "
                  v-if="$route.params.module"
                >
                  <a href="" class="edit-module-button">
                    <i class="fas fa-check" style="font-size: 12px"></i>
                  </a>
                  <a href="#" class="delete-module-button" @click="toggleEditModule">
                    <i class="fas fa-times text-danger" style="font-size: 12px"></i>
                  </a>
                </div>
              </div>
              <div class="module-actions" v-if="$route.params.module" v-show="editModule">
                <a href="" class="delete-module-button">
                  <i class="fas fa-trash text-danger" style="font-size: 12px"></i>
                </a>
              </div>
            </a>

            <div id="subPages" class="collapse">
              <ul class="nav">
                <li style="display: flex; align-items: center">
                  <a href="send-code" class="" v-if="editSubModule"
                    >Giriş Kodu &nbsp;
                    <span class="label label-primary">POST</span>
                  </a>
                  <div
                    style="
                      display: flex;
                      padding-left: 60px;
                      padding-top: 10px;
                      padding-bottom: 10px;
                    "
                    v-else
                  >
                    <div style="display: flex">
                      <input
                        type="text"
                        class="edit-submodule-input"
                        value="Giriş Kodu"
                      />
                    </div>
                    <div
                      style="padding: 0 5px; display: flex; margin-left: 5px"
                      v-if="$route.params.module"
                    >
                      <a href="" class="edit-module-button">
                        <i class="fas fa-check" style="font-size: 12px"></i>
                      </a>
                      <a
                        href="#"
                        class="delete-module-button"
                        @click="toggleEditSubModule"
                      >
                        <i class="fas fa-times text-danger" style="font-size: 12px"></i>
                      </a>
                    </div>
                  </div>
                  <div
                    style="position: absolute; right: 0"
                    v-if="$route.params.module"
                    v-show="editSubModule"
                  >
                    <a href="#" @click="toggleEditSubModule">
                      <i class="fas fa-pen" style="font-size: 12px"></i>
                    </a>
                    <a href="">
                      <i class="fas fa-trash text-danger" style="font-size: 12px"></i>
                    </a>
                  </div>
                </li>
                <li>
                  <a href="user-info" class=""
                    >Üye Bilgileri &nbsp;
                    <span class="label label-success">GET</span>
                  </a>
                </li>
                <li
                  style="padding: 10px 0 10px 60px; display: flex"
                  v-show="showSubModuleInput"
                >
                  <input type="text" value="Yeni Alt Modül" class="add-submodule-input" />
                </li>
                <li
                  style="padding: 10px 0 10px 60px; display: flex"
                  v-if="$route.params.module"
                >
                  <button
                    type="button"
                    class="btn btn-sm btn-warning rounded"
                    @click="toggleSubModuleInput"
                  >
                    <i class="fas fa-plus"></i>
                    Alt Modül Ekle
                  </button>
                </li>
              </ul>
            </div>
          </li>
          <li style="padding: 18px 30px 0 30px; display: flex" v-show="showModuleInput">
            <input type="text" class="add-module-input" value="Yeni Modül" />
          </li>
          <li style="padding: 18px 30px; display: flex" v-if="!$route.params.module">
            <button
              type="button"
              class="btn btn-sm btn-warning rounded"
              @click="toggleModuleInput"
              style="flex-grow: 1"
            >
              <i class="fas fa-plus"></i>
              Modül Ekle
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showModuleInput = ref(false);
const showSubModuleInput = ref(false);

const editModule = ref(true);
const editSubModule = ref(true);

const toggleModuleInput = () => {
  showModuleInput.value = !showModuleInput.value;
  showSubModuleInput.value = false;
  editModule.value = true;
  editSubModule.value = true;
};

const toggleSubModuleInput = () => {
  showSubModuleInput.value = !showSubModuleInput.value;
  showModuleInput.value = false;
  editModule.value = true;
  editSubModule.value = true;
};

const toggleEditModule = () => {
  editModule.value = !editModule.value;
  editSubModule.value = true;
  showModuleInput.value = false;
  showSubModuleInput.value = false;
};

const toggleEditSubModule = () => {
  editSubModule.value = !editSubModule.value;
  editModule.value = true;
  showSubModuleInput.value = false;
};
</script>
<style>
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

.add-module-input,
.add-submodule-input,
.edit-module-input,
.edit-submodule-input {
  background: transparent;
  border: 1px solid #ccc;
  width: 140px;
  color: #fff;
  outline: none;
}
</style>
